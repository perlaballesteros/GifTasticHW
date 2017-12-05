var APIkey="uRgGZPRQxtbwmclW3BQQoe8RCg97vEUK";

var QueryURL;
var topics=["love","sad","angry","lol"];


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
			var imageURL=response.data[i].images.original.url;
			var gif=$("<div>").attr("id","gif-"+i).addClass("gifContainers");
			$("#gifResults").append(gif);


			gif.append("<div id='rating-"+i+"'>Rating: "+response.data[i].rating+"</div>");
			gif.append("<img id='img-"+i+"' src='"+imageURL+"'/>");

		}

}
function addingUserinput2Array(){
	var userButton=$("#userInput").val().trim();

	topics.push(userButton);
	createButtons();
	console.log("im here");
	return;
}


createButtons();
//Create button based on the users inputed emotion
$("#submit").on("click",addingUserinput2Array);

//generating the Gifs when clicl emobutton
$("#buttonContainer").on("click",".emotions",function(){
	var qbutton=$(this).text();

	console.log(qbutton);
	console.log("im here2");
	
	QueryURL=generateQueryURL(qbutton);
	console.log(QueryURL)
	
	$.ajax({
		url:QueryURL,
		method:"GET"
	})
	.done(function(response){

		displayGIFS(response);
		
	})
	
});