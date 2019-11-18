import PWA_MAP_CONSTANTS from "../constants";
import "../sources/leaflet/leaflet.service";
import { MapControlService } from "./map-control";

export default class PWCMap {
  instance;
  settings = {
    source: PWA_MAP_CONSTANTS.SOURCES.LEAFLET,
    target: PWA_MAP_CONSTANTS.DEFAULTS.TARGET,
    center: PWA_MAP_CONSTANTS.DEFAULTS.CENTER,
    zoom: PWA_MAP_CONSTANTS.DEFAULTS.ZOOM,
    maxZoom: PWA_MAP_CONSTANTS.DEFAULTS.MAX_ZOOM,
    layer: {
      url: PWA_MAP_CONSTANTS.DEFAULTS.BASE_LAYER.URL
    }
  };

  constructor(settings) {
    this.settings = Object.assign(this.settings, settings);
    this.initialize();
  }

  initialize() {
    this.instance = this.settings.source.getOne(this.settings);
    this["controls"] = MapControlService;
  }
}
