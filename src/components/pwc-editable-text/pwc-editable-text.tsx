import PWCEditableService from "./pwc-editable.service";
import { Component, Prop, h, State, Element } from "@stencil/core";
@Component({
  tag: "pwc-editable-text",
  styleUrls: ["./pwc-editable-text.css"]
})
export class PWCEditableTextComponent {
  @Element() element: HTMLElement;
  @Prop() text?: string = "Ornek Etiket";
  @Prop() styles;
  @State() angle: string = "0";
  @State() margin: string = "10";
  @State() padding: string = "10";

  handleChange(event) {
    this.text = event.target.value;
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
        >
          {this.text}
        </div>
      </div>
    );
  }
}
