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
  @State() angle: string;
  @State() size: string = "10";

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
    const ibox =
      self.element.shadowRoot.lastElementChild.shadowRoot.lastElementChild;
    const iboxTitle =
      self.element.shadowRoot.lastElementChild.children[0].shadowRoot
        .lastElementChild;

    const sliderConfigs = [
      { id: "slider-font-size", model: "fontSize", min: 10 },
      { id: "slider-size", model: "size", min: 5 },
      { id: "slider-angle", model: "angle", min: -180 }
    ];

    sliderConfigs.map(sCfg => {
      const slider = this.element.shadowRoot.querySelector(`#${sCfg.id}`);
      slider["min"] = sCfg["min"];
      slider.addEventListener("value-change", function() {
        self[sCfg.model] = slider["value"];
        if (sCfg.model === "angle") {
          ibox.setAttribute(
            "style",
            `transform: rotate(${self[sCfg.model]}deg);`
          );
        }
        if (sCfg.model === "size") {
          ibox.setAttribute(
            "style",
            `transform: scale(${parseInt(self[sCfg.model]) / 10});`
          );
        }
      });
    });

    const colorPickerConfigs = [
      { id: "color-picker-font", model: "fontColor" },
      { id: "color-picker-bg", model: "bgColor" }
    ];
    colorPickerConfigs.map(cpConf => {
      const colorPicker = this.element.shadowRoot.querySelector(
        `#${cpConf.id}`
      );
      colorPicker["colors"] = [
        "#989898",
        "#101516",
        "#951955",
        "#130394",
        "#444444",
        "transparent"
      ];
      colorPicker.addEventListener("colorPickedEvent", event => {
        self[cpConf.model] = event["detail"];
        if (cpConf.model === "bgColor")
          iboxTitle.setAttribute(
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
                id="slider-font-size"
                pin
                snaps
                max="40"
                max-markers="20"
                step="1"
                value={this.fontSize}
              ></paper-slider>
            </div>
            <div class="form-group">
              <label>Döndür: </label>
              <paper-slider
                id="slider-angle"
                pin
                snaps
                max="180"
                max-markers="20"
                step="15"
                value={this.angle}
              ></paper-slider>
            </div>
            <div class="form-group">
              <label>Genislet: </label>
              <paper-slider
                id="slider-size"
                pin
                snaps
                max="40"
                max-markers="10"
                step="4"
                value={this.size}
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
