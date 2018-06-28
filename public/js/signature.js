/**
 * Signature object
 */

// Signature constructor
function Signature(id, width, height) {
    var canvas = document.getElementById(id);
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);
    var context = canvas.getContext('2d');
    context.lineWidth = 3;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = '#000000';
    this.context = context;
    var mouse = {x: 0, y: 0};
    
    canvas.addEventListener('mousemove', function(event) {
        mouse.x = event.pageX - this.offsetLeft;
        mouse.y = event.pageY - this.offsetTop;
    }, false);

    canvas.addEventListener('mousedown', function(event) {
        context.beginPath();
        context.moveTo(mouse.x, mouse.y);
    
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);
    
    var onPaint = function() {
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
    };
}

// clear method of Signature object
Signature.prototype.clear = function() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
}