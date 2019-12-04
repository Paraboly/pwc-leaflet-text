import { Component, Prop, h } from "@stencil/core";
import PWCCustomControlForm from "./pwc-custom-control-form.model";

const styles = {
  iboxTitle: { fontSize: "large" },
  formGroup: { display: "flex" },
  formLabel: { textAlign: "initial", width: "80px" }
};
@Component({
  tag: "pwc-custom-control-form",
  styleUrls: [],
  shadow: true
})
export class PWCCustomControlFormComponent {
  @Prop() form: any;

  componentDidLoad() {
    console.log(this.form);
    console.log(JSON.parse(this.form));
    console.log(new PWCCustomControlForm(JSON.parse(this.form)));
    console.log(this.form);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <pwc-ibox>
        <ibox-title style={styles.iboxTitle}> 📝Etiket</ibox-title>
        <pwc-ibox-content>
          <form onSubmit={e => this.handleSubmit(e)}>
            <div class="form-group" style={styles.formGroup}>
              <label style={styles.formLabel}>Font: </label>
              <paper-slider
                id="slider-font-size"
                pin
                snaps
                max="40"
                max-markers="20"
                step="1"
                value={"12"}
              ></paper-slider>
            </div>
            <div class="form-group" style={styles.formGroup}>
              <label style={styles.formLabel}>Döndür: </label>
              <paper-slider
                id="slider-angle"
                pin
                snaps
                max="180"
                max-markers="20"
                step="15"
                value={"45"}
              ></paper-slider>
            </div>
            <div class="form-group" style={styles.formGroup}>
              <label style={styles.formLabel}>Genislet: </label>
              <paper-slider
                id="slider-size"
                pin
                snaps
                max="40"
                max-markers="10"
                step="4"
                value={"10"}
              ></paper-slider>
            </div>
            <div class="form-group" style={styles.formGroup}>
              <label style={styles.formLabel}>Yazı Rengi: </label>
              <color-picker id="color-picker-font"></color-picker>
            </div>
            <div class="form-group" style={styles.formGroup}>
              <label style={styles.formLabel}>Arkaplan: </label>
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
