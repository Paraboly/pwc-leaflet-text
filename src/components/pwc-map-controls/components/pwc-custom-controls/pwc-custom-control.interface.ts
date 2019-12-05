import L from "leaflet";
import PWCCustomControlForm from "../pwc-custom-control-form/pwc-custom-control-form.model";

interface PWCCustomControl {
  form: PWCCustomControlForm;
  geometry: L.GeoJSON;
}

export default PWCCustomControl;
