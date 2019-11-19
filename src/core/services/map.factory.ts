import PWCMap from "../models/pwc-map.model";

export class MapFactory {
  /**
   * @static
   * @param {Object} settings
   * @returns PWCMap instance with given settings
   * @memberof MapFactory
   */
  public static getOne(settings?: {}) {
    return new PWCMap(settings);
  }

  public static getMultiple() {}
}
