import { Component, Prop, State, h, Event, EventEmitter } from "@stencil/core";
import PWCCustomControl from "../pwc-custom-control.interface";
import L from "leaflet";
import { PWCMapMarkerFactory } from "../../../../pwc-map-marker/services/pwc-map-marker.factory";
import PWCMapControlsService from "../../../services/pwc-map-controls.service";
import PWCMapRoutingService from '../../../../../core/services/pwc-map-route.service';

let viaPoints = []
let routePoints = [];
let latestMarker;

enum STATES {
  POINT_DETECTION,
  SHOW_FORM
}
@Component({
  tag: "pwc-ruler-control",
  styleUrls: []
})
export class PWCRulerControl implements PWCCustomControl {
  @Event() save: EventEmitter;
  @State() state: STATES = STATES.POINT_DETECTION;
  @Prop() map;
  @Prop() shape;
  @Prop() form;

  componentDidLoad() {
    this.detectPoint();
  }

  componentDidUnload() {
    this.removePointsOnMap(viaPoints)
    this.map.instance.off("click")
    L.DomUtil.removeClass(
      this.map.instance["_container"],
      "crosshair-cursor-enabled"
    );
    viaPoints = [];
  }

  onMarkerClick(event) {
    if (latestMarker.settings.latlng === event.latlng && viaPoints.length > 1) {
      this.state = STATES.SHOW_FORM;
      this.onStop();
    }
  }

  onStop() {
    console.log(PWCMapRoutingService.getRoute(routePoints));
    PWCMapControlsService.initializeForm(latestMarker)
  }

  removePointsOnMap(oldViaPoints) {
    const ctrl = this;
    this.map.instance.eachLayer(function (layer) {
      if (oldViaPoints.includes(layer)) {
        ctrl.map.instance.removeLayer(layer);
      }
    });
  }

  detectPoint() {
    L.DomUtil.addClass(
      this.map.instance["_container"],
      "crosshair-cursor-enabled"
    );

    if (this.state === STATES.SHOW_FORM) {
      return;
    }

    this.map.instance.doubleClickZoom.disable();
    this.map.instance.on("click", event => {
      setTimeout(() => this.map.instance.doubleClickZoom.enable());

      routePoints.push(event["latlng"]);
      latestMarker = PWCMapMarkerFactory.getOne({
        latlng: event["latlng"],
        template: "🌑",
        options: { draggable: true }
      });
      const ctrl = this;
      latestMarker.instance.on('click', function (e) {
        e.originalEvent.stopPropagation();
        ctrl.onMarkerClick(e)
      });
      latestMarker.instance.addTo(this.map.instance);
      viaPoints.push(latestMarker.instance);

    });


  }

  render() {
    return (
      <div>
        <div class="guide">
          📍 Çizmek istediğiniz yolun başlangıç ve bitiş noktalarını haritaya çift tıklayarak belirleyin.
        </div>
      </div>
    );
  }
}





 // this.map.instance.on("click", event => {
    //   this.map.instance.doubleClickZoom.enable();

    //   L.DomUtil.removeClass(
    //     this.map.instance["_container"],
    //     "crosshair-cursor-enabled"
    //   );

    //   this.pin = PWCMapMarkerFactory.getOne({
    //     latlng: event["latlng"],
    //     template: "<pwc-editable-text/>",
    //     options: { draggable: true }
    //   });

    //   this.pin.instance.on("dragstart", () => {
    //     this.map.instance.dragging.disable();
    //   });

    //   this.pin.instance.on("dragend", () => {
    //     this.map.instance.dragging.enable();
    //   });

    //   this.pin.instance.addTo(this.map.instance);

    //   PWCMapControlsService.initializeForm(this.pin);
    // });