import PWCEditableService from "./pwc-editable.service";
import { Component, Prop, h, Element, State, Event } from "@stencil/core";

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
  @State() state: STATES = STATES.UNINITIALIZED;
  @Prop() text?: string = "Ornek Etiket";
  @Prop() textOptions: string;
  @Event()
  change;

  handleChange(event) {
    this.text = event.target.value;
  }

  componentWillLoad() {
    this.textOptions =
      typeof this.textOptions === "string" ? JSON.parse(this.textOptions) : {};
  }

  componentDidLoad() {
    const rotatableElement = this.element.querySelector("[rotatable-element]");
    const rotationPoint = this.element.querySelector("[rotation-point]");

    PWCEditableService.moveElementToCursorPosition(
      rotatableElement,
      rotationPoint
    );

    PWCEditableService.registerRotateAbility(rotatableElement, rotationPoint);
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

  render() {
    return (
      <div rotatable-element style={{ position: "relative" }}>
        <span rotation-point class="rotatable">
          📍
        </span>
        <div
          id="content"
          spellcheck="false"
          onClick={this.focusText.bind(this)}
          style={this.textOptions as any}
        >
          {this.text}
        </div>
      </div>
    );
  }
}
