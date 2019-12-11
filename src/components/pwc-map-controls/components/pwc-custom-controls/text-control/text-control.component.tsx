import { Component, Prop, State, h, Event, EventEmitter } from "@stencil/core";
import PWCCustomControl from "../pwc-custom-control.interface";
import L from "leaflet";
import { PWCMapMarkerFactory } from "../../../../pwc-map-marker/services/pwc-map-marker.factory";
import PWCMapControlsService from "../../../services/pwc-map-controls.service";
import PWCCustomControlForm from "../../pwc-custom-control-form/pwc-custom-control-form.model";

const defaultTextForm = {
  name: "ÖrnekEtiket",
  shapeProps: {
    fontSize: "12px",
    backgroundColor: "#dddddd"
  },
  pwcProps: {
    type: "PwcTextControl"
  }
};

enum STATES {
  IDLE,
  EDIT,
  POINT_DETECTION
}
@Component({
  tag: "pwc-text-control",
  styleUrls: []
})
export class PWCTextControl implements PWCCustomControl {
  private customControlName = "PwcTextControl";
  private activeShape;
  private shapeLayer: L.GeoJSON;
  @Event() save: EventEmitter;
  @State() state: STATES = STATES.IDLE;
  @Prop() map;
  @Prop() geometry;

  componentDidLoad() {
    PWCMapControlsService.registerFormListener(this.onFormAction);
    PWCMapControlsService.registerEventListenerForCustomControl(
      this.customControlName,
      this.onControlTriggered.bind(this)
    );

    this.renderShapes();
  }

  componentDidUnload() {
    this.map.instance.removeLayer(this.activeShape.instance);
  }

  renderShapes() {
    this.shapeLayer = new L.GeoJSON(this.geometry, {
      pointToLayer: (feature, latlng) => {
        return this._generateTextMarker(latlng, feature.properties).instance;
      }
    });

    this.map.instance.addLayer(this.shapeLayer);
  }

  onControlTriggered() {
    this.state = STATES.POINT_DETECTION;

    this.detectPoint();
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
      const form = new PWCCustomControlForm(defaultTextForm);

      this.map.instance.doubleClickZoom.enable();

      L.DomUtil.removeClass(
        this.map.instance["_container"],
        "crosshair-cursor-enabled"
      );

      this.activeShape = this._generateTextMarker(event.latlng, form);

      this.activeShape.instance.on("dragstart", () => {
        this.map.instance.dragging.disable();
      });

      this.activeShape.instance.on("dragend", () => {
        this.map.instance.dragging.enable();
      });

      this.activeShape.instance.addTo(this.map.instance);

      PWCMapControlsService.initializeForm(form);

      this.state = STATES.EDIT;
    });
  }

  _generateTextMarker(latlng, properties) {
    const template = `<pwc-editable-text text="${
      properties.name
    }" text-options=${JSON.stringify(properties)} >`;

    return PWCMapMarkerFactory.getOne({
      latlng: latlng,
      template,
      options: { draggable: true }
    });
  }

  render() {
    return (
      this.state === STATES.POINT_DETECTION && (
        <div>
          <div class="guide">📍 Etiket koymak istediginiz noktaya tıklayın</div>
        </div>
      )
    );
  }
}
