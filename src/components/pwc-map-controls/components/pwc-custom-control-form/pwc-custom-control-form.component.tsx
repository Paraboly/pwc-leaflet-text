import {
  Component,
  h,
  Element,
  State,
  Event,
  EventEmitter,
  Method
} from "@stencil/core";
import "@polymer/paper-slider/paper-slider.js";
import "@paraboly/pwc-ibox";
import PWCCustomControlForm from "./pwc-custom-control-form.model";
import PWCUtils from "../../../../core/utils.service";

enum ACTIONS {
  SAVE = "save",
  CANCELED = "canceled",
  DELETED = "deleted",
  CHANGED = "changed"
}

enum STATES {
  UNINITIALIZED,
  INITIALIZED
}

@Component({
  tag: "pwc-custom-control-form",
  styleUrls: ["./pwc-custom-control-form.css"],
  shadow: true
})
export class PWCCustomControlFormComponent {
  private form: PWCCustomControlForm;
  @Element() elem: HTMLElement;
  @Event() formActions: EventEmitter;
  @State() formState: STATES = STATES.UNINITIALIZED;

  componentWillLoad() {}

  registerSliderEventListeners(callback) {
    const sliders = [
      { id: "slider-font-size", model: "fontSize" },
      { id: "slider-width", model: "width" },
      { id: "slider-padding", model: "padding" }
    ];
    sliders.map(slider => {
      setTimeout(() => {
        const ps = this.elem.shadowRoot.querySelector(`#${slider.id}`);
        ps.addEventListener(
          "value-change",
          PWCUtils.partial(callback, slider.model)
        );
      }, 1000);
    });
  }

  onFormValuesChanged(model, e) {
    e.preventDefault();
    this.form.shapeProps[model] =
      typeof e.target.value === "number"
        ? e.target.value + "px"
        : e.target.value;

    this.formActions.emit({
      action: ACTIONS.CHANGED,
      data: this.form.forServer()
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.formActions.emit({
      action: ACTIONS.SAVE,
      data: this.form.forServer()
    });
  }

  onDelete(e) {
    e.preventDefault();
    this.formActions.emit({ action: ACTIONS.DELETED, data: this.form });
  }

  onCancel(e) {
    e.preventDefault();
    this.formActions.emit({ action: ACTIONS.CANCELED, data: this.form });
  }

  @Method()
  async initialize(form: any) {
    this.form = new PWCCustomControlForm(form);
    this.formState = STATES.INITIALIZED;
    this.registerSliderEventListeners(this.onFormValuesChanged.bind(this));
  }

  @Method()
  async destroy() {
    this.form = null;
    this.formState = STATES.UNINITIALIZED;
  }

  render() {
    return (
      this.formState === STATES.INITIALIZED && (
        <pwc-ibox>
          <pwc-ibox-title>
            <strong>🔎 Detaylar: </strong>
            {this.form.name}
          </pwc-ibox-title>
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
                  value={this.form.shapeProps.fontSize || 12}
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
                  value={this.form.shapeProps.width || 100}
                ></paper-slider>
              </div>
              <div class="form-group">
                <label>Hücre Boşluğu: </label>
                <paper-slider
                  id="slider-padding"
                  pin
                  snaps
                  max="25"
                  max-markers="10"
                  step="5"
                  value={this.form.shapeProps.padding || 5}
                ></paper-slider>
              </div>
              <div class="form-group">
                <label>Yazı Rengi: </label>
                <input
                  type="color"
                  name="font-color-picker"
                  id="font-color-picker"
                  value={this.form.shapeProps.color}
                  onChange={PWCUtils.partial(
                    this.onFormValuesChanged.bind(this),
                    "color"
                  )}
                />
              </div>
              <div class="form-group">
                <label>Arkaplan: </label>
                <input
                  type="color"
                  name="bg-color-picker"
                  id="bg-color-picker"
                  value={this.form.shapeProps.backgroundColor}
                  onChange={PWCUtils.partial(
                    this.onFormValuesChanged.bind(this),
                    "backgroundColor"
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
      )
    );
  }
}
