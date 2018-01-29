/**
 * triangles
 * @param {Object} g The global object
 * @param {HTMLCanvasElement} canvasElement The target canvas element
 * @param {Object} inputElements The map with input elements
 */

 function triangles(g, canvasElement, inputElements) {
  /**
   * Constants
   */

  const DEFAULT_SIDE_A = 3;
  const DEFAULT_SIDE_B = 4;
  const DEFAULT_SIDE_C = 5;
  const REGEX_VALUE = /^[1-9][0-9]*$/;

  /**
   * Methods
   */

  function now() {
    return g.performance.now();
  }

  function isValid(sides) {
    return (
      sides.a > 0 &&
      sides.b > 0 &&
      sides.c > 0
    );
  }

  function inputChangeEventHandler(e) {
    const { sides } = drawingContext;
    const input = e.currentTarget;
    const name = input.name;
    if (!sides.hasOwnProperty(name)) {
      return;
    }
    const value = input.value;
    if (!REGEX_VALUE.test(value)) {
      input.value = sides[name];
      return;
    }
    const newSides = Object.assign({}, sides);
    newSides[name] = g.parseInt(value, 10);
    if (sides.a === newSides.a && sides.b === newSides.b && sides.c === newSides.c) {
      return;
    }
    if (!isValid(newSides)) {
      input.value = sides[name];
      return;
    }
    sides.a = newSides.a;
    sides.b = newSides.b;
    sides.c = newSides.c;
    repaint(drawingContext, now());
  }

  function repaint(context, timeNotUsed) {
    const { sides, width, height, context2D } = context;
    const side = sides.a;
    context2D.clearRect(0, 0, width, height);
    context2D.fillStyle = 'green';
    context2D.fillRect((width - side) / 2, (height - side) / 2 , side, side);
  }

  /**
   * Init
   */

  const drawingContext = {
    context2D: canvasElement.getContext('2d'),
    width: canvasElement.width,
    height: canvasElement.height,
    sides: {
      a: DEFAULT_SIDE_A,
      b: DEFAULT_SIDE_B,
      c: DEFAULT_SIDE_C
    }
  };

  // Add resize event listener
  canvasElement.addEventListener('resize', function (e) {
    drawingContext.width = e.detail.width;
    drawingContext.height = e.detail.height;
    repaint(drawingContext, e.detail.time);
  }, false);

  // Add change event handlers for each input field
  Object.keys(inputElements).forEach(function (key) {
    const { sides } = drawingContext;
    const input = inputElements[key];
    if (input.name === key && sides.hasOwnProperty(key)) {
      input.value = sides[key];
      input.addEventListener('change', inputChangeEventHandler, false);
    }
  });

  // Initial (re)paint
  repaint(drawingContext, now());
}
