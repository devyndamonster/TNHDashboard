
const MAPS = ["Default", "Winter Wasteland"];
const EQUIPMENT_MODES = ["Limited", "Spawnlock"];
const GAME_LENGTHS = ["5-Hold", "3-Hold", "Endless"];
const HEALTH_MODES = ["Standard", "One-Hit"];

var selection_map = {'selection' : MAPS[0]};
var selection_equipment = {'selection' : EQUIPMENT_MODES[0]};
var selection_length = {'selection' : GAME_LENGTHS[0]};
var selection_health = {'selection' : HEALTH_MODES[0]};

var curr_page = 0;

var score_container = {};
var page_button_container = {};

var map_list = {};
var equipment_list = {};
var length_list = {};
var health_list = {};

var dropdown_map = {};
var dropdown_equipment = {};
var dropdown_length = {};
var dropdown_health = {};

var page_buttons = [];
var search_form = {};
var search_bar = {};

function GetScoreSelectionURL(page){
  var url = "https://tnh-dashboard.azure-api.net/v1/api/scores";
  url += "?map=" + selection_map.selection;
  url += "&health=" + selection_health.selection;
  url += "&equipment=" + selection_equipment.selection;
  url += "&length=" + selection_length.selection;
  url += "&startingIndex=" + page * 10 + "&count=10";

  return url;
}


function GetScoreSelectionCountURL(){
  var url = "https://tnh-dashboard.azure-api.net/v1/api/scores/count";
  url += "?map=" + selection_map.selection;
  url += "&health=" + selection_health.selection;
  url += "&equipment=" + selection_equipment.selection;
  url += "&length=" + selection_length.selection;

  return url;
}


function GetScoreSearchURL(name){
  var url = "https://tnh-dashboard.azure-api.net/v1/api/scores/search";
  url += "?map=" + selection_map.selection;
  url += "&health=" + selection_health.selection;
  url += "&equipment=" + selection_equipment.selection;
  url += "&length=" + selection_length.selection;
  url += "&name=" + name;

  return url;
}


function SetupSearchButtons(){
  search_form.onsubmit = function(){
    console.log(search_bar.value);
    SearchForPlayer(search_bar.value);
    return false;
  }
}

function SearchForPlayer(name){
  var url = GetScoreSearchURL(name);

  $.get(url, function(data, status){
    console.log(data);
    
    score_container.innerHTML = "";

    if(data.length > 0){
      const button = document.createElement("button");
      button.classList.add("btn");
      button.classList.add("w-100");
      button.classList.add("score-list-button");
      score_container.appendChild(button);
      button.innerHTML = "";

      button.innerHTML += "<a class=\"score-name\">" + data[0].name + "</a>";
        button.innerHTML += "<a class=\"score-val\">" + data[0].score + "</a>";

        button.onclick = function(){
          console.log(JSON.parse(data[0].holdActions));
          console.log(JSON.parse(data[0].holdStats));
          PopulateMatchSummary(JSON.parse(data[0].holdActions), JSON.parse(data[0].holdStats));
          DrawPlayerPath(JSON.parse(data[0].holdActions));
        };
    }

    else{
      const button = document.createElement("button");
      button.classList.add("btn");
      button.classList.add("w-100");
      button.classList.add("score-list-button");
      score_container.appendChild(button);

      button.innerHTML = "";

      button.innerHTML += "<a class=\"score-name\">" + "--------" + "</a>";
      button.innerHTML += "<a class=\"score-val\">" + "--------" + "</a>";
    }

    for(let j = 0; j < 9; j++){
      const button = document.createElement("button");
      button.classList.add("btn");
      button.classList.add("w-100");
      button.classList.add("score-list-button");
      score_container.appendChild(button);

      button.innerHTML = "";

      button.innerHTML += "<a class=\"score-name\">" + "--------" + "</a>";
      button.innerHTML += "<a class=\"score-val\">" + "--------" + "</a>";
    }
    
  });
}


