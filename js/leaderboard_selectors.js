
var CHARACTERS = ["Beginner Blake", "Classic Loadout Louis", "Onsite Procurement Patrice", "Ricky Dicky Random", "Operator Ori", "Soldier Of Fortune Franky", "Grumbly GI Grayson", "Cowweiner Calico", "Welldone Freemeat", "Zeke Zombie Hunter", "Flaccid Steak"];
var MAPS = ["Classic", "NorthestDakota"];

const EQUIPMENT_MODES = ["Limited", "Spawnlock"];
const GAME_LENGTHS = ["5-Hold", "3-Hold", "Endless"];
const HEALTH_MODES = ["Standard", "One-Hit"];


var selection_character = {'selection' : CHARACTERS[0]}
var selection_map = {'selection' : MAPS[0]};
var selection_equipment = {'selection' : EQUIPMENT_MODES[0]};
var selection_length = {'selection' : GAME_LENGTHS[0]};
var selection_health = {'selection' : HEALTH_MODES[0]};

var curr_page = 0;

var score_container = {};
var page_button_container = {};

var character_list = {};
var map_list = {};
var equipment_list = {};
var length_list = {};
var health_list = {};

var dropdown_character = {};
var dropdown_map = {};
var dropdown_equipment = {};
var dropdown_length = {};
var dropdown_health = {};

var page_buttons = [];
var search_form = {};
var search_bar = {};

var hold_selection_container = {};


function GetScoreSelectionURL(page){
  var url = "https://tnh-dashboard.azure-api.net/v1/api/scores";
  url += "?character=" + selection_character.selection;
  url += "&map=" + selection_map.selection;
  url += "&health=" + selection_health.selection;
  url += "&equipment=" + selection_equipment.selection;
  url += "&length=" + selection_length.selection;
  url += "&startingIndex=" + page * 10 + "&count=10";

  return url;
}


function GetScoreSelectionCountURL(){
  var url = "https://tnh-dashboard.azure-api.net/v1/api/scores/count";
  url += "?character=" + selection_character.selection;
  url += "&map=" + selection_map.selection;
  url += "&health=" + selection_health.selection;
  url += "&equipment=" + selection_equipment.selection;
  url += "&length=" + selection_length.selection;

  return url;
}


function GetScoreSearchURL(name){
  var url = "https://tnh-dashboard.azure-api.net/v1/api/scores/search";
  url += "?character=" + selection_character.selection;
  url += "&map=" + selection_map.selection;
  url += "&health=" + selection_health.selection;
  url += "&equipment=" + selection_equipment.selection;
  url += "&length=" + selection_length.selection;
  url += "&name=" + name;
  url += "&num_before=2";
  url += "&num_after=2";

  return url;
}

function GetUserSelectionsURL(name){
  var url = "https://tnh-dashboard.azure-api.net/v1/api/content";
  return url;
}


function SetupSearchButtons(){
  search_form.onsubmit = function(){
    console.log(search_bar.value);

    if(search_bar.value == ""){
      curr_page = 0;
      PopulateScoreContainer(GetScoreSelectionURL(curr_page));
    }
    else{
      SearchForPlayer(search_bar.value);
    }

    return false;
  }
}

function SearchForPlayer(name){
  PopulateScoreContainer(GetScoreSearchURL(name));
}

