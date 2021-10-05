
//Code borrowed from stack overflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function scale (number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


//Code borrowed from this tutorial: https://javascript.tutorialink.com/how-to-calculate-rotation-in-2d-in-javascript/
//first two params are center position
//second two params are point to rotate
//last param is angle
function rotate(cx, cy, x, y, angle) {

  console.log("rotating point: " + x + "," + y)
  var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}


//Code borrowed from stack overflow: https://stackoverflow.com/questions/45309447/calculating-median-javascript
function median(values){
  if(values.length ===0) throw new Error("No inputs");

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);
  
  if (values.length % 2)
    return values[half];
  
  return (values[half - 1] + values[half]) / 2.0;
}


function mean(values){
  const sum = values.reduce((p_sum, val) => p_sum + val, 0);
  return sum / values.length;
}


function get_map_combined_points(map_data){

  const x_vals_hold = map_data.holdPointLocations.map((point) => {
    return point.x;
  })

  const y_vals_hold = map_data.holdPointLocations.map((point) => {
    return point.y;
  })

  const z_vals_hold = map_data.holdPointLocations.map((point) => {
      return point.z;
  })
  
  const x_vals_supply = map_data.supplyPointLocations.map((point) => {
      return point.x;
  })

  const y_vals_supply = map_data.supplyPointLocations.map((point) => {
    return point.y;
  })

  const z_vals_supply = map_data.supplyPointLocations.map((point) => {
      return point.z;
  })

  const x_vals = x_vals_hold.concat(x_vals_supply);
  const y_vals = y_vals_hold.concat(y_vals_supply);
  const z_vals = z_vals_hold.concat(z_vals_supply);

  return {
    x_vals: x_vals,
    y_vals: y_vals,
    z_vals: z_vals
  }

}


function get_map_center(map_data){

  const points = get_map_combined_points(map_data);

  const center_x = mean(points.x_vals);
  const center_y = mean(points.y_vals);
  const center_z = mean(points.z_vals);

  return {
    x: center_x,
    y: center_y,
    z: center_z
  }

}


function get_map_max_vals(map_data){

  const points = get_map_combined_points(map_data);

  const max_x = Math.max(...points.x_vals);
  const max_y = Math.max(...points.y_vals);
  const max_z = Math.max(...points.z_vals);

  return {
    x: max_x,
    y: max_y,
    z: max_z
  }

}

function get_map_min_vals(map_data){

  const points = get_map_combined_points(map_data);

  const min_x = Math.min(...points.x_vals);
  const min_y = Math.min(...points.y_vals);
  const min_z = Math.min(...points.z_vals);

  return {
    x: min_x,
    y: min_y,
    z: min_z
  }

}
