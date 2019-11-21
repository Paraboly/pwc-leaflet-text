/**
 * @description State definition of the Map control actions
 */
export enum STATES {
  START,
  POINT_DETECTION,
  DONE,
  CANCEL
}

/**
 * @class PWCMapControlStateHandler
 */
export abstract class PWCMapControlStateHandler {
  public static detectPoint(map: L.Map) {
    console.log(map);
  }
}
