const drawCircle = (canvas: HTMLCanvasElement, currentLoad: number) => {
  if (canvas) {
    const context = canvas.getContext('2d');

    if (context) {
      context.clearRect(0, 0, 500, 500); // clear canvas before drawing

      // Draw Inner Circle
      context.fillStyle = '#ccc';
      context.beginPath();
      context.arc(100, 100, 90, Math.PI * 0, Math.PI * 2);
      context.closePath();
      context.fill();

      // Draw the outer line
      context.lineWidth = 10; // 10px wide line

      if (currentLoad < 20) {
        context.strokeStyle = '#00ff00';
      } else if (currentLoad < 40) {
        context.strokeStyle = '#337ab7';
      } else if (currentLoad < 60) {
        context.strokeStyle = '#f0ad4e';
      } else {
        context.strokeStyle = '#d9534f';
      }

      const startAngle = Math.PI * 1.5; // start at 12 o'clock
      const endAngle = startAngle + (Math.PI * 2 * currentLoad) / 100;

      context.beginPath();
      context.arc(100, 100, 95, startAngle, endAngle);
      context.stroke();
    }
  }
};

export default drawCircle;
