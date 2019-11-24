import PWCMapMarker from "./pwc-map-marker.model";
export abstract class PWCMapMarkerFactory {
  /**
   * @static
   * @description Get PWCMapMarker for a given settings,
   * if template provided, it will returns Div Marker.
   * @param {PWCMapMarkerSettings} settings
   * @returns {PWCMapMarker} PWCMapMarker instance
   * @memberof PWCMapMarkerFactory
   */
  public static getOne(settings: {
    latlng: number[];
    template?: string;
    options?: any;
  }): any {
    return new PWCMapMarker(settings);
  }
}
