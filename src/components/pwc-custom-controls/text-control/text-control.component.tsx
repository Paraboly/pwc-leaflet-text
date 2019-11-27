import { Component, Prop, State, h } from "@stencil/core";
import PWCCustomControl from "../../pwc-map-controls/components/pwc-custom-control/pwc-custom-control.interface";
import L from "leaflet";
import { PWCMapMarkerFactory } from "../../pwc-map-marker/services/pwc-map-marker.factory";
enum STATES {
  POINT_DETECTION,
  SHOW_FORM
}
@Component({
  tag: "pwc-text-control",
  styleUrls: []
})
export class PWCTextControl implements PWCCustomControl {
  private pin;
  @State() state: STATES = STATES.POINT_DETECTION;
  @Prop() map;
  @Prop() shape;
  @Prop() form;

  componentDidLoad() {
    this.detectPoint();
  }

  componentDidUnload() {
    this.map.instance.removeLayer(this.pin.instance);
  }

  detectPoint() {
    L.DomUtil.addClass(
      this.map.instance["_container"],
      "crosshair-cursor-enabled"
    );

    this.map.instance.doubleClickZoom.disable();

    this.map.instance.once("click", event => {
      this.map.instance.doubleClickZoom.enable();

      L.DomUtil.removeClass(
        this.map.instance["_container"],
        "crosshair-cursor-enabled"
      );

      this.pin = PWCMapMarkerFactory.getOne({
        latlng: event["latlng"],
        template: "<pwc-editable-text/>",
        options: { draggable: true }
      });

      this.pin.instance.on("dragstart", () => {
        this.map.instance.dragging.disable();
      });

      this.pin.instance.on("dragend", () => {
        this.map.instance.dragging.enable();
      });

      this.pin.instance.addTo(this.map.instance);
      this.state = STATES.SHOW_FORM;
    });
  }

  onFormSubmitted(payload) {
    console.log(payload);
    console.log(this.pin.instance);
    this.map.instance.removeLayer(this.pin.instance);
    document.body.querySelector("pwc-map-controls")["cancelActiveControl"]();
  }

  onFormCanceled() {
    document.body.querySelector("pwc-map-controls")["cancelActiveControl"]();
  }

  render() {
    return this.state === STATES.POINT_DETECTION ? (
      <div class="guide">
        📍 Etiket koymak istediginiz noktaya cift tiklayin
      </div>
    ) : (
      <pwc-custom-control-form
        form={this.form}
        shape={this.pin}
        onFormSubmitted={this.onFormSubmitted.bind(this)}
        onFormCanceled={this.onFormCanceled.bind(this)}
      ></pwc-custom-control-form>
    );
  }
}
