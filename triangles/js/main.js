/**
 * main.js
 */

(function (g, d) {

  /**
   * Constants
   */

  const CONTAINER_SELECTOR = 'div.drawing-area-container';
  const CANVAS_SELECTOR = 'canvas#drawing-area';
  const INPUT_FIELDS_SELECTOR = 'div.input-fields-container input.input-field-side';
  const EVENT_CANVAS_RESIZE = 'resize';

  /**
   * Utils
   */

  function updateCanvasSize(container, canvas) {
    const newSize = {
      width: container.clientWidth,
      height: container.clientHeight
    };
    canvas.width = newSize.width;
    canvas.height = newSize.height;
    return newSize;
  }

  function getDOMElements() {
    const container = d.querySelector(CONTAINER_SELECTOR);
    const canvas = container && container.querySelector(CANVAS_SELECTOR);
    const fields = {};
    const fieldsList = d.querySelectorAll(INPUT_FIELDS_SELECTOR);
    if (fieldsList && fieldsList.length > 0) {
      fieldsList.forEach(function (input) {
        fields[input.name] = input;
      });
    }
    return {
      container,
      canvas,
      fields
    };
  }

  /**
   * Main
   */

  if (typeof g.triangles !== 'function') {
    g.console.error('Triangles module not found...');
    return;
  }

  // Query DOM for target elements
  const domElements = getDOMElements();
  if (!domElements.container) {
    g.console.error('Drawing area container not found...');
    return;
  }

  if (!domElements.canvas) {
    g.console.error('Drawing area not found...');
    return;
  }

  // Set initial canvas size;
  updateCanvasSize(domElements.container, domElements.canvas);

  // Set resize event handler to global object
  g.addEventListener('resize', function () {
    // Update canvas size;
    const newSize = updateCanvasSize(domElements.container, domElements.canvas);
    // Create and dispatch the canvas resize event
    const resizeEvent = new CustomEvent(EVENT_CANVAS_RESIZE, {
      detail: {
        width: newSize.width,
        height: newSize.height,
        time: g.performance.now()
      }
    });
    domElements.canvas.dispatchEvent(resizeEvent);
  }, false);

  // Init triangles module
  g.triangles(g, domElements.canvas, domElements.fields);

})(this, this.document);
