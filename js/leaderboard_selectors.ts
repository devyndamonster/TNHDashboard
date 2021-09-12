/**
 * Leaderboard entry for a specific TNH category
 */
interface LeaderboardEntry {
    equipmentMode: string;
    gameLength: string;
    healthMode: string;
    id: number;
    map: string;
    name: string;
    score: bigint;
};


const MAPS              = [ "Default", "Winter Wasteland" ];
const EQUIPMENT_MODES   = [ "Limited", "Spawnlock" ];
const GAME_LENGTHS      = [ "5-Hold", "3-Hold", "Endless" ];
const HEALTH_MODES      = [ "Standard", "One-Hit" ];

var selections = {
    map:         MAPS[0],
    equipment:   EQUIPMENT_MODES[0],
    length:      GAME_LENGTHS[0],
    health:      HEALTH_MODES[0],
};

/**
 * Gets the score URL from the TNH API
 * @returns Score selection URL from the API
 */
var getScoreSelectionURL = () => {
  var url = "https://tnh-dashboard.azure-api.net/v1/api/scores";
  url += "?map=" + selections.map;
  url += "&health=" + selections.health;
  url += "&equipment=" + selections.equipment;
  url += "&length=" + selections.length;
  url += "&startingIndex=0&count=10";

  return url;
}

/**
 * Populates the score container with scores from the API
 * @param scoreContainer Container to populate
 */
var populateScoreContainer = (scoreContainer: HTMLElement) => {
  var url = getScoreSelectionURL();

  //I do not want JQuery types
  // @ts-ignore 
  $.get(url, (data: LeaderboardEntry[], status) => {
    console.log(data);

    scoreContainer.innerHTML = "";

    for(let j = 0; j < data.length; j++){
      var buttonHTML = "";
      buttonHTML += "<button class=\"btn w-100 score-list-button\" type=\"button\">";
      buttonHTML += "<a class=\"score-name\">" + data[j].name + "</a>";
      buttonHTML += "<a class=\"score-val\">" + data[j].score + "</a>";
      buttonHTML += "</button>";
      scoreContainer.innerHTML += buttonHTML;
    }
  });

}

/**
 * Populates a list of buttons
 * @param dropdownBody Body of the dropdown
 * @param dropdownText Text of the dropdown
 * @param scoreContainer Score list
 * @param optionList Option list
 * @param selection Selection to save the selected entry to
 * @param idPrefix Prefix to give to the ID
 */
var populateButtonList = (dropdownBody: HTMLElement, dropdownText: HTMLElement, scoreContainer: HTMLElement, optionList: string[], selection: string, idPrefix: string) => {
  dropdownBody.innerHTML = "";
  for(let i = 0; i < optionList.length; i++){

    const button = document.createElement("button");
    button.classList.add("dropdown-item");
    button.id = idPrefix + optionList[i].toLowerCase().replace(" ", "-"); 
    button.textContent = optionList[i];
    dropdownBody.appendChild(button);

    button.onclick = () => {
      selection = optionList[i];
      dropdownText.innerHTML = optionList[i];
      scoreContainer.innerHTML = "";
  
      populateScoreContainer(scoreContainer);
    };
  }
}



document.addEventListener("DOMContentLoaded", () => {

  var score_container = document.getElementById("score-list-container");

  var elements = {
      map : document.getElementById("map-list"),
      equipment : document.getElementById("equipment-list"),
      length : document.getElementById("length-list"),
      health : document.getElementById("health-list"),
  };

  var dropdowns = {
      map : document.getElementById("dropdown-map"),
      equipment : document.getElementById("dropdown-equipment"),
      length : document.getElementById("dropdown-length"),
      health : document.getElementById("dropdown-health"),
  };

  dropdowns.map.innerHTML = MAPS[0];
  dropdowns.equipment.innerHTML = EQUIPMENT_MODES[0];
  dropdowns.length.innerHTML = GAME_LENGTHS[0];
  dropdowns.health.innerHTML = HEALTH_MODES[0];

  populateButtonList(elements.map, dropdowns.map, score_container, MAPS, selections.map, "button-map-");
  populateButtonList(elements.equipment, dropdowns.equipment, score_container, EQUIPMENT_MODES, selections.equipment, "button-equipment-");
  populateButtonList(elements.length, dropdowns.length, score_container, GAME_LENGTHS, selections.length, "button-length-");
  populateButtonList(elements.health, dropdowns.health, score_container, HEALTH_MODES, selections.health, "button-health-");

  populateScoreContainer(score_container);

});