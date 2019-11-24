import L from "leaflet";
import { CONSTANTS } from "../../module";

abstract class LeafletService {
  public static createLayer(
    url: string,
    config: L.TileLayerOptions = {
      maxZoom: CONSTANTS.DEFAULTS.ZOOM
    }
  ) {
    return new L.TileLayer(url, config);
  }
}

export default LeafletService;
