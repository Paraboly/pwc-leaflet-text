import PWCEditableService from "./pwc-editable.service";
import { Component, Prop, h, Element, State } from "@stencil/core";
import PWCMapControlsService from "../pwc-map-controls/services/pwc-map-controls.service";

enum STATES {
  UNINITIALIZED,
  INITIALIZED,
  EDIT
}

@Component({
  tag: "pwc-editable-text",
  styleUrls: ["./pwc-editable-text.css"]
})
export class PWCEditableTextComponent {
  @Element() element: HTMLElement;
  @State() shapeOptions;
  @State() state: STATES = STATES.UNINITIALIZED;
  @Prop() text?: string = "Ornek Etiket";
  @Prop() textOptions: string | any;

  componentWillLoad() {
    this.textOptions =
      typeof this.textOptions === "string" ? JSON.parse(this.textOptions) : {};
    this.shapeOptions = this.textOptions["shapeProps"];
  }

  componentDidLoad() {
    const rotatableElement = this.element.querySelector("[rotatable-element]");
    const rotationPoint = this.element.querySelector("[rotation-point]");

    PWCEditableService.moveElementToCursorPosition(
      rotatableElement,
      rotationPoint
    );

    PWCEditableService.registerRotateAbility(rotatableElement, rotationPoint);
    PWCMapControlsService.registerFormListener(this.onFormAction.bind(this));
  }

  focusText(e) {
    const text = e.target;
    text.contentEditable = true;
    text.focus();
    PWCEditableService.placeCaretAtEnd(text);

    text.addEventListener("focusout", function onFocus() {
      text.contentEditable = false;
      text.removeEventListener("focusout", onFocus);
    });
  }

  onFormAction(event) {
    if (
      this.textOptions.pwcProps.created === event.detail.data.pwcProps.created
    ) {
      this.shapeOptions = {
        ...this.shapeOptions,
        ...event.detail.data.shapeProps
      };
    }
  }

  render() {
    return (
      <div
        rotatable-element
        style={{ position: "relative", transform: this.shapeOptions.transform }}
      >
        <span rotation-point class="rotatable">
          📍
        </span>
        <div
          id="content"
          spellcheck="false"
          onClick={this.focusText.bind(this)}
          style={Object.assign(this.shapeOptions, { transform: "" })}
        >
          {this.text}
        </div>
      </div>
    );
  }
}