function PopulateScoreContainer(url){
  
  $.ajax({
    url: url,
    type: 'GET',
    success: function(data){
      console.log(data);
    
      score_container.innerHTML = "";
  
      for(let j = 0; j < 10; j++){
  
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("w-100");
        button.classList.add("score-list-button");
        score_container.appendChild(button);
  
        button.innerHTML = "";
  
        if(data.length > j){
          button.innerHTML += "<a class=\"score-rank\">" + (data[j].rank + 1) + ". " + "</a>";
          button.innerHTML += "<a class=\"score-name\">"  + data[j].name + "</a>";
          button.innerHTML += "<a class=\"score-val\">" + data[j].score + "</a>";
  
          button.onclick = function(){
            var holdActions = JSON.parse(data[j].holdActions);
            var holdStats = JSON.parse(data[j].holdStats);

            PopulateMatchSummary(holdActions, holdStats);
            PopulateHoldSelection(holdActions);
            DrawPlayerPath(holdActions, 0, 1);
          };
        }
        else{
          button.innerHTML += "<a class=\"score-name\">" + "--------" + "</a>";
          button.innerHTML += "<a class=\"score-val\">" + "--------" + "</a>";
        }
      }
    },
    error: function(err){
      console.log("Nothing found!");
    }

  })
}



function PopulatePageButtons(){
  var url = GetScoreSelectionCountURL();

  $.get(url, function(data, status){

    var page_count = Math.max(1, Math.floor((data - 1) / 10) + 1);
    page_buttons = [];
    page_button_container.innerHTML = "";

    console.log("Page count: " + page_count + ", Scores: " + data);
    
    //Create the previous page button
    const prev_li = document.createElement("li");
    prev_li.classList.add("page-item");
    page_button_container.appendChild(prev_li);

    const prev_button = document.createElement("button");
    prev_button.classList.add("page-link");
    prev_button.classList.add("tnh-button-style");
    prev_button.innerHTML = "&laquo;"
    prev_li.appendChild(prev_button);

    prev_button.onclick = function(){
      console.log("Prev Page");
      var next_page = Math.max(0, curr_page - 1);
      if(curr_page != next_page){
        curr_page = next_page;

        for(let j = 0; j < page_buttons.length; j++){
          page_buttons[j].classList.remove('selected');
        }

        page_buttons[curr_page].classList.add('selected');
        PopulateScoreContainer(GetScoreSelectionURL(curr_page));
      }
    }

    //Create Middle Page Buttons
    for(let i = 0; i < page_count; i++){
      const page_li = document.createElement("li");
      page_li.classList.add("page-item");
      page_button_container.appendChild(page_li);

      const page_button = document.createElement("button");
      page_button.classList.add("page-link");
      page_button.classList.add("tnh-button-style");
      page_button.innerHTML = (i + 1);
      page_li.appendChild(page_button);

      if(i == 0){
        page_button.classList.add('selected');
      }

      page_buttons.push(page_button);

      page_button.onclick = function(){
        console.log("Go to page: " + i);
        var next_page = i;
        if(curr_page != next_page){
          curr_page = next_page

          for(let j = 0; j < page_buttons.length; j++){
            page_buttons[j].classList.remove('selected');
          }

          page_buttons[curr_page].classList.add('selected');
          PopulateScoreContainer(GetScoreSelectionURL(curr_page));
        }
      }
    }

    //Create Next Page Buttons
    const next_li = document.createElement("li");
    next_li.classList.add("page-item");
    page_button_container.appendChild(next_li);

    const next_button = document.createElement("button");
    next_button.classList.add("page-link");
    next_button.classList.add("tnh-button-style");
    next_button.innerHTML = "&raquo;"
    next_li.appendChild(next_button);

    next_button.onclick = function(){
      console.log("Next Page");

      var next_page = Math.min(page_count - 1, curr_page + 1);
      if(curr_page != next_page){
        curr_page = next_page;

        for(let j = 0; j < page_buttons.length; j++){
          page_buttons[j].classList.remove('selected');
        }

        page_buttons[curr_page].classList.add('selected');
        PopulateScoreContainer(GetScoreSelectionURL(curr_page));
      }
    }

  });
}


function DrawWrapper(start, end){
  function f(){
    map_canvas.DrawArrow(start, end);
  }
  return f;
}

