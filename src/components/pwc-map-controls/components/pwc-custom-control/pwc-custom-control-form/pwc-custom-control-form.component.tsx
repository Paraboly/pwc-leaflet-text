import {
  Component,
  Prop,
  h,
  Element,
  State,
  Event,
  EventEmitter
} from "@stencil/core";
import "@polymer/paper-slider/paper-slider.js";
import "@paraboly/pwc-ibox";
import PWCCustomControlForm from "./pwc-custom-control-form.model";
import PWCUtils from "../../../../../core/utils.service";

@Component({
  tag: "pwc-custom-control-form",
  styleUrls: ["./pwc-custom-control-form.css"]
})
export class PWCCustomControlFormComponent {
  @Element() elem: HTMLElement;
  @Event() formSubmitted: EventEmitter;
  @Event() formCanceled: EventEmitter;
  @Prop() form: any;
  @Prop() shape: any;
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
    this.setShapeStyle();
  }

  setShapeStyle() {
    this.shape.instance._icon.firstElementChild["styles"] = {
      color: this.fontColor,
      fontSize: this.fontSize + "px",
      width: this.width + "px",
      backgroundColor: this.bgColor
    };
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

  onFormValuesChanged(model, e) {
    e.preventDefault();
    this[model] = e.target.value;
    this.setShapeStyle();
  }

  onSubmit(e) {
    e.preventDefault();
    this.form.shapeProps = {
      color: this.fontColor,
      fontSize: this.fontSize + "px",
      width: this.width + "px",
      backgroundColor: this.bgColor
    };

    this.formSubmitted.emit(this.form.forServer());
  }

  onCancel(e) {
    e.preventDefault();
    this.formCanceled.emit();
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
                name="font-color-picker"
                id="font-color-picker"
                value={this.fontColor}
                onChange={PWCUtils.partial(
                  this.onFormValuesChanged.bind(this),
                  "fontColor"
                )}
              />
            </div>
            <div class="form-group">
              <label>Arkaplan: </label>
              <input
                type="color"
                name="bg-color-picker"
                id="bg-color-picker"
                value={this.bgColor}
                onChange={PWCUtils.partial(
                  this.onFormValuesChanged.bind(this),
                  "bgColor"
                )}
              />
            </div>
          </form>
        </pwc-ibox-content>
        <pwc-ibox-footer>
          <input
            type="button"
            value="Iptal"
            onClick={this.onCancel.bind(this)}
          />
          <input
            type="button"
            value="Kaydet"
            onClick={this.onSubmit.bind(this)}
          />
        </pwc-ibox-footer>
      </pwc-ibox>
    );
  }
}
