import L from "leaflet";

/**
 * @description Generate Leaflet marker instances
 * @abstract
 * @class LeafletMarkerFactory
 */
abstract class LeafletMarkerFactory {
  /**
   * @description given configurations, generate new leaflet div marker
   * @returns New Leaflet div marker instance
   * @memberof LeafletMarkerFactory
   */
  public static getDivMarker(cfg: {
    latlng: L.LatLng;
    template: string;
    options?: L.MarkerOptions;
  }) {
    const icon = L.divIcon({
      className: "pwc-leaflet-div-marker",
      html: cfg.template
    });

    cfg.options = Object.assign(cfg.options || {}, { icon });

    return L.marker(cfg.latlng, cfg.options);
  }
}

export default LeafletMarkerFactory;
