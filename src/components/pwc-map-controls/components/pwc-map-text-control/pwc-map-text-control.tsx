import { Component, Prop, h } from "@stencil/core";
@Component({
  tag: "pwc-map-text-control",
  styleUrls: ["./pwc-map-text-control.css"],
  shadow: true
})
export class Map {
  //@Element() private element: HTMLElement;
  @Prop() map: any;
  @Prop() config: Object;

  componentDidLoad() {
    alert("Hello world");
  }

  render() {
    return <div>Hello It is pwc-map-text-control</div>;
  }
}
