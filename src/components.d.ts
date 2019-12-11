/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface PwcCustomControlForm {
    'initialize': (form: any, shape: any) => Promise<void>;
  }
  interface PwcEditableText {
    'text'?: string;
    'textOptions': string;
  }
  interface PwcMap {
    /**
    * Config for the map to be initialized
    */
    'config': Object;
    /**
    * Allow to get map instance from pwc-map element
    * @returns Promise which resolves pwc map instance
    * @author SchemeSonic
    */
    'getMap': () => Promise<any>;
  }
  interface PwcMapControls {
    'config': { map: L.Map; controls?: Object };
    /**
    * @description Get registered controls
    * @returns List of registered controls
    * @memberof PwcMapControls
    */
    'getControls': () => Promise<any>;
    /**
    * @description Initialize PWC Map Controls with given config.
    * @returns List of registered control
    * @memberof PwcMapControls
    */
    'initialize': (config: { map: L.Map; controls?: {}; }, geometry: any) => Promise<void>;
  }
  interface PwcMapMarker {
    'config': {};
  }
  interface PwcRulerControl {
    'form': any;
    'geometry': any;
    'map': any;
  }
  interface PwcTextControl {
    'geometry': any;
    'map': any;
  }
}

declare global {


  interface HTMLPwcCustomControlFormElement extends Components.PwcCustomControlForm, HTMLStencilElement {}
  var HTMLPwcCustomControlFormElement: {
    prototype: HTMLPwcCustomControlFormElement;
    new (): HTMLPwcCustomControlFormElement;
  };

  interface HTMLPwcEditableTextElement extends Components.PwcEditableText, HTMLStencilElement {}
  var HTMLPwcEditableTextElement: {
    prototype: HTMLPwcEditableTextElement;
    new (): HTMLPwcEditableTextElement;
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

  interface HTMLPwcMapMarkerElement extends Components.PwcMapMarker, HTMLStencilElement {}
  var HTMLPwcMapMarkerElement: {
    prototype: HTMLPwcMapMarkerElement;
    new (): HTMLPwcMapMarkerElement;
  };

  interface HTMLPwcRulerControlElement extends Components.PwcRulerControl, HTMLStencilElement {}
  var HTMLPwcRulerControlElement: {
    prototype: HTMLPwcRulerControlElement;
    new (): HTMLPwcRulerControlElement;
  };

  interface HTMLPwcTextControlElement extends Components.PwcTextControl, HTMLStencilElement {}
  var HTMLPwcTextControlElement: {
    prototype: HTMLPwcTextControlElement;
    new (): HTMLPwcTextControlElement;
  };
  interface HTMLElementTagNameMap {
    'pwc-custom-control-form': HTMLPwcCustomControlFormElement;
    'pwc-editable-text': HTMLPwcEditableTextElement;
    'pwc-map': HTMLPwcMapElement;
    'pwc-map-controls': HTMLPwcMapControlsElement;
    'pwc-map-marker': HTMLPwcMapMarkerElement;
    'pwc-ruler-control': HTMLPwcRulerControlElement;
    'pwc-text-control': HTMLPwcTextControlElement;
  }
}

declare namespace LocalJSX {
  interface PwcCustomControlForm {
    'onFormActions'?: (event: CustomEvent<any>) => void;
  }
  interface PwcEditableText {
    'onChange'?: (event: CustomEvent<any>) => void;
    'text'?: string;
    'textOptions'?: string;
  }
  interface PwcMap {
    /**
    * Config for the map to be initialized
    */
    'config'?: Object;
    'onMapInitialized'?: (event: CustomEvent<any>) => void;
  }
  interface PwcMapControls {
    'config'?: { map: L.Map; controls?: Object };
    'onActions'?: (event: CustomEvent<any>) => void;
  }
  interface PwcMapMarker {
    'config'?: {};
  }
  interface PwcRulerControl {
    'form'?: any;
    'geometry'?: any;
    'map'?: any;
    'onSave'?: (event: CustomEvent<any>) => void;
  }
  interface PwcTextControl {
    'geometry'?: any;
    'map'?: any;
    'onSave'?: (event: CustomEvent<any>) => void;
  }

  interface IntrinsicElements {
    'pwc-custom-control-form': PwcCustomControlForm;
    'pwc-editable-text': PwcEditableText;
    'pwc-map': PwcMap;
    'pwc-map-controls': PwcMapControls;
    'pwc-map-marker': PwcMapMarker;
    'pwc-ruler-control': PwcRulerControl;
    'pwc-text-control': PwcTextControl;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'pwc-custom-control-form': LocalJSX.PwcCustomControlForm & JSXBase.HTMLAttributes<HTMLPwcCustomControlFormElement>;
      'pwc-editable-text': LocalJSX.PwcEditableText & JSXBase.HTMLAttributes<HTMLPwcEditableTextElement>;
      'pwc-map': LocalJSX.PwcMap & JSXBase.HTMLAttributes<HTMLPwcMapElement>;
      'pwc-map-controls': LocalJSX.PwcMapControls & JSXBase.HTMLAttributes<HTMLPwcMapControlsElement>;
      'pwc-map-marker': LocalJSX.PwcMapMarker & JSXBase.HTMLAttributes<HTMLPwcMapMarkerElement>;
      'pwc-ruler-control': LocalJSX.PwcRulerControl & JSXBase.HTMLAttributes<HTMLPwcRulerControlElement>;
      'pwc-text-control': LocalJSX.PwcTextControl & JSXBase.HTMLAttributes<HTMLPwcTextControlElement>;
    }
  }
}


