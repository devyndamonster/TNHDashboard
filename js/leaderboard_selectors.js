;
var MAPS = ["Default", "Winter Wasteland"];
var EQUIPMENT_MODES = ["Limited", "Spawnlock"];
var GAME_LENGTHS = ["5-Hold", "3-Hold", "Endless"];
var HEALTH_MODES = ["Standard", "One-Hit"];
var selections = {
    map: MAPS[0],
    equipment: EQUIPMENT_MODES[0],
    length: GAME_LENGTHS[0],
    health: HEALTH_MODES[0]
};
var getScoreSelectionURL = function () {
    var url = "https://tnh-dashboard.azure-api.net/v1/api/scores";
    url += "?map=" + selections.map;
    url += "&health=" + selections.health;
    url += "&equipment=" + selections.equipment;
    url += "&length=" + selections.length;
    url += "&startingIndex=0&count=10";
    return url;
};
var populateScoreContainer = function (scoreContainer) {
    var url = getScoreSelectionURL();
    //I do not want JQuery types
    // @ts-ignore 
    $.get(url, function (data, status) {
        console.log(data);
        scoreContainer.innerHTML = "";
        for (var j = 0; j < data.length; j++) {
            var button_html = "";
            button_html += "<button class=\"btn w-100 score-list-button\" type=\"button\">";
            button_html += "<a class=\"score-name\">" + data[j].name + "</a>";
            button_html += "<a class=\"score-val\">" + data[j].score + "</a>";
            button_html += "</button>";
            scoreContainer.innerHTML += button_html;
        }
    });
};
var populateButtonList = function (dropdownBody, dropdownText, scoreContainer, optionList, selection, idPrefix) {
    dropdownBody.innerHTML = "";
    var _loop_1 = function (i) {
        var button = document.createElement("button");
        button.classList.add("dropdown-item");
        button.id = idPrefix + optionList[i].toLowerCase().replace(" ", "-");
        button.textContent = optionList[i];
        dropdownBody.appendChild(button);
        button.onclick = function () {
            selection = optionList[i];
            dropdownText.innerHTML = optionList[i];
            scoreContainer.innerHTML = "";
            populateScoreContainer(scoreContainer);
        };
    };
    for (var i = 0; i < optionList.length; i++) {
        _loop_1(i);
    }
};
document.addEventListener("DOMContentLoaded", function () {
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
    populateButtonList(map_list, dropdown_map, score_container, MAPS, selections.map, "button-map-");
    populateButtonList(equipment_list, dropdown_equipment, score_container, EQUIPMENT_MODES, selections.equipment, "button-equipment-");
    populateButtonList(length_list, dropdown_length, score_container, GAME_LENGTHS, selections.length, "button-length-");
    populateButtonList(health_list, dropdown_health, score_container, HEALTH_MODES, selections.health, "button-health-");
    populateScoreContainer(score_container);
});
