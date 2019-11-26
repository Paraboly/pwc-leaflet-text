abstract class PWCEditableService {
  public static registerRotateAbility(rotatingElement, rotationPoint) {
    const startXY = { x: 0, y: 0 };
    const originXY = { x: 0, y: 0 };
    let rotateTarget = null;
    let startAngle = 0;

    const elements = Array.prototype.slice.call([rotationPoint]);

    const computeAngle = (point, origin) => {
      const dx = point.x - origin.x;
      const dy = origin.y - point.y;

      let radians = 0;
      if (dx || dy) radians = Math.atan2(dx, dy);

      return radians;
    };

    const mousemoveHandler = event => {
      const currentXY = {
        x: event.clientX,
        y: event.clientY
      };

      const currentAngle = computeAngle(currentXY, originXY);
      const rotation = currentAngle - startAngle;
      rotateTarget.style.transform = `rotate(${rotation}rad)`;
    };

    const mouseupHandler = () => {
      rotateTarget = null;

      window.removeEventListener("mousemove", mousemoveHandler);
      window.removeEventListener("mouseup", mouseupHandler);
    };
    const stopSelect = e => {
      if (e.stopPropagation) e.stopPropagation();
      e.cancelBubble = true;
      return false;
    };
    elements.forEach(e => {
      e.addEventListener("mousedown", event => {
        startXY.x = event.clientX;
        startXY.y = event.clientY;
        const viewportOffset = e.getBoundingClientRect();
        originXY.x = viewportOffset.left + e.clientLeft + e.clientWidth / 2;
        originXY.y = viewportOffset.top + e.clientTop + e.clientHeight / 2;
        rotateTarget = rotatingElement;
        startAngle = computeAngle(startXY, originXY);

        // trace drag on window object, don't care mouse outside browser or not
        window.addEventListener("mousemove", mousemoveHandler);
        window.addEventListener("mouseup", mouseupHandler);

        return stopSelect(event);
      });
    });
  }

  public static moveElementToCursorPosition(rotatingElement, rotationPoint) {
    rotatingElement.setAttribute(
      "style",
      ` left: ${rotatingElement["offsetWidth"] / 2 -
        rotationPoint["offsetWidth"]}px;
        top: ${-(rotatingElement["offsetHeight"] / 2) -
          rotationPoint["offsetHeight"]}px;`
    );
  }
}

export default PWCEditableService;
