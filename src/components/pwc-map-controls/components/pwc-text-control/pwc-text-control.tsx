import { Component, Prop, h } from "@stencil/core";
@Component({
  tag: "pwc-text-control",
  styleUrls: ["./pwc-text-control.css"]
})
export class Map {
  //@Element() private element: HTMLElement;
  @Prop() map: any;
  @Prop() config: Object;

  componentDidLoad() {
    alert("Hello world");
  }

  render() {
    return <div></div>;
  }
}
