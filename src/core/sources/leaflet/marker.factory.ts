import L from "leaflet";

/**
 * @description Generate Leaflet marker instances
 * @abstract
 * @class LeafletMarkerFactory
 */
abstract class LeafletMarkerFactory {
  /**
   * @description given configurations, generate new leaflet marker. If template given, it will use DivIcon.
   * @returns New Leaflet Marker instance
   * @memberof LeafletMarkerFactory
   */
  public static getOne(cfg: {
    latlng: L.LatLng;
    template: string;
    options?: L.MarkerOptions;
  }) {
    const icon = cfg.template
      ? new L.DivIcon({
          className: "pwc-leaflet-div-marker",
          html: cfg.template
        })
      : new L.Icon({ className: "pwc-leaflet-div-marker" });

    cfg.options = Object.assign(cfg.options || {}, { icon });

    return L.marker(cfg.latlng, cfg.options);
  }
}

export default LeafletMarkerFactory;
