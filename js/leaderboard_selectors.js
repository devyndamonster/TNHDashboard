
const MAPS = ["Default", "Winter Wasteland"];
const EQUIPMENT_MODES = ["Limited", "Spawnlock"];
const GAME_LENGTHS = ["5-Hold", "3-Hold", "Endless"];
const HEALTH_MODES = ["Standard", "One-Hit"];

var selection_map = MAPS[0];
var selection_equipment = EQUIPMENT_MODES[0];
var selection_length = GAME_LENGTHS[0];
var selection_health = HEALTH_MODES[0];

document.addEventListener("DOMContentLoaded", function(){

  var score_container = document.getElementById("score-container");

  var map_list = document.getElementById("map-list");
  var equipment_list = document.getElementById("equipment-list");
  var length_list = document.getElementById("length-list");
  var health_list = document.getElementById("health-list");

  var dropdown_map = document.getElementById("dropdown-map");
  var dropdown_equipment = document.getElementById("dropdown-equipment");
  var dropdown_length = document.getElementById("dropdown-length");
  var dropdown_health = document.getElementById("dropdown-health");

  dropdown_map.innerHTML = MAPS[0];
  dropdown_equipment.innerHTML = EQUIPMENT_MODES[0];
  dropdown_length.innerHTML = GAME_LENGTHS[0];
  dropdown_health.innerHTML = HEALTH_MODES[0];

  //Populate each of the dropdown menus with their respective options
  map_list.innerHTML = "";
  for(let i = 0; i < MAPS.length; i++){

    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.id = "button-map-" + MAPS[i].toLowerCase().replace(" ", "-"); 
    button.textContent = MAPS[i];
    map_list.appendChild(button);
    button.onclick = function(){
      score_container.innerHTML = "";
  
      for(let j = 0; j < 5; j++){
        score_container.innerHTML += "<div class=\"score-list-entry\"><a>" + MAPS[i] + " Dude" + "</a><a class=\"score-val\">" + 140928435 + "</a></div>";
      }
      
      dropdown_map.innerHTML = MAPS[i];
    };

  }

  equipment_list.innerHTML = "";
  for(let i = 0; i < EQUIPMENT_MODES.length; i++){
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.id = "button-equipment-" + EQUIPMENT_MODES[i].toLowerCase().replace(" ", "-"); 
    button.textContent = EQUIPMENT_MODES[i];
    equipment_list.appendChild(button);
    button.onclick = function(){
      score_container.innerHTML = "";
  
      for(let j = 0; j < 5; j++){
        score_container.innerHTML += "<div class=\"score-list-entry\"><a>" + EQUIPMENT_MODES[i] + " Dude" + "</a><a class=\"score-val\">" + 140928435 + "</a></div>";
      }
      
      dropdown_equipment.innerHTML = EQUIPMENT_MODES[i];
    };
  }

  length_list.innerHTML = "";
  for(let i = 0; i < GAME_LENGTHS.length; i++){
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.id = "button-length-" + GAME_LENGTHS[i].toLowerCase().replace(" ", "-"); 
    button.textContent = GAME_LENGTHS[i];
    length_list.appendChild(button);
    button.onclick = function(){
      score_container.innerHTML = "";
  
      for(let j = 0; j < 5; j++){
        score_container.innerHTML += "<div class=\"score-list-entry\"><a>" + GAME_LENGTHS[i] + " Dude" + "</a><a class=\"score-val\">" + 140928435 + "</a></div>";
      }
      
      dropdown_length.innerHTML = GAME_LENGTHS[i];
    };
  }

  health_list.innerHTML = "";
  for(let i = 0; i < HEALTH_MODES.length; i++){
    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.id = "button-health-" + HEALTH_MODES[i].toLowerCase().replace(" ", "-"); 
    button.textContent = HEALTH_MODES[i];
    health_list.appendChild(button);
    button.onclick = function(){
      score_container.innerHTML = "";
  
      for(let j = 0; j < 5; j++){
        score_container.innerHTML += "<div class=\"score-list-entry\"><a>" + HEALTH_MODES[i] + " Dude" + "</a><a class=\"score-val\">" + 140928435 + "</a></div>";
      }
      
      dropdown_health.innerHTML = HEALTH_MODES[i];
    };
  }

});