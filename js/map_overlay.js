
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
    new Objective(90, 130, 5, 255, 117, 117),
    new Objective(217, 63, 5, 255, 117, 117),
    new Objective(270, 180, 5, 255, 117, 117),
    new Objective(218, 205, 5, 255, 117, 117),
    new Objective(491, 132, 5, 255, 117, 117),
    new Objective(370, 188, 5, 255, 117, 117),
    new Objective(521, 376, 5, 255, 117, 117),
    new Objective(453, 373, 5, 255, 117, 117),
    new Objective(351, 394, 5, 255, 117, 117),
    new Objective(239, 367, 5, 255, 117, 117),
    new Objective(300, 326, 5, 255, 117, 117),
    new Objective(160, 468, 5, 255, 117, 117),
    new Objective(100, 307, 5, 255, 117, 117)
];

const SupplyListDefault = [
    new Objective(138, 254, 5, 145, 255, 102),
    new Objective(67, 345, 5, 145, 255, 102),
    new Objective(117, 427, 5, 145, 255, 102),
    new Objective(157, 538, 5, 145, 255, 102),
    new Objective(300, 508, 5, 145, 255, 102),
    new Objective(178, 296, 5, 145, 255, 102),
    new Objective(432, 530, 5, 145, 255, 102),
    new Objective(543, 466, 5, 145, 255, 102),
    new Objective(492, 287, 5, 145, 255, 102),
    new Objective(461, 235, 5, 145, 255, 102),
    new Objective(501, 73, 5, 145, 255, 102),
    new Objective(188, 121, 5, 145, 255, 102),
    new Objective(350, 22, 5, 145, 255, 102),
    new Objective(360, 296, 5, 145, 255, 102)
    
];

function MapCanvas(canvas_element){

    var self = this;
    this.canvas_element = canvas_element;
    this.ctx = canvas_element.getContext("2d");
    this.draw_steps = [];
    
    this.Refresh = function(map_path){
        self.ctx.clearRect(0, 0, self.canvas_element.width, self.canvas_element.height);
        self.ctx.imageSmoothingEnabled = false;
        var background = new Image();
        background.src = map_path;
    
        // Make sure the image is loaded first otherwise nothing will draw.
        background.onload = function(){
            self.ctx.drawImage(background,0,0, 622, 571);

            for(let i = 0; i < self.draw_steps.length; i++){
                console.log("Exectuing draw step " + i);
                self.draw_steps[i]();
            }
        }
    };

    this.DrawAllHolds = function(){
        for(let i = 0; i < ObjectiveListDefault.length; i++){
            var obj = ObjectiveListDefault[i];
            var circle = new Path2D();
            circle.arc(obj.pos_x, obj.pos_y, obj.radius, 0, 2 * Math.PI);
            self.ctx.fillStyle = obj.color();
            self.ctx.fill(circle);
        }
    };

    this.DrawAllSupply = function(){
        for(let i = 0; i < SupplyListDefault.length; i++){
            var obj = SupplyListDefault[i];
            var circle = new Path2D();
            circle.arc(obj.pos_x, obj.pos_y, obj.radius, 0, 2 * Math.PI);
            self.ctx.fillStyle = obj.color();
            self.ctx.fill(circle);
        }
    };

    this.DrawArrow = function(start, end){

        //This cute lil bit of code is based on this stackoverflow page: https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
        var headlen = 10;
        var dx = end.pos_x - start.pos_x;
        var dy = end.pos_y - start.pos_y;
        var angle = Math.atan2(dy, dx);

        console.log("Drawing from (" + start.pos_x + "," + start.pos_y + ") to (" + end.pos_x + "," + end.pos_y + ")");

        self.ctx.strokeStyle = 'rgb(145, 145, 145)';
        self.ctx.lineWidth = 2;

        self.ctx.beginPath();
        self.ctx.moveTo(start.pos_x, start.pos_y);
        self.ctx.lineTo(end.pos_x, end.pos_y);
        self.ctx.stroke();

        self.ctx.moveTo(end.pos_x, end.pos_y);
        self.ctx.lineTo(end.pos_x - headlen * Math.cos(angle - Math.PI / 6), end.pos_y - headlen * Math.sin(angle - Math.PI / 6));
        self.ctx.stroke();

        self.ctx.moveTo(end.pos_x, end.pos_y);
        self.ctx.lineTo(end.pos_x - headlen * Math.cos(angle + Math.PI / 6), end.pos_y - headlen * Math.sin(angle + Math.PI / 6));
        self.ctx.stroke();
    }

};

var map_canvas = {};

document.addEventListener("DOMContentLoaded", function(){
 
    map_canvas = new MapCanvas(document.getElementById("map-canvas"));
    
    map_canvas.draw_steps.push(map_canvas.DrawAllHolds);
    map_canvas.draw_steps.push(map_canvas.DrawAllSupply);
    map_canvas.Refresh("TNH_Map.png");

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
    
    map_canvas.canvas_element.addEventListener('mousedown', function(e) {
        getMousePos(map_canvas.canvas_element, e)
    })
});