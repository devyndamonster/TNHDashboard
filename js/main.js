(function () {

    var score_container = document.getElementById("score-container");
    //score_container.innerHTML += "<div class=\"score-list-entry\"><a>Dude1</a><a class=\"score-val\">1000000</a></div>";

    /*
    $.get("https://TNHDashboardDatabase.devynmyers1.repl.co/high_score_entry", function(data, status){
        score_container.innerHTML += data;
    });
    */

    $.get("https://localhost:44309/api/scores", function(data, status){
        console.log(data);

        for(let i = 0; i < data.length; i++){
          score_container.innerHTML += "<div class=\"score-list-entry\"><a>" + data[i].name + "</a><a class=\"score-val\">" + data[i].score + "</a></div>";
        }
    });


    /*
    var entry = {};
    entry.name = "John";
    entry.score = 1000203;

    console.log(JSON.stringify(entry))

    $.ajax({
        url: 'https://localhost:44309/api/scores',
        type: 'PUT',
        contentType:'application/json',
        data: JSON.stringify(entry),
        success: function(data) {
          alert('They got the data!');
        }
      });
    */
    
})();