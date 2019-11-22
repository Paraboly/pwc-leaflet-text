import L from "leaflet";
import LeafletService from "./leaflet.service";

/**
 * @description Generate Leaflet Map instances
 * @abstract
 * @class LeafletMapFactory
 */
abstract class LeafletMapFactory {
  /**
   * @description Create Leaflet instance with given layer
   * @param target Html element id of the container
   * @param layer If provided, map initialized with given layer
   * @param options Leaflet map options
   * @returns New Leaflet map instance
   */
  public static getOne(cfg: {
    target: string;
    layer?: { url: string; config: L.TileLayerOptions };
    options: L.MapOptions;
  }) {
    console.log(cfg);
    const map = new L.Map(cfg.target, cfg.options);

    if (cfg.layer && cfg.layer.url) {
      LeafletService.createLayer(cfg.layer.url, cfg.layer.config).addTo(map);
    }

    return map;
  }
}

export default LeafletMapFactory;
