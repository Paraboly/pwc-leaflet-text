import { Component, Prop, h, Element, State } from "@stencil/core";
import "@polymer/paper-slider/paper-slider.js";
import "@paraboly/pwc-ibox";
import PWCCustomControlForm from "./pwc-custom-control-form.model";
import L from "leaflet";

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
    L.DomEvent.disableClickPropagation(this.elem);
    this.form = new PWCCustomControlForm(this.form);
    Object.keys(this.form.shapeProps).map(
      key => (this[key] = this.form.shapeProps[key])
    );
  }

  componentDidLoad() {
    L.DomEvent.disableClickPropagation(this.elem);
    this.registerEventListeners(this.onFormValuesChanged.bind(this));
  }

  onFormValuesChanged(e) {
    e.preventDefault();
    console.log(this.fontSize);
  }

  registerEventListeners(callback) {
    const formItems = ["slider-font-size", "slider-width"];
    formItems.map(item => {
      var ps = this.elem.querySelector(`#${item}`);
      ps.addEventListener("value-change", callback);
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
              <input
                type="color"
                name="fontColor"
                id="fontColor"
                value={this.fontColor}
                onInput={this.onFormValuesChanged}
              />
            </div>
            <div class="form-group">
              <label>Arkaplan: </label>
              <input
                type="color"
                name="bgColor"
                id="bgColor"
                value={this.bgColor}
                onInput={this.onFormValuesChanged}
              />
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
