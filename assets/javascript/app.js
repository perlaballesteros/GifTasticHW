var APIkey="uRgGZPRQxtbwmclW3BQQoe8RCg97vEUK";

var QueryURL;
var topics=["in love","sad","angry","lol","tired","blue","curious","excited","crazy"];
var JSONRESPONSE;


//generate a queryurl based on the users clicked emotion button.
function generateQueryURL(q){

	return "http://api.giphy.com/v1/gifs/search?q="+q+"&limit=10&api_key="+APIkey;
}

function createButtons(){

	//clearing the div in order to avoid repeating the array display
	$("#buttonContainer").empty();
	
	for(var i=0;i<topics.length;i++){

		var emoButton=$("<button>").attr("id","button-"+i).addClass("emotions").append(topics[i]);
		
		$("#buttonContainer").append(emoButton);
	}

}
function displayGIFS(response){
	$("#gifResults").empty();


	for(var i=0;i<10;i++)
		{
			var imageURL=response.data[i].images.original_still.url;
			//var imageplay="false"
			var gif=$("<div>").attr("id","gif-"+i).addClass("gifContainers");
			$("#gifResults").append(gif);


			gif.append("<div class='ratings' id='rating-"+i+"'>Rating: "+response.data[i].rating+"</div>");
			gif.append("<img class='images' id='"+i+"' src='"+imageURL+"'/>");
		
		}	

		
}
function addingUserinput2Array(){
	var userButton=$("#userInput").val().trim();

	topics.push(userButton);
	createButtons();

}


createButtons();
//Create button based on the users inputed emotion
$("#submit").on("click",addingUserinput2Array);

//generating the Gifs when clicl emobutton
$("#buttonContainer").on("click",".emotions",function(){
	var qbutton=$(this).text();
	$(".emotionChosen").text(qbutton);
	
	QueryURL=generateQueryURL(qbutton);
	
	
	$.ajax({
		url:QueryURL,
		method:"GET"
	})
	.done(function(response){

		JSONRESPONSE=response;
		displayGIFS(response);

		
	})
	
});

 /*$("#userInput").keypress(function(e){
    if(e.which == 13){//Enter key pressed
    	addingUserinput2Array();
    }
 });*/

$("#gifResults").on("click",".images",function(){
	var imgindex=$(this).attr("id");
	var gifplay=$(this).attr("src");
	var imageURLplay=JSONRESPONSE.data[imgindex].images.original.url;
	var imageURLpause=JSONRESPONSE.data[imgindex].images.original_still.url;
	
	

	
	switch (gifplay){
		case imageURLpause:
		$("#"+imgindex).attr("src",imageURLplay);
		
		break;

		case imageURLplay:
		$("#"+imgindex).attr("src",imageURLpause);
		break;
	}


});