import LeafletMarkerFactory from "./sources/leaflet/marker.factory";
import LeafletMapFactory from "./sources/leaflet/map.factory";

export enum MAP_SOURCES {
  Leaflet = "LEAFLET",
  Mapbox = "MAPBOX",
  Openlayers = "OPENLAYERS"
}

const PWC_MAP_CONSTANTS = {
  DEFAULTS: {
    TARGET: "pwc-map",
    SOURCE: MAP_SOURCES.Leaflet,
    CENTER: [39.8974598, 32.7758598],
    ZOOM: 11,
    MAX_ZOOM: 21,
    BASE_LAYER: {
      URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    },
    ANIMATION_DURATION: 2000
  },
  FACTORIES: {
    LEAFLET: {
      MAP: LeafletMapFactory,
      MARKER: LeafletMarkerFactory
    }
  }
};

export default PWC_MAP_CONSTANTS;
