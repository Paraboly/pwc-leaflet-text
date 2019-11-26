import { Component, Prop, h, State, Element } from "@stencil/core";
import "@paraboly/pwc-ibox";
import "@polymer/paper-slider/paper-slider";

const STYLES = {
  rotatable: {
    position: "absolute",
    borderRadius: "4px",
    width: "8px",
    height: "8px",
    background: "red",
    right: "0",
    bottom: "-4px",
    left: "0",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    cursor: "alias",
    outline: "none"
  }
};

@Component({
  tag: "control-marker-template",
  styleUrls: ["./control-marker-template.css"],
  shadow: true
})
export class Map {
  @Element() element: HTMLElement;
  private textArea;
  @Prop() text?: string = "Ornek Etiket";
  @Prop() fontSize: string = "16px";
  @Prop() fontColor: string = "red";
  @Prop() bgColor: string = "#FFF";
  @State() angle: string = "0";
  @State() margin: string = "10";
  @State() padding: string = "10";

  handleChange(event) {
    this.text = event.target.value;
  }

  componentDidLoad() {
    this.textArea = this.element.shadowRoot.lastElementChild;
    this.element.setAttribute(
      "style",
      ` margin-left: ${-(this.textArea.offsetWidth / 2 - 4)}px;
        margin-top: ${-(this.textArea.offsetHeight / 2) - 4}px;`
    );

    this.startRotate();
  }

  updateTextHeight(event) {
    var matches = event.target.value.match(/\n/g);
    var breaks = matches ? matches.length + 1 : 1;
    console.log(matches, breaks);
    event.target.setAttribute("rows", breaks.toString());
  }

  rotateText(event) {
    const center = [
      event.target["style"].left + event.target["offsetWidth"] / 2,
      event.target["style"].top + event.target["offsetHeight"] / 2
    ];

    const angle =
      Math.atan2(event.pageX - center[0], -(event.pageY - center[1])) *
      (180 / Math.PI);

    event.target["style"].transform = `rotate(${angle}deg)`;
  }

  startRotate() {
    // feature global
    let ondrag = false;
    const startXY = {
      x: 0,
      y: 0
    };
    const originXY = {
      x: 0,
      y: 0
    };
    let dragTarget = null;
    let startAngle = 0;

    // feature bindings
    const elements = Array.prototype.slice.call([
      this.element.shadowRoot.lastElementChild.firstChild
    ]);

    const computeAngle = (point, origin) => {
      const dx = point.x - origin.x;
      const dy = origin.y - point.y;

      let radians = 0;
      if (dx || dy) radians = Math.atan2(dx, dy);
      // if (radians < 0) radians += 2 * Math.PI;

      return radians;
    };
    const mousemoveHandler = event => {
      const currentXY = {
        x: event.clientX,
        y: event.clientY
      };

      const currentAngle = computeAngle(currentXY, originXY);
      const rotation = currentAngle - startAngle;
      dragTarget.style.transform = `rotate(${rotation}rad)`;
      // console.log('mousemove:', rotation, 'rad', rotation * 360 / (2 * Math.PI), 'degrees');
    };
    const mouseupHandler = event => {
      ondrag = false;
      dragTarget = null;

      window.removeEventListener("mousemove", mousemoveHandler);
      window.removeEventListener("mouseup", mouseupHandler);
      // console.log('mouseup, drag done');
    };
    const stopSelect = e => {
      if (e.stopPropagation) e.stopPropagation();
      e.cancelBubble = true;
      // if (e.preventDefault) e.preventDefault();
      // e.returnValue = false;
      return false;
    };
    elements.forEach(e => {
      e.addEventListener("mousedown", event => {
        ondrag = true;
        startXY.x = event.clientX;
        startXY.y = event.clientY;
        const viewportOffset = e.getBoundingClientRect();
        originXY.x = viewportOffset.left + e.clientLeft + e.clientWidth / 2;
        originXY.y = viewportOffset.top + e.clientTop + e.clientHeight / 2;
        dragTarget = this.textArea;
        startAngle = computeAngle(startXY, originXY);

        // disable selection, to capture mousemove properly (use css)
        // dragTarget.style.userSelect = 'none';

        // trace drag on window object, don't care mouse outside browser or not
        window.addEventListener("mousemove", mousemoveHandler);
        window.addEventListener("mouseup", mouseupHandler);

        console.log(
          "drag start\n",
          startXY,
          originXY,
          "\n",
          (startAngle * 360) / (2 * Math.PI),
          "degrees"
        );
        return stopSelect(event);
      });
    });
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <span class="rotatable" style={STYLES.rotatable}></span>
        <textarea
          style={{
            boxSizing: "border-box",
            resize: "none",
            backgroundColor: this.bgColor,
            fontSize: `${this.fontSize}px`,
            color: this.fontColor,
            cursor: "move",
            textAlign: "center"
          }}
          rows={1}
          value={this.text}
          placeholder="Metin giriniz..."
          class="form-control"
          //onMouseDown={this.rotateText}
          onKeyUp={this.updateTextHeight}
          onInput={event => this.handleChange(event)}
        />
      </div>
    );
  }
}
