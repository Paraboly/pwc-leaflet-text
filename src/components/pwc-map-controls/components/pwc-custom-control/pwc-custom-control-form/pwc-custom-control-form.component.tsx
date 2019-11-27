import { Component, Prop, h } from "@stencil/core";
import "@polymer/paper-slider/paper-slider.js";
import "@paraboly/pwc-ibox";

@Component({
  tag: "pwc-custom-control-form",
  styleUrls: ["./pwc-custom-control-form.css"]
})
export class PWCCustomControlFormComponent {
  @Prop() form: any;

  componentDidLoad() {
    console.log(this.form);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <pwc-ibox>
        <pwc-ibox-title>{this.form.title}</pwc-ibox-title>
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
                value={this.form.fontSize}
              ></paper-slider>
            </div>
            <div class="form-group">
              <label>Genişlik: </label>
              <paper-slider
                id="slider-size"
                pin
                snaps
                max="400"
                max-markers="10"
                step="4"
                value={this.form.width}
              ></paper-slider>
            </div>
            <div class="form-group">
              <label>Yazı Rengi: </label>
              <input
                type="color"
                name="fontColor"
                id="fontColor"
                value={this.form.fontColor}
              />
            </div>
            <div class="form-group">
              <label>Arkaplan: </label>
              <input
                type="color"
                name="bgColor"
                id="bgColor"
                value={this.form.bgColor}
              />
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
