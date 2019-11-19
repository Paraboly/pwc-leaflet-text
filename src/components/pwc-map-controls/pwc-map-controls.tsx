import { Component, h, Element } from "@stencil/core";
import L from "leaflet";
import PWCMap from "../../core/services/map.model";

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
    this.controlsGroup.push(this.map.controls.create("TextControl"));
    this.controlsGroup.push(L.control.scale());
    this.controlsGroup.push(L.control.attribution());
  }

  private removeControlsFromMap() {
    this.controlsGroup.map(control => this.map.instance.removeControl(control));
  }

  private addControlsToMap() {
    this.controlsGroup.map(control => control.addTo(this.map.instance));
  }

  render() {
    return (
      <div class="pwc-map-control-container">
        <p>Hello pwc-map-control-container!</p>
      </div>
    );
  }
}
