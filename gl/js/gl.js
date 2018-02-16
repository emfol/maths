/**
 * triangles
 * @param {Object} g The global object
 * @param {HTMLCanvasElement} canvasElement The target canvas element
 * @param {Object} inputElements The map with input elements
 */

 function GL(g, canvasElement, inputElements) {
  /**
   * Constants
   */

  /**
   * Utils
   */

  const getTime = g.performance && typeof g.performance.now === 'function'
    ? g.performance.now.bind(g.performance)
    : Date.now.bind(Date);

  const printMessage = g.console && typeof g.console.log === 'function'
    ? g.console.log.bind(g.console)
    : (function nop() {});

  /**
   * Methods
   */

  function inputChangeEventHandler(e) {
    printMessage(e, drawingContext);
  }

  function initWebGLContext(context) {
    const { webglContext: gl, width, height } = context;
    if (!gl) {
      throw new Error('Oops! The WebGL context could not be initialized...');
    }
    // Print supported extensions
    printMessage(gl.getSupportedExtensions());
    // Update WebGL Viewport
    gl.viewportWidth = width;
    gl.viewportHeight = height;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  function repaint(context, time) {
    printMessage(context);
    printMessage(`Repaint called... ${time}`);
  }

  /**
   * Init
   */

  const drawingContext = {
    webglContext: canvasElement.getContext('webgl'),
    width: canvasElement.width,
    height: canvasElement.height,
    input: {
      input_a: ''
    }
  };

  // Init WebGL!
  initWebGLContext(drawingContext);

  // Add resize event listener
  canvasElement.addEventListener('resize', function (e) {
    const { width, height } = e.detail;
    const { webglContext: gl } = drawingContext;
    // Update WebGL Viewport
    gl.viewportWidth = width;
    gl.viewportHeight = height;
    // Update Module Context
    drawingContext.width = width;
    drawingContext.height = height;
    repaint(drawingContext, getTime());
  }, false);

  // Add change event handlers for each input field
  Object.keys(inputElements).forEach(function (key) {
    const { input } = drawingContext;
    const field = inputElements[key];
    if (field.name === key && input.hasOwnProperty(key)) {
      field.value = input[key];
      field.addEventListener('change', inputChangeEventHandler, false);
    }
  });

  // Initial (re)paint
  repaint(drawingContext, getTime());
}
