var APIkey="uRgGZPRQxtbwmclW3BQQoe8RCg97vEUK";

var QueryURL="http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key="+APIkey;
var topics=["love","sad","angry","lol"];

function createButtons(){

	$("#buttonContainer").empty();
	
	for(var i=0;i<topics.length;i++){

		var emoButton=$("<button>").attr("id","button-"+i).append(topics[i]);
		
		$("#buttonContainer").append(emoButton);
	}

}
createButtons();

$("#submit").on("click",function(){

	var userButton=$("#userInput").val().trim();

	topics.push(userButton);
	
	createButtons();
	

});
