// Signature
var Signature = {
    // Init
    init: function (canvasId, canvasWidth, canvasHeight) {
        var canvas = document.getElementById(canvasId);
        canvas.width = parseInt(canvasWidth);
        canvas.height = parseInt(canvasHeight);
        var ctx = canvas.getContext('2d');
        this.ctx = ctx;
        var mouse = {x: 0, y: 0};
        
        canvas.addEventListener('mousemove', function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';
        
        canvas.addEventListener('mousedown', function(e) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
        
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);
        
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
        
        var onPaint = function() {
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };
    },
    // Clear the canvas
    clear: function () {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
};