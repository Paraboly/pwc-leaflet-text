import PWCEditableService from "./pwc-editable.service";
import { Component, Prop, h, Element, State, Event } from "@stencil/core";
@Component({
  tag: "pwc-editable-text",
  styleUrls: ["./pwc-editable-text.css"]
})
export class PWCEditableTextComponent {
  private options: { [key: string]: string } = {};
  @Element() element: HTMLElement;
  @State() active: boolean = true;
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

    this.options = this.textOptions as any;

    // Register ElementID if it is new one
    this.options.elementId = this.options.elementId
      ? this.options.elementId
      : new Date().valueOf().toString();
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
