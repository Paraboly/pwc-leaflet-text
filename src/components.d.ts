/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface ControlMarkerTemplate {
    'config': Object;
    'map': any;
  }
  interface PwcMap {
    /**
    * Config for the map to be initialized
    */
    'config': Object;
    /**
    * @description Allow to get map instance from pwc-map element
    * @returns the map instance
    * @memberof PwcMap
    */
    'getMap': () => Promise<any>;
  }
  interface PwcMapControls {
    /**
    * @description Get registered controls
    * @returns List of registered controls
    * @memberof PwcMapControls
    */
    'getControls': () => Promise<any>;
  }
  interface PwcMapTextControl {
    'config': Object;
    'map': any;
  }
}

declare global {


  interface HTMLControlMarkerTemplateElement extends Components.ControlMarkerTemplate, HTMLStencilElement {}
  var HTMLControlMarkerTemplateElement: {
    prototype: HTMLControlMarkerTemplateElement;
    new (): HTMLControlMarkerTemplateElement;
  };

  interface HTMLPwcMapElement extends Components.PwcMap, HTMLStencilElement {}
  var HTMLPwcMapElement: {
    prototype: HTMLPwcMapElement;
    new (): HTMLPwcMapElement;
  };

  interface HTMLPwcMapControlsElement extends Components.PwcMapControls, HTMLStencilElement {}
  var HTMLPwcMapControlsElement: {
    prototype: HTMLPwcMapControlsElement;
    new (): HTMLPwcMapControlsElement;
  };

  interface HTMLPwcMapTextControlElement extends Components.PwcMapTextControl, HTMLStencilElement {}
  var HTMLPwcMapTextControlElement: {
    prototype: HTMLPwcMapTextControlElement;
    new (): HTMLPwcMapTextControlElement;
  };
  interface HTMLElementTagNameMap {
    'control-marker-template': HTMLControlMarkerTemplateElement;
    'pwc-map': HTMLPwcMapElement;
    'pwc-map-controls': HTMLPwcMapControlsElement;
    'pwc-map-text-control': HTMLPwcMapTextControlElement;
  }
}

declare namespace LocalJSX {
  interface ControlMarkerTemplate {
    'config'?: Object;
    'map'?: any;
  }
  interface PwcMap {
    /**
    * Config for the map to be initialized
    */
    'config'?: Object;
  }
  interface PwcMapControls {}
  interface PwcMapTextControl {
    'config'?: Object;
    'map'?: any;
  }

  interface IntrinsicElements {
    'control-marker-template': ControlMarkerTemplate;
    'pwc-map': PwcMap;
    'pwc-map-controls': PwcMapControls;
    'pwc-map-text-control': PwcMapTextControl;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'control-marker-template': LocalJSX.ControlMarkerTemplate & JSXBase.HTMLAttributes<HTMLControlMarkerTemplateElement>;
      'pwc-map': LocalJSX.PwcMap & JSXBase.HTMLAttributes<HTMLPwcMapElement>;
      'pwc-map-controls': LocalJSX.PwcMapControls & JSXBase.HTMLAttributes<HTMLPwcMapControlsElement>;
      'pwc-map-text-control': LocalJSX.PwcMapTextControl & JSXBase.HTMLAttributes<HTMLPwcMapTextControlElement>;
    }
  }
}


