import { TestWindow } from '@stencil/core/testing';
import { PwcMap } from './pwc-map';

describe('pwc-map', () => {
  it('should build', () => {
    expect(new PwcMap()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLPwcMapElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [PwcMap],
        html: '<pwc-map></pwc-map>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
