import { TestWindow } from '@stencil/core/testing';
import { PwcMapMarker } from './pwc-map-marker';

describe('pwc-map-marker', () => {
  it('should build', () => {
    expect(new PwcMapMarker()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLPwcMapMarkerElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [PwcMapMarker],
        html: '<pwc-map-marker></pwc-map-marker>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
