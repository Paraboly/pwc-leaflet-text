import L from "leaflet";
import { CONSTANTS } from "../../module";

export default class LeafletService {
  public static getOne(config) {
    const map = new L.Map(config.target, config);

    if (config.layer) {
      LeafletService.createLayer(config.layer).addTo(map);
    }

    return map;
  }

  public static createLayer(
    config = {
      maxZoom: CONSTANTS.DEFAULTS.ZOOM,
      url: CONSTANTS.DEFAULTS.BASE_LAYER.URL
    }
  ) {
    return L.tileLayer(config.url, config);
  }
}
