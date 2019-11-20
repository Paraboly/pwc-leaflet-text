import PWC_MAP_CONSTANTS from "../../../core/constants";
import { PWCMapControlsService } from "../../pwc-map-controls/services/pwc-map-controls.service";

/**
 *
 * @description
 * @class PWCMap
 */
export default class PWCMap {
  instance: L.Map;
  controls: {
    create: (controlName: string, config?) => L.Control;
  };
  settings = {
    source: PWC_MAP_CONSTANTS.SOURCES.LEAFLET,
    target: PWC_MAP_CONSTANTS.DEFAULTS.TARGET,
    center: PWC_MAP_CONSTANTS.DEFAULTS.CENTER,
    zoom: PWC_MAP_CONSTANTS.DEFAULTS.ZOOM,
    maxZoom: PWC_MAP_CONSTANTS.DEFAULTS.MAX_ZOOM,
    layer: {
      url: PWC_MAP_CONSTANTS.DEFAULTS.BASE_LAYER.URL
    }
  };

  constructor(settings) {
    this.settings = Object.assign(this.settings, settings);
    this.initialize();
  }

  initialize() {
    this.instance = this.settings.source.getOne(this.settings);
    /**
     * Register control methods
     */
    this.controls = {
      create: PWCMapControlsService.createControl
    };
  }
}
