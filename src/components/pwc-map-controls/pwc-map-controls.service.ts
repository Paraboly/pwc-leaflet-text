import L from "leaflet";
export abstract class PWCMapControlsService {
  /**
   * @static
   * @description Given parameters, custom control will be created and control instance will be returned
   * @example PWCMapControlsService.createControl("exampleControl").addTo(map)
   * @param {string} controlName of the custom control to be created
   * @param {Object} config for the control
   * @returns new custom control instance
   * @memberof PWCMapControlsService
   */
  public static createControl(
    controlName: string,
    config: {
      template: string;
      position?: string;
      icon?: string;
      tooltipText?: string;
    }
  ): L.Control {
    const cfg = Object.assign(config, { position: "topleft" });

    const control = L.Control.extend({
      onAdd: function() {
        const container = L.DomUtil.create(
          "div",
          "leaflet-bar leaflet-control leaflet-control-label"
        );

        container.innerHTML = `<pwc-tooltip tooltip-alignment="right" tooltip-text="${cfg.tooltipText}" tooltip-source="${cfg.icon}"></pwc-tooltip>${cfg.template}`;

        return container;
      },

      onRemove: function() {
        // Nothing to do here
      }
    });

    L.Control[controlName] = function(opts) {
      return new control(opts);
    };

    return new L.Control[controlName]({ position: cfg.position });
  }
}
