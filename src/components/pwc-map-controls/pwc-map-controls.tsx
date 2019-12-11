import {
  Component,
  Method,
  State,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  Listen
} from "@stencil/core";
import L from "leaflet";
import "leaflet-draw";
import "leaflet.browser.print/dist/leaflet.browser.print";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.min";

import PWC_MAP_CONTROLS_CONSTANT from "./pwc-map-controls.constant";
import PWCMap from "../pwc-map/services/pwc-map.model";
import PWCMapControlsService from "./services/pwc-map-controls.service";

enum ACTIONS {
  SAVE = "save",
  CANCELED = "canceled",
  DELETED = "deleted"
}

@Component({
  tag: "pwc-map-controls",
  styleUrl: "pwc-map-controls.css"
})
export class PwcMapControls {
  private map: PWCMap;
  private geometry: any = [];
  private shapeMap;
  @Event() actions: EventEmitter;
  @Element() element: Element;
  @Prop() config: { map: L.Map; controls?: Object };
  @State() controlsReady = false;
  /**
   * Holds registered controls
   */
  private controlsGroup: Array<L.Control> = [];

  componentWillLoad() {
    /**
     * If map instance given with config, initialize map controls
     */
    if (this.config && this.config.map) {
      this.initialize(this.config, this.geometry);
    }
  }

  /**
   * @description Register controls to controlsGroup
   * @private
   * @memberof PwcMapControls
   */
  private registerControls() {
    /**
     * Register native controls
     */
    this.controlsGroup.push(new L.Control["Fullscreen"]());
    this.controlsGroup.push(L.control.scale({ metric: true, imperial: false }));
    this.controlsGroup.push(L.control["browserPrint"]());

    /**
     * For each default custom control
     */
    PWC_MAP_CONTROLS_CONSTANT.DEFAULT_CUSTOM_CONTROLS.map(controlName => {
      /**
       * Get default custom control config
       */
      const controlConfig = Object.assign(
        {},
        PWC_MAP_CONTROLS_CONSTANT.CONTROL_CONFIGS[controlName]
      );

      /**
       * Create custom control and push to controlsGroup
       */
      this.controlsGroup.push(
        PWCMapControlsService.createControl(controlName, controlConfig)
      );
    });
  }

  /**
   * @description Remove all registered controls from map
   * @memberof PwcMapControls
   */
  public removeControlsFromMap() {
    this.controlsGroup.map(control => this.map.instance.removeControl(control));
  }

  /**
   * @description Add all registered controls to map
   * @memberof PwcMapControls
   */
  public addControlsToMap() {
    this.controlsGroup.map(control => {
      control.addTo(this.map.instance);
    });
  }

  onAction(action: ACTIONS = ACTIONS.CANCELED, event = { detail: {} }) {
    if (action === "save" || action === "deleted")
      this.actions.emit({ action, data: event.detail });
  }

  /**
   * @description Initialize PWC Map Controls with given config.
   * @returns {Promise<Array<L.Control>>} List of registered control
   * @memberof PwcMapControls
   */
  @Method()
  async initialize(config: { map: L.Map; controls?: {} }, geometry: any) {
    if (!(config && config.map)) {
      throw new Error("Map configuration not given.");
    }

    this.controlsGroup = [];
    this.geometry = geometry;
    this.map = new PWCMap({}, config.map);

    this.shapeMap = geometry.reduce(
      (entryMap, e) =>
        entryMap.set(e.geometry.type, [
          ...(entryMap.get(e.geometry.type) || []),
          e
        ]),
      new Map()
    );

    this.registerControls();
    this.addControlsToMap();
    this.controlsReady = true;
  }

  /**
   * @description Get registered controls
   * @returns {Promise<Array<L.Control>>} List of registered controls
   * @memberof PwcMapControls
   */
  @Method()
  async getControls(): Promise<any> {
    return Promise.resolve(this.controlsGroup);
  }

  @Listen("formActions")
  onFormActions(event) {
    if (event.detail.action !== "changed")
      this.onAction(event.detail.action, { detail: event.detail.data });
  }

  render() {
    return (
      <div>
        this.controlsGroup && (
        {this.controlsGroup.map((control: any) => {
          if (control.options.details) {
            const geometry = this.shapeMap.get(
              control.options.details.type || "Point"
            );
            return (
              <control.options.details.component
                map={this.map}
                geometry={geometry}
              />
            );
          }
          return null;
        })}
        )
        <pwc-custom-control-form />
      </div>
    );
  }
}
