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
  private rotatableElement: HTMLElement;
  private rotationPoint: HTMLElement;
  private contentElement: HTMLElement;

  @Element() element: HTMLElement;
  @State() shapeOptions;
  @State() state: STATES = STATES.UNINITIALIZED;
  @Prop() text?: string = "Ornek Etiket";
  @Prop() textOptions: string | any;
  @Prop() editable = false;

  componentWillLoad() {
    this.textOptions =
      typeof this.textOptions === "string" ? JSON.parse(this.textOptions) : {};
    this.shapeOptions = this.textOptions["shapeProps"];

    if (this.editable) this.state = STATES.EDIT;
  }

  componentDidLoad() {
    this.rotatableElement = this.element.querySelector("[rotatable-element]");
    this.rotationPoint = this.element.querySelector("[rotation-point]");
    this.contentElement = this.element.querySelector("#content");

    PWCMapControlsService.registerFormListener(this.onFormAction.bind(this));

    if (this.editable) this.enableEdit();
  }

  enableEdit() {
    if (this.state !== STATES.EDIT) this.state = STATES.EDIT;

    PWCEditableService.registerRotateAbility(
      this.rotatableElement,
      this.rotationPoint
    );

    this.contentElement.contentEditable = "true";
    this.contentElement.focus();
    PWCEditableService.placeCaretAtEnd(this.contentElement);

    PWCEditableService.moveElementToCursorPosition(
      this.rotatableElement,
      this.rotationPoint
    );
  }

  disableEdit() {
    this.state = STATES.INITIALIZED;
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
          style={Object.assign(this.shapeOptions, { transform: "" })}
        >
          {this.text}
        </div>
      </div>
    );
  }
}
