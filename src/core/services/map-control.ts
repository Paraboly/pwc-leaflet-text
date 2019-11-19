import L from "leaflet";
export abstract class MapControlService {
  /**
   * @static
   * @description Given parameters, custom control will be created and control instance will be returned
   * @example MapControlService.createControl("exampleControl").addTo(map)
   * @param {string} controlName of the custom control to be created
   * @param {Object} config for the control
   * @returns new custom control instance
   * @memberof MapControlService
   */
  public static createControl(
    controlName: string,
    config = { position: "topleft" }
  ): L.Control {
    const control = L.Control.extend({
      onAdd: function() {
        const container = L.DomUtil.create(
          "div",
          "leaflet-bar leaflet-control leaflet-control-label"
        );
        container.innerHTML = `<pwc-tooltip tooltip-alignment="right" tooltip-text="Etiket Ekle" tooltip-source="https://www.svgrepo.com/show/14960/text-box.svg" style="display: block;margin-left:-1px;margin-top: -1px;"></pwc-tooltip>`;

        Object.assign(container.style, MapControlService.getControlStyle());

        return container;
      },

      onRemove: function() {
        // Nothing to do here
      }
    });

    L.Control[controlName] = function(opts) {
      return new control(opts);
    };

    return new L.Control[controlName]({ position: config.position });
  }

  public static getControlStyle(customStyle?) {
    const defaultStyle = {
      backgroundColor: "white",
      width: "26px",
      height: "26px",
      boxSizing: "border-box",
      border: "4px solid transparent",
      cursor: "pointer"
    };

    Object.assign(defaultStyle, customStyle);

    return defaultStyle;
  }
}
