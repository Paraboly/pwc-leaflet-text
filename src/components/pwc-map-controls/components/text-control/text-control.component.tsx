import { Component, Prop } from "@stencil/core";
import PWCCustomControl from "../../../pwc-custom-control/pwc-custom-control.interface";
@Component({
  tag: "pwc-text-control",
  styleUrls: [],
  shadow: true
})
export class PWCTextControl implements PWCCustomControl {
  @Prop() shape;
  @Prop() form;

  componentDidLoad() {
    console.log(this.shape);
    console.log(this.form);
  }

  render() {
    return null;
  }
}
