/**
 * Point on the screen
 */
interface Point {
    x: number;
    y: number;
}

/**
 * Color (RGBA)
 */
interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
};

/**
 * Makes a string repersentation of the Color interface
 * @param color color to turn into a string
 * @returns string reperesentation of the color
 */
function colorString(color: Color): string {
    return `rgba(${color.r},${color.g},${color.b},${color.a}`;
}

/**
 * Objective point on the TNH map
 */
class Objective {   
    /**
     * Position of the objective
     */
    position: Point;

    /**
     * Radius of the counter on the map
     */
    radius: number;

    /**
     * Color of the counter on the map
     */
    color: Color;

    constructor(position: Point, radius: number, color: Color) {
        this.position = position;
        this.radius = radius;
        this.color = color;
    }
}

//why devyn
const DEFAULT_OBJECTIVE_LIST: Objective[] = [
    new Objective({ x: 90,  y: 130 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 217, y: 63  }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 270, y: 180 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 218, y: 205 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 491, y: 132 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 370, y: 188 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 521, y: 376 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 453, y: 373 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 351, y: 394 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 239, y: 367 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 300, y: 326 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 160, y: 468 }, 5, { r: 255, g: 0, b: 0, a: 1 }),
    new Objective({ x: 100, y: 307 }, 5, { r: 255, g: 0, b: 0, a: 1 })
];


document.addEventListener("DOMContentLoaded", () => {
 
    var canvas = document.getElementById("map-canvas") as HTMLCanvasElement,
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    var background = new Image();
    background.src = "TNH_Map.png";

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = () => {
        ctx.drawImage(background, 0, 0, 622, 571);  

        for(let i = 0; i < DEFAULT_OBJECTIVE_LIST.length; i++){
            var obj = DEFAULT_OBJECTIVE_LIST[i];
            var circle = new Path2D();
            circle.arc(obj.position.x, obj.position.y, obj.radius, 0, 2 * Math.PI);
            ctx.fillStyle = colorString(obj.color);
            ctx.fill(circle) 
        }
    }

    function getMousePos(canvas: HTMLCanvasElement, evt): Point {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
      
        var posX = (evt.clientX - rect.left) * scaleX;
        var posY = (evt.clientY - rect.top) * scaleY;

        console.log("x: " + posX + " y: " + posY);

        return {
          x: posX,
          y: posY
        }
    }

});