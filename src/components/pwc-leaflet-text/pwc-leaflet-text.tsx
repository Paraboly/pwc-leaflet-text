import { Element, Component, Prop, h } from "@stencil/core";
import { MapFactory } from "../../core/module";
@Component({
  tag: "pwc-leaflet-text",
  styleUrls: ["./pwc-leaflet-text.css"]
})
export class Map {
  @Element() private element: HTMLElement;
  @Prop() map: Object;
  @Prop() config: Object;

  componentWillLoad() {}
  componentDidLoad() {
    this.map = MapFactory.getOne({ target: this.element });
  }

  render() {
    return <div></div>;
  }
}
