
function GetMapDataURL(){
    var url = "https://tnh-dashboard.azure-api.net/v1/api/maps";
    url += "?name=" + selection_map.selection;
  
    return url;
  }

function Objective(pos_x, pos_y, radius, col_r, col_g, col_b){
    this.pos_x = pos_x;
    this.pos_y = pos_y;
};


const MapSettingsClassic = {
    padding_x_left: 75,
    padding_x_right: 75,
    padding_z_top: 40,
    padding_z_bot: 20,
    offset_x: -5,
    offset_z: -20,
    rotation: 180,
    flip_x: true
};

const MapSettingsNorthestDakota = {
    padding_x_left: 40,
    padding_x_right: 40,
    padding_z_top: 40,
    padding_z_bot: 0,
    offset_x: -5,
    offset_z: -20,
    rotation: 180,
    flip_x: true
};


function MapCanvas(canvas_element){

    var self = this;
    this.canvas_element = canvas_element;
    this.ctx = canvas_element.getContext("2d");
    this.draw_steps = [];
    this.icon_radius = 10;
    this.map = "";
    this.map_data = {};

    this.map_height = 571;
    this.map_width = 622;

    this.center_x = 0;
    this.center_z = 0;
    this.max_x = 0;
    this.max_z = 0;
    this.min_x = 0;
    this.min_z = 0;

    this.Refresh = function(map){
        self.ctx.clearRect(0, 0, self.canvas_element.width, self.canvas_element.height);
        self.ctx.imageSmoothingEnabled = false;
        var background = new Image();

        self.map = map;
        background.src = self.GetMapPath(map);
    
        // Make sure the image is loaded first otherwise nothing will draw.
        background.onload = function(){

            //Now that the background is loaded, we can get the map data
            var url = GetMapDataURL();
            $.get(url, function(data, status){

                //Save the map data
                data[0].holdPointLocations = JSON.parse(data[0].holdPointLocations);
                data[0].supplyPointLocations = JSON.parse(data[0].supplyPointLocations);
                self.map_data = data[0];

                self.FitMapData(self.map_data, self.GetMapSettings(map));

                //Now draw everything
                self.ctx.drawImage(background,0,0, self.map_width, self.map_height);
                for(let i = 0; i < self.draw_steps.length; i++){
                    console.log("Exectuing draw step " + i);
                    self.draw_steps[i]();
                }
            });
        }
    };

    this.GetMapPath = function(map){
        if(map == MAPS[0]){
            return "TNH_Map.png";
        }
        else if(map == MAPS[1]){
            return "TNH_Winter_Map.png";
        }
    }

    this.GetMapSettings = function(map){
        if(map == MAPS[0]){
            return MapSettingsClassic;
        }
        else if(map == MAPS[1]){
            return MapSettingsNorthestDakota;
        }
    }


    this.FitMapData = function(map_data, map_settings){

        //Get the center position of all points in our data
        center = get_map_center(map_data);

        //Now we want to rotate all the map data by the selected settings
        map_data.holdPointLocations = map_data.holdPointLocations.map((point) => {
            var rotated = rotate(center.x, center.z, point.x, point.z, map_settings.rotation);
            point.x = rotated[0];
            point.z = rotated[1];
            return point;
        });

        map_data.supplyPointLocations = map_data.supplyPointLocations.map((point) => {
            var rotated = rotate(center.x, center.z, point.x, point.z, map_settings.rotation);
            point.x = rotated[0];
            point.z = rotated[1];
            return point;
        });

        //Now if the settings want us to flip we flip the points
        if(map_settings.flip_x){
            map_data.holdPointLocations = map_data.holdPointLocations.map((point) => {
                point.x -= center.x;
                point.x = -point.x;
                point.x += center.x;
                return point;
            });

            map_data.supplyPointLocations = map_data.supplyPointLocations.map((point) => {
                point.x -= center.x;
                point.x = -point.x;
                point.x += center.x;
                return point;
            });
        }

        //Next, get the min and max values of this transformed data
        const max_vals = get_map_max_vals(map_data);
        const min_vals = get_map_min_vals(map_data);

        //Now scale the map data
        map_data.holdPointLocations = map_data.holdPointLocations.map((point) => {
            point.x = scale(point.x, min_vals.x, max_vals.x, map_settings.padding_x_left, self.map_width - map_settings.padding_x_right) + map_settings.offset_x;
            point.z = scale(point.z, min_vals.z, max_vals.z, map_settings.padding_z_top, self.map_height - map_settings.padding_z_bot) + map_settings.offset_z;
            return point;
        });
        map_data.supplyPointLocations = map_data.supplyPointLocations.map((point) => {
            point.x = scale(point.x, min_vals.x, max_vals.x, map_settings.padding_x_left, self.map_width - map_settings.padding_x_right) + map_settings.offset_x;
            point.z = scale(point.z, min_vals.z, max_vals.z, map_settings.padding_z_top, self.map_height - map_settings.padding_z_bot) + map_settings.offset_z;
            return point;
        });

    }


    this.DrawAllHolds = function(){

        var objList = self.map_data.holdPointLocations;

        for(let i = 0; i < objList.length; i++){
            var obj = objList[i];
            self.ctx.beginPath();
            self.ctx.arc(obj.x, obj.z, self.icon_radius, 0, 2 * Math.PI);
            self.ctx.fillStyle = "rgba(" + 255 + "," + 177 + "," + 177 + ",1)";
            self.ctx.fill();

            self.ctx.lineWidth = 3;
            self.ctx.strokeStyle = "rgba(" + 0 + "," + 0 + "," + 0 + ",1)";
            self.ctx.stroke();

            self.ctx.fillStyle = "rgba(" + 0 + "," + 0 + "," + 0 + ",1)";
            self.ctx.font = "13px Arial";
            self.ctx.textAlign = "center";
            self.ctx.fillText(i, obj.x, obj.z + 5);
        }
    };

    this.DrawAllSupply = function(){

        var objList = self.map_data.supplyPointLocations;

        for(let i = 0; i < objList.length; i++){
            var obj = objList[i];
            self.ctx.beginPath();
            self.ctx.arc(obj.x, obj.z, self.icon_radius, 0, 2 * Math.PI);
            self.ctx.fillStyle = "rgba(" + 145 + "," + 255 + "," + 102 + ",1)";
            self.ctx.fill();

            self.ctx.lineWidth = 3;
            self.ctx.strokeStyle = "rgba(" + 0 + "," + 0 + "," + 0 + ",1)";
            self.ctx.stroke();

            self.ctx.fillStyle = "rgba(" + 0 + "," + 0 + "," + 0 + ",1)";
            self.ctx.font = "13px Arial";
            self.ctx.textAlign = "center";
            self.ctx.fillText(i, obj.x, obj.z + 5);
        }
    };

    this.DrawArrow = function(start, end){

        //This cute lil bit of code is based on this stackoverflow page: https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
        var headlen = 10;
        var dx = end.x - start.x;
        var dz = end.z - start.z;
        var angle = Math.atan2(dz, dx);

        console.log("Drawing from (" + start.x + "," + start.z + ") to (" + end.x + "," + end.z + ")");

        self.ctx.strokeStyle = 'rgb(150, 75, 75)';
        self.ctx.lineWidth = 2;

        self.ctx.beginPath();
        self.ctx.moveTo(start.x, start.z);
        self.ctx.lineTo(end.x, end.z);
        self.ctx.stroke();

        self.ctx.moveTo(end.x, end.z);
        self.ctx.lineTo(end.x - headlen * Math.cos(angle - Math.PI / 6), end.z - headlen * Math.sin(angle - Math.PI / 6));
        self.ctx.stroke();

        self.ctx.moveTo(end.x, end.z);
        self.ctx.lineTo(end.x - headlen * Math.cos(angle + Math.PI / 6), end.z - headlen * Math.sin(angle + Math.PI / 6));
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