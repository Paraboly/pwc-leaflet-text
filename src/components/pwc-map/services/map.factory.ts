import PWCMap from "./pwc-map.model";
export abstract class MapFactory {
  public static getOne(settings: any) {
    return new PWCMap(settings);
  }
}
