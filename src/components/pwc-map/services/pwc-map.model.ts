import PWC_MAP_CONSTANTS, { MAP_SOURCES } from "../../../core/constants";
import PWCMapControlService from "../../pwc-map-controls/services/pwc-map-controls.service";

/**
 *
 * @description
 * @class PWCMap
 */
export default class PWCMap {
  instance: any;
  controls: {
    create: (controlName: string, config?) => L.Control;
  };
  settings = {
    target: PWC_MAP_CONSTANTS.DEFAULTS.TARGET,
    source: PWC_MAP_CONSTANTS.DEFAULTS.SOURCE,
    options: {
      center: PWC_MAP_CONSTANTS.DEFAULTS.CENTER,
      zoom: PWC_MAP_CONSTANTS.DEFAULTS.ZOOM,
      maxZoom: PWC_MAP_CONSTANTS.DEFAULTS.MAX_ZOOM
    },
    layer: {
      url: PWC_MAP_CONSTANTS.DEFAULTS.BASE_LAYER.URL
    }
  };

  constructor(settings) {
    Object.assign(this.settings, settings);

    this.controls = {
      create: PWCMapControlService.createControl
    };

    this.instance = PWC_MAP_CONSTANTS.FACTORIES[
      settings.source || MAP_SOURCES.Leaflet
    ].MAP.getOne(this.settings);
  }
}
