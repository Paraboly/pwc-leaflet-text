import { Component, Prop } from "@stencil/core";

@Component({
  tag: "pwc-map-marker",
  styleUrl: "pwc-map-marker.css"
})
export class PwcMapMarker {
  @Prop() config: {};

  render() {
    return null;
  }
}
