import L from "leaflet";
import { CONSTANTS } from "../../module";

export default class LeafletService {
  public static createLayer(
    url: string,
    config: L.TileLayerOptions = {
      maxZoom: CONSTANTS.DEFAULTS.ZOOM
    }
  ) {
    return new L.TileLayer(url, config);
  }
}
