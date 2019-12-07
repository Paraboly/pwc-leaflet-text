import L from "leaflet";
import { CONSTANTS } from "../../module";

abstract class LeafletService {
  public static createLayer(
    url: string,
    config: L.TileLayerOptions = {
      maxZoom: CONSTANTS.DEFAULTS.MAX_ZOOM,
      maxNativeZoom: 21
    }
  ) {
    return new L.TileLayer(url, config);
  }
}

export default LeafletService;
