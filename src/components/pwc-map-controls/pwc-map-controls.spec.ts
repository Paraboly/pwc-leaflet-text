import { TestWindow } from '@stencil/core/testing';
import { PwcMapControls } from './pwc-map-controls';

describe('pwc-map-controls', () => {
  it('should build', () => {
    expect(new PwcMapControls()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLPwcMapControlsElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [PwcMapControls],
        html: '<pwc-map-controls></pwc-map-controls>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
