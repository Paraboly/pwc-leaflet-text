import { Component, Prop, h, Element, State } from "@stencil/core";
import "@polymer/paper-slider/paper-slider.js";
import "@paraboly/pwc-ibox";
import PWCCustomControlForm from "./pwc-custom-control-form.model";
import PWCUtils from "../../../../../core/utils.service";

@Component({
  tag: "pwc-custom-control-form",
  styleUrls: ["./pwc-custom-control-form.css"]
})
export class PWCCustomControlFormComponent {
  @Prop() form: any;
  @Element() elem: HTMLElement;
  @State() fontSize;
  @State() width;
  @State() fontColor;
  @State() bgColor;

  componentWillLoad() {
    this.form = new PWCCustomControlForm(this.form);
    Object.keys(this.form.shapeProps).map(
      key => (this[key] = this.form.shapeProps[key])
    );
  }

  componentDidLoad() {
    this.registerSliderEventListeners(this.onFormValuesChanged.bind(this));
    this.registerColorPickers(this.onFormValuesChanged.bind(this));
  }

  onFormValuesChanged(model, e) {
    e.preventDefault();
    this[model] = e.target.value || e.detail;
  }

  registerSliderEventListeners(callback) {
    const sliders = [
      { id: "slider-font-size", model: "fontSize" },
      { id: "slider-width", model: "width" }
    ];
    sliders.map(slider => {
      var ps = this.elem.querySelector(`#${slider.id}`);
      ps.addEventListener(
        "value-change",
        PWCUtils.partial(callback, slider.model)
      );
    });
  }

  registerColorPickers(callback) {
    const colorPickers = [
      { id: "font-color-picker", model: "fontColor" },
      { id: "bg-color-picker", model: "bgColor" }
    ];
    colorPickers.map(cp => {
      const picker = this.elem.querySelector(`#${cp.id}`);
      picker.addEventListener(
        "colorPickedEvent",
        PWCUtils.partial(callback, cp.model)
      );
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(e);
  }

  onCancel(e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (
      <pwc-ibox>
        <pwc-ibox-title>{this.form.title}</pwc-ibox-title>
        <pwc-ibox-content>
          <form>
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
              <label>Genişlik: </label>
              <paper-slider
                id="slider-width"
                pin
                snaps
                max="400"
                max-markers="10"
                step="4"
                value={this.width}
              ></paper-slider>
            </div>
            <div class="form-group">
              <label>Yazı Rengi: </label>
              <color-picker id="font-color-picker"></color-picker>
            </div>
            <div class="form-group">
              <label>Arkaplan: </label>
              <color-picker id="bg-color-picker"></color-picker>
            </div>
          </form>
        </pwc-ibox-content>
        <pwc-ibox-footer>
          <input type="button" value="Iptal" onClick={this.onCancel} />
          <input type="button" value="Kaydet" onClick={this.onSubmit} />
        </pwc-ibox-footer>
      </pwc-ibox>
    );
  }
}
