
(function (g, d) {

  /**
   * Constants
   */

  const CANVAS_SELECTOR = 'canvas#drawing-area';

  /**
   * Utils
   */

  /**
   * Main
   */

  const canvas = d.querySelector(CANVAS_SELECTOR);
  if (!canvas) {
    g.console.error('Drawing area not found...');
    return;
  }

  const context = canvas.getContext('2d');
  context.fillStyle = 'green';
  context.fillRect(10, 10, 100, 100);

})(this, this.document);
