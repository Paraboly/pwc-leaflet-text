import { PWCMapMarkerFactory } from "../../components/pwc-map-marker/services/pwc-map-marker.factory";
let viaPoints = [];
let routePoints = [];
let latestMarker, globalMap;

export default abstract class PWCMapRoutingService {
  public static onStart(map) {
    globalMap = map;
    map.instance.on("click", event => {
      setTimeout(() => map.instance.doubleClickZoom.enable());

      routePoints.push(event["latlng"]);
      latestMarker = PWCMapMarkerFactory.getOne({
        latlng: event["latlng"],
        template: "🌑",
        options: { draggable: true }
      });
      const parent = this;
      latestMarker.instance.on("click", function(e) {
        e.originalEvent.stopPropagation();
        parent.onMarkerClick(e);
      });
      latestMarker.instance.addTo(map.instance);
      viaPoints.push(latestMarker.instance);
    });
  }

  public static onMarkerClick(event) {
    if (latestMarker.settings.latlng === event.latlng && viaPoints.length > 1) {
      // this.onStop();
    }
  }

  public static onStop(selectedPoints) {
    console.log(this.getRoute(selectedPoints));
    const oldViaPoints = viaPoints;
    viaPoints = [];
    this.removePointsOnMap(oldViaPoints);
  }

  private static removePointsOnMap(oldViaPoints) {
    globalMap.instance.eachLayer(function(layer) {
      if (oldViaPoints.includes(layer)) {
        globalMap.instance.removeLayer(layer);
      }
      console.log(layer);
    });
  }

  /**
   *
   * @description creates route by given coordinates array
   * @static
   * @param {*} map
   * @param {*} coordinates
   * @memberof PWCMapRouting
   */
  public static getRoute(coordinates) {
    return this.prepareQuery(coordinates);
    // return { map, boundingbox, duration };
  }

  /**
   *
   * @description prepares query string
   * @private
   * @static
   * @param {*} coordinates
   * @returns
   * @memberof PWCMapRouting
   */
  private static prepareQuery(coordinates) {
    let wayPoints;
    coordinates.forEach((coordinate, index) => {
      wayPoints = wayPoints
        ? wayPoints + coordinate.lng + "%2C" + coordinate.lat
        : coordinate.lng + "%2C" + coordinate.lat;
      if (coordinates[index + 1]) {
        wayPoints = wayPoints + "%7C";
      }
    });

    return this.createRouteFromOSM(wayPoints);
  }

  /**
   *
   * @description get routes from osm
   * @private
   * @static
   * @param {*} wayPoints
   * @memberof PWCMapRouting
   */
  private static async createRouteFromOSM(wayPoints): Promise<any> {
    const api = `https://api.openrouteservice.org/directions?api_key=5b3ce3597851110001cf6248d532e3f61c1c4b9aae10167c3efd47ec&coordinates=${wayPoints}&geometry=true&geometry_format=geojson&language=en-US&preference=fastest&profile=driving-car&units=m`;

    return fetch(api)
      .then((response: Response) => response.json())
      .then(response => {
        console.log(response.routes[0].summary.distance);
        return response.routes[0];
      });
  }
}
