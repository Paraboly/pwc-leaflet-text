import { Element, Component, Prop, h, Method } from "@stencil/core";
import { MapFactory } from "../../core/module";
import PWCMap from "./services/pwc-map.model";

@Component({
  tag: "pwc-map",
  styleUrl: "pwc-map.css",
  shadow: true
})
export class PwcMap {
  @Element() private element: HTMLElement;

  /**
   * Config for the map to be initialized
   */
  @Prop() config: Object;
  private map: PWCMap;

  componentDidLoad() {
    this.map = MapFactory.getOne({
      target: this.element.shadowRoot.querySelector("div")
    });
  }

  /**
   *
   * @description Allow to get map instance from pwc-map element
   * @returns the map instance
   * @memberof PwcMap
   */
  @Method()
  async getMap(): Promise<any> {
    return Promise.resolve(this.map);
  }

  render() {
    return <div class="pwc-map-container"></div>;
  }
}
