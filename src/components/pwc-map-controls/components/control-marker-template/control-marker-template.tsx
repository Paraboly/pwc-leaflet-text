import { Component, Prop, h, State } from "@stencil/core";
import "@paraboly/pwc-ibox";
import "@polymer/paper-slider/paper-slider";
@Component({
  tag: "control-marker-template",
  styleUrls: ["./control-marker-template.css"],
  shadow: true
})
export class Map {
  @Prop() text?: string;
  @Prop() fontSize: string;
  @Prop() fontColor: string;
  @State() angle: string;
  @State() size: string = "10";

  handleChange(event) {
    this.text = event.target.value;
  }

  componentDidLoad() {}

  render() {
    return (
      <pwc-ibox>
        <pwc-ibox-title>
          <input
            type="text"
            value={this.text}
            placeholder="Metin giriniz..."
            class="form-control"
            style={{
              backgroundColor: "transparent",
              fontSize: `${this.fontSize}px`,
              color: this.fontColor
            }}
            onInput={event => this.handleChange(event)}
          />
          <pwc-ibox-tools close-button />
        </pwc-ibox-title>
      </pwc-ibox>
    );
  }
}
