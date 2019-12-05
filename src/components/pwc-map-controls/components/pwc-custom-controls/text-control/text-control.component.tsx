import { Component, Prop, State, h, Event, EventEmitter } from "@stencil/core";
import PWCCustomControl from "../pwc-custom-control.interface";
import L from "leaflet";
import { PWCMapMarkerFactory } from "../../../../pwc-map-marker/services/pwc-map-marker.factory";
import PWCMapControlsService from "../../../services/pwc-map-controls.service";
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
  @Event() save: EventEmitter;
  @State() state: STATES = STATES.POINT_DETECTION;
  @Prop() map;
  @Prop() geometry: L.GeoJSON;
  @Prop() form;

  componentDidLoad() {
    console.log(this.geometry);
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

      PWCMapControlsService.initializeForm(this.pin);
    });
  }

  render() {
    return (
      <div>
        <div class="guide">
          📍 Etiket koymak istediginiz noktaya cift tiklayin
        </div>
      </div>
    );
  }
}
