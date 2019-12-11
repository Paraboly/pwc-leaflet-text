import { Component, Prop, State, h, Event, EventEmitter, Method } from "@stencil/core";
import PWCCustomControl from "../pwc-custom-control.interface";
import L from "leaflet";
import { PWCMapMarkerFactory } from "../../../../pwc-map-marker/services/pwc-map-marker.factory";
import PWCMapControlsService from "../../../services/pwc-map-controls.service";
import PWCMapRoutingService from "../../../../../core/services/pwc-map-route.service";
import PWCMapMarker from "../../../../pwc-map-marker/services/pwc-map-marker.model";
import PWCCustomControlForm from "../../pwc-custom-control-form/pwc-custom-control-form.model";

enum STATES {
  IDLE,
  EDIT,
  POINT_DETECTION
}
@Component({
  tag: "pwc-ruler-control",
  styleUrls: []
})
export class PWCRulerControl implements PWCCustomControl {
  private customControlName = "PWCRulerControl";
  private viaPoints: PWCMapMarker[];
  private routePoints: Array<[number, number]>;
  private lastMarker: PWCMapMarker;
  private shapeLayer: L.GeoJSON;
  private markerLayer: L.LayerGroup;
  private activeShapeBackup;
  private activeShape;
  private route;
  @Event() save: EventEmitter;
  @State() state: STATES = STATES.IDLE;
  @Prop() map;
  @Prop() shapeLayergeometry;
  @Prop() form;
  @Prop() geometry;


  constructor() {
    this.viaPoints = [];
    this.routePoints = [];
  }

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
      onEachFeature: function (_feature, layer) {
      }
    });
    this.map.instance.addLayer(this.shapeLayer);
  };


  onControlTriggered() {
    this.markerLayer = L.layerGroup();
    this.map.instance.addLayer(this.markerLayer);

    if (this.state === STATES.IDLE) {
      this.state = STATES.POINT_DETECTION;

      this.detectPoint();
    }
  }

  onFormAction(event) {
    console.log(event);
    if (event.detail.action === "canceled") this.goIdle();
  }

  goIdle() {
    this.state = STATES.IDLE;
    this.map.instance.removeLayer(this.activeShape);
    this.activeShape = null;
    this.viaPoints = [];
    this.routePoints = [];
    this.map.instance.removeLayer(this.markerLayer);
    PWCMapControlsService.destroyForm();

    if (this.activeShapeBackup) {
      this.map.instance.addLayer(this.activeShapeBackup);
    }
  }


  onMarkerClick(event) {
    if (
      this.lastMarker.settings.latlng === event.latlng &&
      this.viaPoints.length > 1
    ) {
      this.onStop();
    }
  }

  onDrag() { }

  onStop() {

    PWCMapRoutingService.getRoute(this.routePoints).then(response => {
      this.route = response;

      const defaultTextForm = {
        name: this.route.summary.distance.toString(),
        shapeProps: {},
        pwcProps: {
          type: "PWCRulerControl",
          control: "pwc-ruler-control"
        }
      };
      this.activeShape = new L.GeoJSON(this.route.geometry, {
        onEachFeature: function (_feature, layer) {
          layer.bindTooltip(response.summary.distance.toString()).openTooltip();
        }
      });
      this.activeShape.addTo(this.map.instance);
      const form = new PWCCustomControlForm(defaultTextForm);

      PWCMapControlsService.initializeForm(form);
      // this.map.instance.addLayer(this.activeShape);
    });
    // this.form.pwcProps.control = "pwc-ruler-control";

    L.DomUtil.removeClass(
      this.map.instance["_container"],
      "crosshair-cursor-enabled"
    );

    this.map.instance.off("click");
  }

  removePointsOnMap(oldViaPoints) {
    const ctrl = this;
    this.map.instance.eachLayer(function (layer) {
      if (oldViaPoints.includes(layer)) {
        ctrl.map.instance.removeLayer(layer);
      }
    });

    this.map.instance.removeLayer(this.geometry);
  }

  detectPoint() {
    if (this.state === STATES.IDLE) {
      return;
    }
    L.DomUtil.addClass(
      this.map.instance["_container"],
      "crosshair-cursor-enabled"
    );

    this.map.instance.on("click", (event: { latlng: [number, number] }) => {
      this.routePoints.push(event.latlng);
      this.lastMarker = PWCMapMarkerFactory.getOne({
        latlng: event["latlng"],
        template: `🌑`,
        options: { draggable: true }
      });

      const ctrl = this;
      this.lastMarker.instance.on("click", function (e) {
        e.originalEvent.stopPropagation();
        ctrl.onMarkerClick(e);
      });
      this.lastMarker.instance.addTo(this.markerLayer);
      this.viaPoints.push(this.lastMarker.instance);
    });
  }

  @Method()
  async getActiveShape() {
    return this.activeShape;
  }

  _drawPolyline(feature) {
    new L.GeoJSON(feature.geometry, {
      onEachFeature: function (_feature, layer) {
        layer.bindTooltip(feature.summary.distance.toString()).openTooltip();
      }
    });
  }

  render() {
    return (
      this.state === STATES.POINT_DETECTION && (
        <div class="guide">
          📍 Çizmek istediğiniz yolun başlangıç ve bitiş noktalarını haritaya
          çift tıklayarak belirleyin.
        </div>
      )
    );
  }
}
