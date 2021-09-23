


function Objective(pos_x, pos_y, radius, col_r, col_g, col_b){
    this.pos_x = pos_x;
    this.pos_y = pos_y;
};

const ObjectiveListDefault = [
    new Objective(90, 130),
    new Objective(217, 63),
    new Objective(270, 180),
    new Objective(218, 205),
    new Objective(491, 132),
    new Objective(370, 188),
    new Objective(521, 376),
    new Objective(453, 373),
    new Objective(351, 394),
    new Objective(239, 367),
    new Objective(300, 326),
    new Objective(160, 468),
    new Objective(100, 307)
];

const SupplyListDefault = [
    new Objective(138, 254),
    new Objective(67, 345),
    new Objective(117, 427),
    new Objective(157, 538),
    new Objective(300, 508),
    new Objective(178, 296),
    new Objective(432, 530),
    new Objective(543, 466),
    new Objective(492, 287),
    new Objective(461, 235),
    new Objective(501, 73),
    new Objective(188, 121),
    new Objective(350, 22),
    new Objective(360, 296)
];

const ObjectiveListWinter = [
    new Objective(87, 17),
    new Objective(76, 195),
    new Objective(112, 129),
    new Objective(155, 188),
    new Objective(237, 186),
    new Objective(246, 111),
    new Objective(240, 21),
    new Objective(307, 30),
    new Objective(409, 37),
    new Objective(484, 19),
    new Objective(548, 55),
    new Objective(455, 66),
    new Objective(483, 148),
    new Objective(535, 206),
    new Objective(481, 192),
    new Objective(426, 214),
    new Objective(397, 79),
    new Objective(359, 146),
    new Objective(527, 288),
    new Objective(389, 313),
    new Objective(558, 389),
    new Objective(493, 445),
    new Objective(560, 553),
    new Objective(526, 495),
    new Objective(451, 477),
    new Objective(376, 448),
    new Objective(366, 541),
    new Objective(277, 407),
    new Objective(259, 539),
    new Objective(98, 472),
    new Objective(161, 362),
    new Objective(164, 539)
];

const SupplyListWinter = [
    new Objective(35, 253),
    new Objective(84, 267),
    new Objective(105, 206),
    new Objective(44, 186),
    new Objective(41, 145),
    new Objective(50, 95),
    new Objective(201, 180),
    new Objective(192, 61),
    new Objective(299, 96),
    new Objective(378, 14),
    new Objective(373, 83),
    new Objective(428, 94),
    new Objective(429, 136),
    new Objective(477, 40),
    new Objective(531, 28),
    new Objective(497, 98),
    new Objective(537, 141),
    new Objective(576, 181),
    new Objective(493, 264),
    new Objective(438, 184),
    new Objective(461, 288),
    new Objective(570, 357),
    new Objective(516, 396),
    new Objective(571, 481),
    new Objective(466, 523),
    new Objective(428, 429),
    new Objective(332, 411),
    new Objective(242, 489),
    new Objective(118, 532),
    new Objective(45, 547),
    new Objective(97, 492),
    new Objective(155, 447),
    new Objective(83, 363)
];

function MapCanvas(canvas_element){

    var self = this;
    this.canvas_element = canvas_element;
    this.ctx = canvas_element.getContext("2d");
    this.draw_steps = [];
    this.icon_radius = 10;
    this.map = "";
    
    this.Refresh = function(map){
        self.ctx.clearRect(0, 0, self.canvas_element.width, self.canvas_element.height);
        self.ctx.imageSmoothingEnabled = false;
        var background = new Image();

        self.map = map;
        background.src = self.GetMapPath(map);
    
        // Make sure the image is loaded first otherwise nothing will draw.
        background.onload = function(){
            self.ctx.drawImage(background,0,0, 622, 571);

            for(let i = 0; i < self.draw_steps.length; i++){
                console.log("Exectuing draw step " + i);
                self.draw_steps[i]();
            }
        }
    };

    this.GetMapPath = function(map){

        console.log("MAP!!! " + map);

        if(map == MAPS[0]){
            return "TNH_Map.png";
        }
        else if(map == MAPS[1]){
            return "TNH_Winter_Map.png";
        }
    }

    this.DrawAllHolds = function(){

        var objList = {};

        if(self.map == MAPS[0]){
            objList = ObjectiveListDefault;
        }
        else if(self.map == MAPS[1]){
            objList = ObjectiveListWinter;
        }

        for(let i = 0; i < objList.length; i++){
            var obj = objList[i];
            self.ctx.beginPath();
            self.ctx.arc(obj.pos_x, obj.pos_y, self.icon_radius, 0, 2 * Math.PI);
            self.ctx.fillStyle = "rgba(" + 255 + "," + 177 + "," + 177 + ",1)";
            self.ctx.fill();

            self.ctx.lineWidth = 3;
            self.ctx.strokeStyle = "rgba(" + 0 + "," + 0 + "," + 0 + ",1)";
            self.ctx.stroke();

            self.ctx.fillStyle = "rgba(" + 0 + "," + 0 + "," + 0 + ",1)";
            self.ctx.font = "13px Arial";
            self.ctx.textAlign = "center";
            self.ctx.fillText(i, obj.pos_x, obj.pos_y + 5);
        }
    };

    this.DrawAllSupply = function(){

        var objList = {};

        if(self.map == MAPS[0]){
            objList = SupplyListDefault;
        }
        else if(self.map == MAPS[1]){
            objList = SupplyListWinter;
        }

        for(let i = 0; i < objList.length; i++){
            var obj = objList[i];
            self.ctx.beginPath();
            self.ctx.arc(obj.pos_x, obj.pos_y, self.icon_radius, 0, 2 * Math.PI);
            self.ctx.fillStyle = "rgba(" + 145 + "," + 255 + "," + 102 + ",1)";
            self.ctx.fill();

            self.ctx.lineWidth = 3;
            self.ctx.strokeStyle = "rgba(" + 0 + "," + 0 + "," + 0 + ",1)";
            self.ctx.stroke();

            self.ctx.fillStyle = "rgba(" + 0 + "," + 0 + "," + 0 + ",1)";
            self.ctx.font = "13px Arial";
            self.ctx.textAlign = "center";
            self.ctx.fillText(i, obj.pos_x, obj.pos_y + 5);
        }
    };

    this.DrawArrow = function(start, end){

        //This cute lil bit of code is based on this stackoverflow page: https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
        var headlen = 10;
        var dx = end.pos_x - start.pos_x;
        var dy = end.pos_y - start.pos_y;
        var angle = Math.atan2(dy, dx);

        console.log("Drawing from (" + start.pos_x + "," + start.pos_y + ") to (" + end.pos_x + "," + end.pos_y + ")");

        self.ctx.strokeStyle = 'rgb(150, 75, 75)';
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
    map_canvas.Refresh(MAPS[0]);

    function  getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
      
        var pos_x = (evt.clientX - rect.left) * scaleX;
        var pos_y = (evt.clientY - rect.top) * scaleY;

        console.log("new Objective(" + Math.floor(pos_x) + ", " + Math.floor(pos_y) + ")");

        return {
          x: pos_x,
          y: pos_y
        }
    }
    
    map_canvas.canvas_element.addEventListener('mousedown', function(e) {
        getMousePos(map_canvas.canvas_element, e)
    })
});