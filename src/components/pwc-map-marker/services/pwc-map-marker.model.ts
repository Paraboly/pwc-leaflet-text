import PWC_MAP_CONSTANTS, { MAP_SOURCES } from "../../../core/constants";
/**
 *
 * @description
 * @class PWCMapMarker
 */
export default class PWCMapMarker {
  instance: any;
  settings: {
    latlng: number[];
    template?: string;
    options?: any;
  } = { latlng: PWC_MAP_CONSTANTS.DEFAULTS.CENTER };

  constructor(settings) {
    Object.assign(this.settings, settings);
    /**
     * Get actions dynamically(currently Leaflet)
     */
    const actions =
      PWC_MAP_CONSTANTS.FACTORIES[settings.source || MAP_SOURCES.Leaflet]
        .MARKER;

    /**
     * If template is given, create div marker, otherwise marker.
     */
    this.instance = actions.getOne(this.settings);
  }
}
