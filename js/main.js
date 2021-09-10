
function Objective(pos_x, pos_y, radius, col_r, col_g, col_b){
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.radius = radius;
    this.col_r = col_r;
    this.col_g = col_g;
    this.col_b = col_b;
    this.color = function(){
        return "rgba(" + this.col_r + "," + this.col_g + "," + this.col_b + ",1)";
    }
};

const ObjectiveListDefault = [
    new Objective(90, 130, 5, 255, 0, 0),
    new Objective(217, 63, 5, 255, 0, 0),
    new Objective(270, 180, 5, 255, 0, 0),
    new Objective(218, 205, 5, 255, 0, 0),
    new Objective(491, 132, 5, 255, 0, 0),
    new Objective(370, 188, 5, 255, 0, 0),
    new Objective(521, 376, 5, 255, 0, 0),
    new Objective(453, 373, 5, 255, 0, 0),
    new Objective(351, 394, 5, 255, 0, 0),
    new Objective(239, 367, 5, 255, 0, 0),
    new Objective(300, 326, 5, 255, 0, 0),
    new Objective(160, 468, 5, 255, 0, 0),
    new Objective(100, 307, 5, 255, 0, 0)
];


document.addEventListener("DOMContentLoaded", function(){
 
    var canvas = document.getElementById("map-canvas"),
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    var background = new Image();
    background.src = "TNH_Map.png";

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function(){
        ctx.drawImage(background,0,0, 622, 571);  

        for(let i = 0; i < ObjectiveListDefault.length; i++){
            var obj = ObjectiveListDefault[i];
            var circle = new Path2D();
            circle.arc(obj.pos_x, obj.pos_y, obj.radius, 0, 2 * Math.PI);
            ctx.fillStyle = obj.color();
            ctx.fill(circle) 
        }
    }

    function  getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
      
        var pos_x = (evt.clientX - rect.left) * scaleX;
        var pos_y = (evt.clientY - rect.top) * scaleY;

        console.log("x: " + pos_x + " y: " + pos_y);

        return {
          x: pos_x,
          y: pos_y
        }
    }
    
    /*
    canvas.addEventListener('mousedown', function(e) {
        getMousePos(canvas, e)
    })
    */
});