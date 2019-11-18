import LEAFLET from "./sources/leaflet/leaflet.service";

const PWA_MAP_CONSTANTS = {
  DEFAULTS: {
    TARGET: "pwc-map",
    CENTER: [39.8974598, 32.7758598],
    ZOOM: 11,
    MAX_ZOOM: 21,
    BASE_LAYER: {
      URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    },
    ANIMATION_DURATION: 2000
  },
  SOURCES: {
    LEAFLET
  }
};

export default PWA_MAP_CONSTANTS;
