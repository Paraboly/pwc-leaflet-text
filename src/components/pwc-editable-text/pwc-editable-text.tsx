import PWCEditableService from "./pwc-editable.service";
import { Component, Prop, h, State, Element } from "@stencil/core";
@Component({
  tag: "pwc-editable-text",
  styleUrls: ["./pwc-editable-text.css"]
})
export class PWCEditableTextComponent {
  @Element() element: HTMLElement;
  @Prop() text?: string = "Ornek Etiket";
  @Prop() fontSize: string = "16px";
  @Prop() fontColor: string = "red";
  @Prop() bgColor: string = "#FFF";
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

  updateTextHeight(event) {
    var matches = event.target.value.match(/\n/g);
    var breaks = matches ? matches.length + 1 : 1;
    event.target.setAttribute("rows", breaks.toString());
  }

  render() {
    return (
      <div rotatable-element style={{ position: "relative" }}>
        <span rotation-point class="rotatable">
          📍
        </span>
        <textarea
          rows={1}
          value={this.text}
          placeholder="Metin giriniz..."
          class="form-control"
          onKeyUp={this.updateTextHeight}
          onInput={event => this.handleChange(event)}
        />
      </div>
    );
  }
}
