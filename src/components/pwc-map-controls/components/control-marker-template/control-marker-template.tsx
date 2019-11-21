import { Component, Prop, h, Element, State } from "@stencil/core";
import "@paraboly/pwc-ibox";
import "@polymer/paper-slider/paper-slider";
@Component({
  tag: "control-marker-template",
  styleUrls: ["./control-marker-template.css"],
  shadow: true
})
export class Map {
  @Element() private element: HTMLElement;
  @Prop() map: any;
  @Prop() config: Object;
  @State() form: string;
  @State() fontSize: string = "14";
  @State() fontColor: string;
  @State() bgColor: string;

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.form);
    // send data to our backend
  }

  handleChange(event) {
    this.form = event.target.value;
  }

  componentDidLoad() {
    const self = this;
    const fontSlider = this.element.shadowRoot.querySelector("#font-size");
    fontSlider["min"] = 10;

    fontSlider.addEventListener("value-change", function() {
      self.fontSize = fontSlider["value"];
    });

    [
      { id: "color-picker-font", model: "fontColor" },
      { id: "color-picker-bg", model: "bgColor" }
    ].map(cpConf => {
      const colorPicker = this.element.shadowRoot.querySelector(
        `#${cpConf.id}`
      );
      colorPicker["colors"] = [
        "#989898",
        "#101516",
        "#951955",
        "#130394",
        "#444444"
      ];
      colorPicker.addEventListener("colorPickedEvent", event => {
        self[cpConf.model] = event["detail"];
        if (cpConf.model === "bgColor")
          self.element.shadowRoot.lastElementChild.children[0].shadowRoot.lastElementChild.setAttribute(
            "style",
            `background-color: ${self[cpConf.model]};border: none;`
          );
      });
    });
  }

  render() {
    return (
      <pwc-ibox>
        <pwc-ibox-title>
          <input
            type="text"
            value={this.form}
            placeholder="Metin giriniz..."
            class="form-control"
            style={{
              backgroundColor: "transparent",
              fontSize: `${this.fontSize}px`,
              color: this.fontColor
            }}
            onInput={event => this.handleChange(event)}
          />
          <pwc-ibox-tools minimize-button close-button />
        </pwc-ibox-title>
        <pwc-ibox-content>
          <form onSubmit={e => this.handleSubmit(e)}>
            <div class="form-group">
              <label>Font: </label>
              <paper-slider
                id="font-size"
                pin
                snaps
                max="40"
                max-markers="20"
                step="1"
                value={this.fontSize}
              ></paper-slider>
            </div>
            <div class="form-group">
              <label>Yazı Rengi: </label>
              <color-picker id="color-picker-font"></color-picker>
            </div>
            <div class="form-group">
              <label>Arkaplan: </label>
              <color-picker id="color-picker-bg"></color-picker>
            </div>
          </form>
        </pwc-ibox-content>
        <pwc-ibox-footer>
          <input type="submit" value="Kaydet" />
        </pwc-ibox-footer>
      </pwc-ibox>
    );
  }
}
