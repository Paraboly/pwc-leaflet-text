import { Component, Prop, State, h, Event, EventEmitter } from "@stencil/core";
import PWCCustomControl from "../pwc-custom-control.interface";
import L from "leaflet";
import { PWCMapMarkerFactory } from "../../../../pwc-map-marker/services/pwc-map-marker.factory";
import PWCMapControlsService from "../../../services/pwc-map-controls.service";
import PWCMapMarker from "../../../../pwc-map-marker/services/pwc-map-marker.model";

enum STATES {
  IDLE,
  POINT_DETECTION
}
@Component({
  tag: "pwc-text-control",
  styleUrls: []
})
export class PWCTextControl implements PWCCustomControl {
  private activeShape;
  private shapeLayer: L.GeoJSON;
  @Event() save: EventEmitter;
  @State() state: STATES = STATES.IDLE;
  @Prop() map;
  @Prop() geometry;

  componentDidLoad() {
    PWCMapControlsService.registerFormListener(this.onFormAction);

    this.renderShapes();

    //TODO: InitializeForm call will be attached to edit and create actions
    if (this.geometry[0].properties) {
      PWCMapControlsService.initializeForm(this.geometry[0].properties);
    }

    //this.detectPoint();
  }

  componentDidUnload() {
    this.map.instance.removeLayer(this.activeShape.instance);
  }

  renderShapes() {
    this.shapeLayer = new L.GeoJSON(this.geometry, {
      pointToLayer: (feature, latlng) => {
        return new PWCMapMarker({
          latlng,
          template: `<pwc-editable-text text="${
            feature.properties.name
          }" text-options=${JSON.stringify(feature.properties)} >`,
          options: { draggable: false }
        }).instance;
      }
    });

    this.map.instance.addLayer(this.shapeLayer);
  }

  onFormAction(event) {
    console.log(event.detail);
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

      this.activeShape = PWCMapMarkerFactory.getOne({
        latlng: event["latlng"],
        template: "<pwc-editable-text/>",
        options: { draggable: true }
      });

      this.activeShape.instance.on("dragstart", () => {
        this.map.instance.dragging.disable();
      });

      this.activeShape.instance.on("dragend", () => {
        this.map.instance.dragging.enable();
      });

      this.activeShape.instance.addTo(this.map.instance);
    });
  }

  render() {
    return (
      this.state === STATES.POINT_DETECTION && (
        <div>
          <div class="guide">
            📍 Etiket koymak istediginiz noktaya cift tiklayin
          </div>
        </div>
      )
    );
  }
}