function PopulateScoreContainer(page){
  var url = GetScoreSelectionURL(page);

  $.get(url, function(data, status){
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
        button.innerHTML += "<a class=\"score-name\">" + data[j].name + "</a>";
        button.innerHTML += "<a class=\"score-val\">" + data[j].score + "</a>";

        button.onclick = function(){
          console.log(JSON.parse(data[j].holdActions));
          console.log(JSON.parse(data[j].holdStats));
          PopulateMatchSummary(JSON.parse(data[j].holdActions), JSON.parse(data[j].holdStats));
          DrawPlayerPath(JSON.parse(data[j].holdActions));
        };
      }
      else{
        button.innerHTML += "<a class=\"score-name\">" + "--------" + "</a>";
        button.innerHTML += "<a class=\"score-val\">" + "--------" + "</a>";
      }
    }
  });
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
        PopulateScoreContainer(curr_page);
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
          PopulateScoreContainer(curr_page);
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
        PopulateScoreContainer(curr_page);
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

function DrawPlayerPath(holdEvents){

  map_canvas.draw_steps.length = 0;
  map_canvas.draw_steps.push(map_canvas.DrawAllHolds);
  map_canvas.draw_steps.push(map_canvas.DrawAllSupply);

  var previousPoint = null;
  var holdList = [];
  var supplyList = [];

  if(selection_map.selection == MAPS[0]){
    holdList = ObjectiveListDefault;
    supplyList = SupplyListDefault;
  }
  else if(selection_map.selection == MAPS[1]){
    holdList = ObjectiveListWinter;
    supplyList = SupplyListWinter;
  }

  for(let i = 0; i < holdEvents.length; i++){
    for(let j = 0; j < holdEvents[i].length; j++){
      var event = holdEvents[i][j];

      if(event.startsWith("Spawned At")){
        event = event.replace("Spawned At ", "");
        if(event.includes("Supply")){
          event = event.replace("Supply ", "");
          var index = parseInt(event);

          previousPoint = supplyList[index];
          continue;
        }
      }

      if(event.startsWith("Entered")){
        event = event.replace("Entered ", "");
        if(event.includes("Supply")){
          event = event.replace("Supply ", "");
          var index = parseInt(event);

          var start = Object.assign({}, previousPoint);
          var end = Object.assign({}, supplyList[index]);
          console.log("Drawing line (start to end)");
          console.log(start);
          console.log(end);

          map_canvas.draw_steps.push(DrawWrapper(start, end));

          previousPoint = supplyList[index];
          continue;
        }

        if(event.includes("Hold")){
          event = event.replace("Hold ", "");
          var index = parseInt(event);

          var start = Object.assign({}, previousPoint);
          var end = Object.assign({}, holdList[index]);
          console.log("Drawing line (start to end)");
          console.log(start);
          console.log(end);

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

      curr_page = 0;
      PopulateScoreContainer(curr_page);
      PopulatePageButtons();
    };
  }
}



document.addEventListener("DOMContentLoaded", function(){

  score_container = document.getElementById("score-list-container");
  page_button_container = document.getElementById("page-button-list");
  search_form = document.getElementById("search-form");
  search_bar = document.getElementById("search-bar");

  map_list = document.getElementById("map-list");
  equipment_list = document.getElementById("equipment-list");
  length_list = document.getElementById("length-list");
  health_list = document.getElementById("health-list");

  dropdown_map = document.getElementById("dropdown-map");
  dropdown_equipment = document.getElementById("dropdown-equipment");
  dropdown_length = document.getElementById("dropdown-length");
  dropdown_health = document.getElementById("dropdown-health");

  dropdown_map.innerHTML = MAPS[0];
  dropdown_equipment.innerHTML = EQUIPMENT_MODES[0];
  dropdown_length.innerHTML = GAME_LENGTHS[0];
  dropdown_health.innerHTML = HEALTH_MODES[0];

  SetupSearchButtons();

  PopulateButtonList(map_list, dropdown_map, MAPS, selection_map, "button-map-");
  PopulateButtonList(equipment_list, dropdown_equipment, EQUIPMENT_MODES, selection_equipment, "button-equipment-");
  PopulateButtonList(length_list, dropdown_length, GAME_LENGTHS, selection_length, "button-length-");
  PopulateButtonList(health_list, dropdown_health, HEALTH_MODES, selection_health, "button-health-");

  PopulateScoreContainer(curr_page);
  PopulatePageButtons();
});