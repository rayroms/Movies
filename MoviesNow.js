
var util = require('util');
//init client
var Client = require('node-rest-client').Client;
var aClient = new Client();

 

function movieApp() {
	
	//init class
	var instruction = new movieDetails() 

	//show instructions
	 console.log(instruction.params);

	 function postReq (cinemaKey){
	 	var args = {
		    data: { cID: '23' },
		    headers: { "Content-Type": "application/json" }
		};
 
		aClient.post("http://purplestone.tv/mhv/Mh_GetMovieForTime.php", args, function (data, response) {
		    // parsed response body as js object 
		    var movieData = data.toString('utf8'); 

		   	console.log( movieData ) ;
		});


	 }


	function getReq (){
		aClient.get("http://purplestone.tv/mhv/Mh_GetMovieForTime.php", function (data, response) {
		    // parsed response body as js object 
		    var cinemaList = JSON.parse(data.toString('utf8'));

		    console.log('-------- Cinema List --------');
		    var count = 0;
		    for(var k in cinemaList){
		    	count++;
		    	console.log(k +'.\t'+cinemaList[k].Name);
		    }

		    console.log('\n\n');
		    
		 });

	}


	//start listening for user input
	process.stdin.resume();
	process.stdin.setEncoding('utf8');


	 //get user input data
	process.stdin.on('data', function (text) {
	    //console.log('received data:', util.inspect(text));
	    
	    if (text === 'quit\n') {
	      done();
	    }
	    else if (text === '23\n'){
	    	//get movies showing in 1 hr
	    	console.log('Ozonecinema');
	    	postReq('23');

	    }
	    else if(text === '11\n'){
	    	console.log('Ikejacity')
	    }
	    else if(text === '3\n'){
	    	//run get... list all cinemas in Nigeria
	    	getReq();

	    	//reshow instructions
	 		console.log(instruction.params);23

	    }

	});
	
	function done() {
	    console.log('Movie App Closed');
	    process.exit();
	}






}



function movieDetails(){

	var params =  [ 'Type cinema key for movies in cinema: 23 - Ozonecinema; 11 - Ikejacity mall', 'Show all cinema names  - Type 3' ];
	console.log(params);

}


var aMovApp = new movieApp();

//aMovApp.getReq();

//console.log( aMovApp.dat);
















