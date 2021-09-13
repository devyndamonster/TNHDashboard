
const MAPS = ["Default", "Winter Wasteland"];
const EQUIPMENT_MODES = ["Limited", "Spawnlock"];
const GAME_LENGTHS = ["5-Hold", "3-Hold", "Endless"];
const HEALTH_MODES = ["Standard", "One-Hit"];

var selection_map = {'selection' : MAPS[0]};
var selection_equipment = {'selection' : EQUIPMENT_MODES[0]};
var selection_length = {'selection' : GAME_LENGTHS[0]};
var selection_health = {'selection' : HEALTH_MODES[0]};


var GetScoreSelectionURL = function(){
  var url = "https://tnh-dashboard.azure-api.net/v1/api/scores";
  url += "?map=" + selection_map.selection;
  url += "&health=" + selection_health.selection;
  url += "&equipment=" + selection_equipment.selection;
  url += "&length=" + selection_length.selection;
  url += "&startingIndex=0&count=10";

  return url;
}

var PopulateScoreContainer = function(score_container){
  var url = GetScoreSelectionURL();

  $.get(url, function(data, status){
    console.log(data);
    
    score_container.innerHTML = "";

    for(let j = 0; j < data.length; j++){

      const button = document.createElement("button");
      button.classList.add("btn");
      button.classList.add("w-100");
      button.classList.add("score-list-button");
      score_container.appendChild(button);

      button.innerHTML = "";
      button.innerHTML += "<a class=\"score-name\">" + data[j].name + "</a>";
      button.innerHTML += "<a class=\"score-val\">" + data[j].score + "</a>";

      button.onclick = function(){
        console.log((JSON.parse(data[j].holdActions)))
        console.log((JSON.parse(data[j].holdStats)))
      };
    }
  });

}

var PopulateButtonList = function(dropdown_body, dropdown_text, score_container, option_list, selection_object, id_prefix){
  dropdown_body.innerHTML = "";
  for(let i = 0; i < option_list.length; i++){

    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.id = id_prefix + option_list[i].toLowerCase().replace(" ", "-"); 
    button.textContent = option_list[i];
    dropdown_body.appendChild(button);

    button.onclick = function(){
      selection_object.selection = option_list[i];
      dropdown_text.innerHTML = option_list[i];
      score_container.innerHTML = "<h3>Loading...</h3>";
  
      PopulateScoreContainer(score_container);
    };
  }
}



document.addEventListener("DOMContentLoaded", function(){

  var score_container = document.getElementById("score-list-container");

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

  PopulateButtonList(map_list, dropdown_map, score_container, MAPS, selection_map, "button-map-");
  PopulateButtonList(equipment_list, dropdown_equipment, score_container, EQUIPMENT_MODES, selection_equipment, "button-equipment-");
  PopulateButtonList(length_list, dropdown_length, score_container, GAME_LENGTHS, selection_length, "button-length-");
  PopulateButtonList(health_list, dropdown_health, score_container, HEALTH_MODES, selection_health, "button-health-");

  PopulateScoreContainer(score_container);

});