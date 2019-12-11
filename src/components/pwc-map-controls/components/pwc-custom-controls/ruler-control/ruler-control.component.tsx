import { Component, Prop, State, h, Event, EventEmitter } from "@stencil/core";
import PWCCustomControl from "../pwc-custom-control.interface";
import L from "leaflet";
import { PWCMapMarkerFactory } from "../../../../pwc-map-marker/services/pwc-map-marker.factory";
import PWCMapControlsService from "../../../services/pwc-map-controls.service";
import PWCMapRoutingService from "../../../../../core/services/pwc-map-route.service";
import PWCMapMarker from "../../../../pwc-map-marker/services/pwc-map-marker.model";

enum STATES {
  POINT_DETECTION,
  SHOW_FORM
}
@Component({
  tag: "pwc-ruler-control",
  styleUrls: []
})
export class PWCRulerControl implements PWCCustomControl {
  private viaPoints: PWCMapMarker[];
  private routePoints: Array<[number, number]>;
  private lastMarker: PWCMapMarker;
  @Event() save: EventEmitter;
  @State() state: STATES = STATES.POINT_DETECTION;
  @Prop() map;
  @Prop() geometry;
  @Prop() form;

  constructor() {
    this.viaPoints = [];
    this.routePoints = [];
  }

  componentDidLoad() {
    this.detectPoint();
  }

  onMarkerClick(event) {
    if (
      this.lastMarker.settings.latlng === event.latlng &&
      this.viaPoints.length > 1
    ) {
      this.state = STATES.SHOW_FORM;
      this.onStop();
    }
  }

  onDrag() {}

  onStop() {
    PWCMapRoutingService.getRoute(this.routePoints).then(route => {
      this.geometry = new L.GeoJSON(route.geometry, {
        onEachFeature: function(_feature, layer) {
          layer.bindTooltip(route.summary.distance.toString()).openTooltip();
        }
      });
      this.geometry.addTo(this.map.instance);
    });

    PWCMapControlsService.initializeForm(this.form);

    L.DomUtil.removeClass(
      this.map.instance["_container"],
      "crosshair-cursor-enabled"
    );

    this.map.instance.off("click");
  }

  removePointsOnMap(oldViaPoints) {
    const ctrl = this;
    this.map.instance.eachLayer(function(layer) {
      if (oldViaPoints.includes(layer)) {
        ctrl.map.instance.removeLayer(layer);
      }
    });

    this.map.instance.removeLayer(this.geometry);
  }

  detectPoint() {
    if (this.state === STATES.SHOW_FORM) {
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
        template: `<i>${this.viaPoints.length + 1}</i>🌑`,
        options: { draggable: true }
      });

      const ctrl = this;
      this.lastMarker.instance.on("click", function(e) {
        e.originalEvent.stopPropagation();
        ctrl.onMarkerClick(e);
      });
      this.lastMarker.instance.addTo(this.map.instance);
      this.viaPoints.push(this.lastMarker.instance);
    });
  }

  render() {
    return (
      <div>
        <div class="guide">
          📍 Çizmek istediğiniz yolun başlangıç ve bitiş noktalarını haritaya
          çift tıklayarak belirleyin.
        </div>
      </div>
    );
  }
}
