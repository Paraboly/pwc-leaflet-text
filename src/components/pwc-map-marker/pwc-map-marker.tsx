import { Component, Prop } from "@stencil/core";
import PWCMapMarker from "./services/pwc-map-marker.model";

@Component({
  tag: "pwc-map-marker",
  styleUrl: "pwc-map-marker.css"
})
export class PwcMapMarker {
  private marker: PWCMapMarker;
  @Prop() config: {};

  render() {
    console.log(this.marker);
    return null;
  }
}
