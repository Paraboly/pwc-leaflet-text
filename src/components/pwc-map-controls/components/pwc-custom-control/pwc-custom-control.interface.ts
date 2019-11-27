import L from "leaflet";
import PWCMapMarker from "../../../pwc-map-marker/services/pwc-map-marker.model";
import PWCCustomControlForm from "./pwc-custom-control-form/pwc-custom-control-form.model";

interface PWCCustomControl {
  form: PWCCustomControlForm;
  shape: PWCMapMarker | L.Polyline | L.Circle | L.Polygon;
}

export default PWCCustomControl;
