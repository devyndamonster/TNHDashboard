
document.addEventListener("DOMContentLoaded", function(){
  var score_container = document.getElementById("score-container");

    $.get("https://localhost:44309/api/scores", function(data, status){
        console.log(data);

        for(let i = 0; i < data.length; i++){
          score_container.innerHTML += "<div class=\"score-list-entry\"><a>" + data[i].name + "</a><a class=\"score-val\">" + data[i].score + "</a></div>";
        }
    });
});