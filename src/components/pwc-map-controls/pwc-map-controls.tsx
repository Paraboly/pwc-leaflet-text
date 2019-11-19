import { Component, h, Element, Method } from "@stencil/core";
import L from "leaflet";
import PWCMap from "../pwc-map/services/pwc-map.model";

@Component({
  tag: "pwc-map-controls",
  styleUrl: "pwc-map-controls.css",
  shadow: true
})
export class PwcMapControls {
  @Element() private element: HTMLElement;
  private map: PWCMap;
  /**
   * Holds registered controls
   */
  private controlsGroup: Array<L.Control>;

  componentDidLoad() {
    /**
     * Initialize control Group
     */
    this.controlsGroup = [];

    /**
     * Get Map Instance
     */
    this.element.parentElement["getMap"]().then((map: PWCMap) => {
      this.map = map;
      /**
       * Register controls to ControlGroup
       */
      this.registerControls();
      /**
       * Add ControlsGroup to Map Instance
       */
      this.addControlsToMap();
    });
  }

  /**
   * @description Register controls to controlsGroup
   * @private
   * @memberof PwcMapControls
   */
  private registerControls() {
    this.controlsGroup.push(
      this.map.controls.create("TextControl", {
        template: "<pwc-map-text-control></pwc-map-text-control>"
      })
    );
    this.controlsGroup.push(L.control.scale());
  }

  public removeControlsFromMap() {
    this.controlsGroup.map(control => this.map.instance.removeControl(control));
  }

  public addControlsToMap() {
    this.controlsGroup.map(control => control.addTo(this.map.instance));
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

  render() {
    return (
      <div class="pwc-map-control-container">
        <p>Hello pwc-map-control-container!</p>
      </div>
    );
  }
}
