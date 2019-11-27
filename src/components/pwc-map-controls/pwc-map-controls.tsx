import { Component, Element, Method, State, h, Prop } from "@stencil/core";
import L from "leaflet";
import PWC_MAP_CONTROLS_CONSTANT from "./pwc-map-controls.constant";
import PWCUtils from "../../core/utils.service";
import PWCMap from "../pwc-map/services/pwc-map.model";

@Component({
  tag: "pwc-map-controls",
  styleUrl: "pwc-map-controls.css"
})
export class PwcMapControls {
  @Element() private element: HTMLElement;
  @Prop() map;
  @State() activeControl = null;
  /**
   * Holds registered controls
   */
  private controlsGroup: Array<L.Control>;

  componentWillLoad() {
    if (!this.element.parentElement["getMap"]) {
      this.map = new PWCMap({}, this.map);
    }
  }
  componentDidLoad() {
    /**
     * Initialize control Group
     */
    this.controlsGroup = [];
    /**
     * Get Map Instance
     */
    if (this.element.parentElement["getMap"]) {
      this.element.parentElement["getMap"]().then((map: PWCMap) => {
        this.map = map;
        /**
         * Register controls to ControlGroup and Add ControlsGroup to Map Instance
         */
        this.registerControls();
        this.addControlsToMap();
      });
    } else {
      /**
       * Register controls to ControlGroup and Add ControlsGroup to Map Instance
       */
      this.registerControls();
      this.addControlsToMap();
    }
  }

  /**
   * @description Register controls to controlsGroup
   * @private
   * @memberof PwcMapControls
   */
  private registerControls() {
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
    /**
     * Register native controls
     */
    this.controlsGroup.push(L.control.scale({ metric: true, imperial: false }));
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

  /**
   * @description Get registered controls
   * @returns {Promise<Array<L.Control>>} List of registered controls
   * @memberof PwcMapControls
   */
  @Method()
  async getControls(): Promise<any> {
    return Promise.resolve(this.controlsGroup);
  }

  @Method()
  async cancelActiveControl(): Promise<any> {
    this.activeControl = null;
    return Promise.resolve();
  }

  render() {
    return (
      this.activeControl && (
        <this.activeControl.component
          form={this.activeControl.params.form}
          map={this.map}
        />
      )
    );
  }
}