function DrawPlayerPath(holdEvents, startHold, endHold){

  console.log('Started Making Path');

  map_canvas.draw_steps.length = 0;
  map_canvas.draw_steps.push(map_canvas.DrawAllHolds);
  map_canvas.draw_steps.push(map_canvas.DrawAllSupply);

  var previousPoint = null;
  var holdList = map_canvas.map_data.holdPointLocations;
  var supplyList = map_canvas.map_data.supplyPointLocations;

  

  if(startHold > 0){
    var prevHold = holdEvents[startHold - 1];
    prevHold = prevHold[prevHold.length - 1];
    prevHold = prevHold.replace("Entered Hold ", "");
    var index = parseInt(prevHold);

    previousPoint = holdList[index];

    console.log("Previous Hold Selected: " + prevHold);
  }

  holdEvents = holdEvents.slice(startHold, endHold);


  for(let i = 0; i < holdEvents.length; i++){
    for(let j = 0; j < holdEvents[i].length; j++){
      var event = holdEvents[i][j];

      //First, replace 'Spawned At' with generic starter
      if(event.startsWith("Spawned At")){
        event = event.replace("Spawned At ", "Entered ");
        console.log("Replaced: " + event);
      }

      //If this is the first point in the path, we only track it as previous point
      if(event.startsWith("Entered") && previousPoint == null){
        
        event = event.replace("Entered ", "");

        if(event.includes("Supply")){
          event = event.replace("Supply ", "");
          var index = parseInt(event);
          previousPoint = supplyList[index];

          //console.log("First point: " + event);
          //console.log(previousPoint);
          continue;
        }

        if(event.includes("Hold")){
          event = event.replace("Hold ", "");
          var index = parseInt(event);
          previousPoint = holdList[index];

          //console.log("First point: " + event);
          //console.log(previousPoint);
          continue;
        }
      }

      //If this was a later point, we go queue up draw steps
      else if(event.startsWith("Entered")){
        event = event.replace("Entered ", "");

        //If this is a supply point, draw from the supply list
        if(event.includes("Supply")){
          event = event.replace("Supply ", "");
          var index = parseInt(event);

          var start = Object.assign({}, previousPoint);
          var end = Object.assign({}, supplyList[index]);
          //console.log("Drawing line (start to end)");
          //console.log(start);
          //console.log(end);

          map_canvas.draw_steps.push(DrawWrapper(start, end));

          previousPoint = supplyList[index];
          continue;
        }

        //If this is a hold point, draw from the hold list
        if(event.includes("Hold")){
          event = event.replace("Hold ", "");
          var index = parseInt(event);

          var start = Object.assign({}, previousPoint);
          var end = Object.assign({}, holdList[index]);
          //console.log("Drawing line (start to end)");
          //console.log(start);
          //console.log(end);

          map_canvas.draw_steps.push(DrawWrapper(start, end));

          previousPoint = holdList[index];
          continue;
        }
      }
    }
  }

  map_canvas.Refresh(selection_map.selection);
}

function PopulateMatchSummary(holdEvents, holdStats){

  var summary_container = document.getElementById("summary-container");
  var summary_html = "";

  for(let k = 0; k < holdEvents.length; k++){
    summary_html += '<div class="p-2"><h4 class="p-2 body-sub-header"> Hold ' + (k + 1) + '</h4>';
    summary_html += '<div class="body-sub-container p-2"><div class="row"><div class="col-6"><h4 class="text-center"> Hold Events </h4>';
    for(let l = 0; l < holdEvents[k].length; l++){
      summary_html += '<h5 class="summary-element">' + holdEvents[k][l] + '</h5>';
    }
    summary_html += '</div><div class="col-6"><h4 class="text-center"> Hold Stats </h4>';

    summary_html += '<h5 class="summary-element">Sosigs Killed : ' + holdStats[k].SosigsKilled + '</h5>'
    summary_html += '<h5 class="summary-element">Melee Kills : ' + holdStats[k].MeleeKills + '</h5>'
    summary_html += '<h5 class="summary-element">Headshots : ' + holdStats[k].Headshots + '</h5>'
    summary_html += '<h5 class="summary-element">Tokens Spent : ' + holdStats[k].TokensSpent + '</h5>'
    summary_html += '<h5 class="summary-element">Guns Recycled : ' + holdStats[k].GunsRecycled + '</h5>'
    summary_html += '<h5 class="summary-element">Ammo Spent : ' + holdStats[k].AmmoSpent + '</h5>'

    summary_html += '</div></div></div></div>';
  }

  summary_container.innerHTML = summary_html;
}


