export abstract class PWCMapUtils {
  public static flyTo(map, location, callback) {
    return {
      map,
      location,
      callback
    };
  }

  public static fitBound(map, boundingbox, duration) {
    return { map, boundingbox, duration };
  }

  public static panTo(map, center, duration) {
    return { map, center, duration };
  }

  public static createLayer(url, params) {
    return { url, params };
  }

  public static createGeojsonMarker(config) {
    return config;
  }

  public static createMarker(config) {
    return config;
  }
}
