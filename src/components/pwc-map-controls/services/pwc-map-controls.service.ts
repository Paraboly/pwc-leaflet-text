import L from "leaflet";
import PWC_MAP_CONTROLS_CONSTANT from "../pwc-map-controls.constant";
import PWCUtils from "../../../core/utils.service";
import { STATES } from "./state-handler.service";
import { PWCMapMarkerFactory } from "../../pwc-map-marker/services/pwc-map-marker.factory";
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
      tooltipText: string;
      icon: string;
      template: string;
      onTriggered;
    }
  ): HTMLElement {
    const controlButton = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control pwc-custom-control"
    );

    controlButton.innerHTML = `<pwc-tooltip tooltip-alignment="right" tooltip-text="${cfg.tooltipText}" tooltip-source="${cfg.icon}"></pwc-tooltip>`;

    this.registerEventListeners(controlButton, cfg, map);

    return controlButton;
  }

  /**
   * @description Register click events for custom controls
   */
  private static registerEventListeners(
    controlButton: HTMLElement,
    cfg: { tooltipText: string; icon: string; template: string; onTriggered },
    map: L.Map
  ) {
    const listenerCallbacks = [this.onControlActivated];

    L.DomEvent.addListener(controlButton, "click", L.DomEvent.stop);

    listenerCallbacks.map(cb =>
      L.DomEvent.addListener(
        controlButton,
        "click",
        PWCUtils.partial(cb, controlButton, map, cfg),
        this
      )
    );

    L.DomEvent.disableClickPropagation(controlButton);
  }

  /**
   * @private
   * @static
   * @description When user click any map control, eg: Ruler Control,
   * selected control will be activated and register its own component.
   * @param {HTMLElement} Dom element of the control
   * @param {L.Map} map interacted map instance
   * @param {{ tooltipText: string; icon: string; template: string; onTriggered: function;}} cfg is configuration parameters for control button
   * @memberof PWCMapControlsService
   */
  private static onControlActivated(
    control: HTMLElement,
    map: L.Map,
    cfg: { tooltipText: string; icon: string; template: string; onTriggered }
  ) {
    /**
     * Before control action activation, we ensure that there should be a single child,
     * otherwise it is already activated.
     */
    if (control.childElementCount > 1) return;

    let state = STATES.START;

    if (state === STATES.START) {
      PWCUtils.renderComponent(control, cfg.template);
      L.DomUtil.addClass(map["_container"], "crosshair-cursor-enabled");
      state = STATES.POINT_DETECTION;
    }

    if (state === STATES.POINT_DETECTION) {
      map.doubleClickZoom.disable();
      map.once("click", event => {
        setTimeout(() => map.doubleClickZoom.enable());
        L.DomUtil.removeClass(map["_container"], "crosshair-cursor-enabled");

        PWCMapMarkerFactory.getOne({
          latlng: event["latlng"],
          template: "<pwc-editable-text/>",
          options: { draggable: true }
        }).instance.addTo(map);
      });
    }
    /**
     * Trigger callback
     */
    // cfg.onTriggered(cfg);
  }

  /**
   * @static
   * @description Inject props to rendered Custom Control Web Component
   * @param {string} controlName
   * @memberof PWCMapControlsService
   */
  public static injectPropsToCustomControl(controlName: string) {
    const controlConfig =
      PWC_MAP_CONTROLS_CONSTANT.CONTROL_CONFIGS[controlName];

    const control = document.querySelector(controlConfig.tag);
    /**
     * Inject component params to control's web component
     */
    Object.keys(controlConfig.params).map(
      key => (control[key] = controlConfig.params[key])
    );
  }
}