function PopulateHoldSelection(holdEvents){

  console.log("boom!");
  hold_selection_container.innerHTML = "";

  for(let i = 0; i < holdEvents.length; i++){
    const button = document.createElement("button");
    button.classList.add("tnh-button-style");
    button.classList.add("hold-button");
    button.textContent = "Hold " + (i+1);
    hold_selection_container.appendChild(button);

    button.onclick = function(){
      DrawPlayerPath(holdEvents, i, i+1);
    }

  }
  

}


function PopulateButtonList(dropdown_body, dropdown_text, option_list, selection_object, id_prefix){
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
  
      map_canvas.draw_steps.length = 0;
      map_canvas.draw_steps.push(map_canvas.DrawAllHolds);
      map_canvas.draw_steps.push(map_canvas.DrawAllSupply);
      map_canvas.Refresh(selection_map.selection);

      document.getElementById("map-header").innerHTML = selection_map.selection;

      curr_page = 0;
      PopulateScoreContainer(GetScoreSelectionURL(curr_page));
      PopulatePageButtons();
    };
  }
}


function GetUserContentSelections(){
  $.get(GetUserSelectionsURL(), function(data, status){

    CHARACTERS.push(...data[0]);
    MAPS.push(...data[1]);

    //console.log(CHARACTERS);

    PopulateButtonList(character_list, dropdown_character, CHARACTERS, selection_character, "button-character-");
    PopulateButtonList(map_list, dropdown_map, MAPS, selection_map, "button-map-");

  });
}



document.addEventListener("DOMContentLoaded", function(){

  score_container = document.getElementById("score-list-container");
  page_button_container = document.getElementById("page-button-list");
  search_form = document.getElementById("search-form");
  search_bar = document.getElementById("search-bar");
  hold_selection_container = document.getElementById("hold-selection-flex")

  character_list = document.getElementById("character-list");
  map_list = document.getElementById("map-list");
  equipment_list = document.getElementById("equipment-list");
  length_list = document.getElementById("length-list");
  health_list = document.getElementById("health-list");

  dropdown_character = document.getElementById("dropdown-character");
  dropdown_map = document.getElementById("dropdown-map");
  dropdown_equipment = document.getElementById("dropdown-equipment");
  dropdown_length = document.getElementById("dropdown-length");
  dropdown_health = document.getElementById("dropdown-health");

  dropdown_map.innerHTML = MAPS[0];
  dropdown_equipment.innerHTML = EQUIPMENT_MODES[0];
  dropdown_length.innerHTML = GAME_LENGTHS[0];
  dropdown_health.innerHTML = HEALTH_MODES[0];

  document.getElementById("map-header").innerHTML = selection_map.selection;

  SetupSearchButtons();

  PopulateButtonList(character_list, dropdown_character, CHARACTERS, selection_character, "button-character-");
  PopulateButtonList(map_list, dropdown_map, MAPS, selection_map, "button-map-");
  PopulateButtonList(equipment_list, dropdown_equipment, EQUIPMENT_MODES, selection_equipment, "button-equipment-");
  PopulateButtonList(length_list, dropdown_length, GAME_LENGTHS, selection_length, "button-length-");
  PopulateButtonList(health_list, dropdown_health, HEALTH_MODES, selection_health, "button-health-");

  PopulateScoreContainer(GetScoreSelectionURL(curr_page));
  PopulatePageButtons();

  GetUserContentSelections();

});