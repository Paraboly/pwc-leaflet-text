import { Component, Prop, State, h, Method } from "@stencil/core";
import PWCCustomControl from "../pwc-custom-control.interface";
import L from "leaflet";
import { PWCMapMarkerFactory } from "../../../../pwc-map-marker/services/pwc-map-marker.factory";
import PWCMapControlsService from "../../../services/pwc-map-controls.service";
import PWCCustomControlForm from "../../pwc-custom-control-form/pwc-custom-control-form.model";

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
  private activeShapeBackup;
  private activeShape;
  private shapeLayer: L.GeoJSON;
  @State() state: STATES = STATES.IDLE;
  @Prop() map;
  @Prop() geometry;

  componentDidLoad() {
    PWCMapControlsService.registerFormListener(this.onFormAction.bind(this));
    PWCMapControlsService.registerEventListenerForCustomControl(
      this.customControlName,
      this.onControlTriggered.bind(this)
    );

    this.renderShapes();
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
    if (this.state === STATES.IDLE) {
      this.state = STATES.POINT_DETECTION;

      this.detectPoint();
    }
  }

  onFormAction(event) {
    if (event.detail.action === "canceled") this.goIdle();
  }

  detectPoint() {
    const defaultTextForm = {
      name: "ÖrnekEtiket",
      shapeProps: {
        fontSize: "12px",
        backgroundColor: "#dddddd"
      },
      pwcProps: {
        type: "PwcTextControl",
        control: "pwc-text-control"
      }
    };

    L.DomUtil.addClass(
      this.map.instance["_container"],
      "crosshair-cursor-enabled"
    );

    this.map.instance.doubleClickZoom.disable();

    this.map.instance.once("click", e => {
      this.editShape(defaultTextForm, e);
    });
  }

  goIdle() {
    this.state = STATES.IDLE;
    this.map.instance.removeLayer(this.activeShape.instance);
    this.activeShape = null;
    PWCMapControlsService.destroyForm();

    if (this.activeShapeBackup) {
      this.map.instance.addLayer(this.activeShapeBackup);
    }
  }

  editShape(shapeProps, event) {
    /**
     *  (Hack: If user edit existing marker, there should be _icon prop.)
     *  Backup existing marker amd remove the from map
     **/
    if (event.target._icon) {
      this.activeShapeBackup = event.target;
      this.map.instance.removeLayer(this.activeShapeBackup);
    }

    const form = new PWCCustomControlForm(shapeProps);

    this.map.instance.doubleClickZoom.enable();

    L.DomUtil.removeClass(
      this.map.instance["_container"],
      "crosshair-cursor-enabled"
    );

    this.activeShape = this._generateTextMarker(event.latlng, form, true);

    this.activeShape.instance.on("dragstart", () => {
      this.map.instance.dragging.disable();
    });

    this.activeShape.instance.on("dragend", () => {
      this.map.instance.dragging.enable();
    });

    this.activeShape.instance.addTo(this.map.instance);

    PWCMapControlsService.initializeForm(form);

    this.state = STATES.EDIT;
  }

  _generateTextMarker(latlng, properties, editable = false) {
    const template = `<pwc-editable-text text="${
      properties.name
      }" text-options=${JSON.stringify(properties)} editable="${editable}">`;

    const marker = PWCMapMarkerFactory.getOne({
      latlng: latlng,
      template,
      options: {
        draggable: editable
      }
    });

    marker.instance.on("dblclick", e => {
      if (this.state === STATES.IDLE) this.editShape(properties, e);
    });

    return marker;
  }

  @Method()
  async getActiveShape() {
    return this.activeShape;
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
