import PWCMap from "./pwc-map.model";
export class MapFactory {
  public static getOne(settings: any) {
    return new PWCMap(settings);
  }
}
