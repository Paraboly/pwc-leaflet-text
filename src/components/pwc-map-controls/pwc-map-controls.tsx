import {
  Component,
  Method,
  State,
  h,
  Prop,
  Event,
  EventEmitter,
  Listen
} from "@stencil/core";
import L from "leaflet";
import "leaflet-draw";
import "leaflet.browser.print/dist/leaflet.browser.print";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.min";

import PWC_MAP_CONTROLS_CONSTANT from "./pwc-map-controls.constant";
import PWCUtils from "../../core/utils.service";
import PWCMap from "../pwc-map/services/pwc-map.model";

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
  @Event() actions: EventEmitter;
  @Prop() config: { map: L.Map; controls?: Object };
  @State() activeControl = null;
  /**
   * Holds registered controls
   */
  private controlsGroup: Array<L.Control>;

  componentWillLoad() {
    /**
     * If map instance given with config, initialize map controls
     */
    if (this.config && this.config.map) {
      this.initialize(this.config);
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
        PWC_MAP_CONTROLS_CONSTANT.CONTROL_CONFIGS[controlName],
        {
          onTriggered: PWCUtils.partial(
            this.onControlTriggered.bind(this),
            PWC_MAP_CONTROLS_CONSTANT.CONTROL_CONFIGS[controlName]
          )
        }
      );

      /**
       * Create custom control and push to controlsGroup
       */
      this.controlsGroup.push(
        this.map.controls.create(controlName, controlConfig)
      );
    });
  }

  private onControlTriggered(controlConfig) {
    this.activeControl = controlConfig;
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
    this.activeControl = null;
    this.actions.emit({ action, data: event.detail });
  }

  /**
   * @description Initialize PWC Map Controls with given config.
   * @returns {Promise<Array<L.Control>>} List of registered control
   * @memberof PwcMapControls
   */
  @Method()
  async initialize(config: { map: L.Map; controls?: {} }) {
    if (!(config && config.map)) {
      throw new Error("Map configuration not given.");
    }
    this.controlsGroup = [];
    this.map = new PWCMap({}, config.map);
    this.registerControls();
    this.addControlsToMap();
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
    this.onAction(event.detail.action, { detail: event.detail.data });
  }

  @Method()
  async cancelActiveControl(): Promise<any> {
    return this.onAction(ACTIONS.CANCELED, { detail: this.activeControl });
  }

  render() {
    return (
      this.activeControl && (
        <div>
          <this.activeControl.component map={this.map} />
          <pwc-custom-control-form
            form={this.activeControl.params.form}
          ></pwc-custom-control-form>
        </div>
      )
    );
  }
}
