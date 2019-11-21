import L from "leaflet";

abstract class LeafletMarkerFactory {
  public static createDivMarker(latlng, html) {
    var myIcon = L.divIcon({ className: "leaflet-div-marker", html });
    return L.marker(latlng, { icon: myIcon, draggable: true });
  }
}

export default LeafletMarkerFactory;
