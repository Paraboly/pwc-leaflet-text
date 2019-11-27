abstract class PWCUtils {
  public static partial = (func, ...boundArgs) => (...remainingArgs) =>
    func(...boundArgs, ...remainingArgs);

  /**
   *
   * @description given string component, eg: "<my-component/>",
   * create dom object and insert into given wrapper element
   * @memberof PWCUtils
   */
  public static renderComponent = (
    wrapperElement: HTMLElement,
    template: string
  ) => {
    const controlComponent = document
      .createRange()
      .createContextualFragment(template);

    wrapperElement.appendChild(controlComponent);
    return controlComponent;
  };
}

export default PWCUtils;
