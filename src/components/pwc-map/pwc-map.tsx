import {
  Element,
  Component,
  Prop,
  h,
  Method,
  Event,
  EventEmitter
} from "@stencil/core";
import { MapFactory } from "../../core/module";
import PWCMap from "./services/pwc-map.model";

@Component({
  tag: "pwc-map",
  styleUrl: "pwc-map.css"
})
export class PwcMap {
  private map: PWCMap;
  @Element() private element: HTMLElement;
  @Event() mapInitialized: EventEmitter;
  /**
   * Config for the map to be initialized
   */
  @Prop() config: Object;

  /**
   * Allow to get map instance from pwc-map element
   * @returns Promise which resolves pwc map instance
   * @author SchemeSonic
   */
  @Method()
  async getMap(): Promise<PWCMap> {
    return Promise.resolve(this.map);
  }
  //@Prop() getMap: () => Promise<PWCMap> = this.getMapInstance;

  componentDidLoad() {
    this.map = MapFactory.getOne({
      target: this.element.querySelector("div")
    });
    this.mapInitialized.emit(this.map);
  }

  render() {
    return <div class="pwc-map-container"></div>;
  }
}
