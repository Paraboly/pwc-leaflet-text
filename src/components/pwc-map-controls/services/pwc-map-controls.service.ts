import L from "leaflet";
import PWC_MAP_CONTROLS_CONSTANT from "../pwc-map-controls.constant";
import PWCUtils from "../../../core/utils.service";
abstract class PWCMapControlsService {
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
    const cfg = Object.assign(
      config,
      PWC_MAP_CONTROLS_CONSTANT.DEFAULT_CONTROL_CONFIG
    );

    const PWCMapCustomControl = L.Control.extend({
      onAdd: map => PWCMapControlsService.generateControlButton(map, cfg)
    });

    L.Control[controlName] = function(opts) {
      return new PWCMapCustomControl(opts);
    };

    return new L.Control[controlName]({ position: cfg.position });
  }

  /**
   * @static
   * @description Create Map Control dom element with the given configuration
   * @param {{ tooltipText: string; icon: string; template: string; onTriggered: function;}} cfg is configuration parameters for control button
   * @returns {HTMLElement} generated map control button
   * @memberof PWCMapControlsService
   */
  public static generateControlButton(
    map: L.Map,
    cfg: {
      tooltipText?: string;
      icon?: string;
      template?: string;
      position?: string;
      onTriggered?;
    }
  ): HTMLElement {
    const controlButton = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control pwc-custom-control"
    );

    controlButton.innerHTML = `
      <a>
        <pwc-tooltip tooltip-alignment="right" tooltip-text="${cfg.tooltipText}" tooltip-source="${cfg.icon}"></pwc-tooltip>
      </a>`;

    this.registerEventListeners(controlButton, cfg, map);

    return controlButton;
  }

  /**
   * @description Register click events for custom controls
   */
  private static registerEventListeners(
    controlButton: HTMLElement,
    cfg: {
      tooltipText?: string;
      icon?: string;
      template?: string;
      onTriggered?;
    },
    map: L.Map
  ) {
    L.DomEvent.addListener(controlButton, "click", L.DomEvent.stopPropagation);
    L.DomEvent.addListener(controlButton, "click", L.DomEvent.preventDefault);

    L.DomEvent.addListener(
      controlButton,
      "click",
      PWCUtils.partial(cfg.onTriggered, controlButton, map, cfg),
      this
    );

    L.DomEvent.disableClickPropagation(controlButton);
  }

  /**
   * @static
   * @description Inject props to control form
   * @param {HTMLElement} control
   * @param {string} formProps
   * @memberof PWCMapControlsService
   */
  public static injectPropsToCustomControlForm(control, formProps: any) {
    const formComponent = control.querySelector("pwc-custom-control-form");

    formComponent["form"] = formProps;
  }
}

export default PWCMapControlsService;
