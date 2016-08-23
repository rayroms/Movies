
var util = require('util');
//init client
var client = require('request');

 

function movieApp() {
	
	//init class
	var instruction = new movieDetails() 

	//show instructions		'http://purplestone.tv/mhv/Mh_GetMovieForTime.php',
	 console.log(instruction.params);

	 //show cinema key list ...uses GET function
	 getReq();

	 function postReq (cinemaKey){
	 	client.post(
	    'http://purplestone.tv/mhv/Mh_GetMovieForTime.php',
	    { form: { cID: cinemaKey } },
		    function (error, response, body) {
		        if (!error && response.statusCode == 200) {
		            var data = JSON.parse(body) ;

		            var moviesShowing = data[2];
		            var infoAboutMovie = data[3];
		            var label = '----------- Movies Showing at ' + data[0] + ' '+data[1]+' ----------- \n';
		            for(var k=0; k < moviesShowing.length; k++){
		            	var movieId = moviesShowing[k]['MovieId'];
		            	
		            	label = label.concat( infoAboutMovie[movieId]['Name'] + '\n'+  
		            		moviesShowing[k]['Time'] +'\n\n' );
		            	//console.log(infoAboutMovie[movieId]['Name']);
		            }

		            console.log(label);

		        }
		    }
		);

	 }


	function getReq (){

		client('http://purplestone.tv/mhv/Mh_GetMovieForTime.php', function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        var cinemaList = JSON.parse(body);
		        //console.log(cinemaList);

		        //console.log('-------- Cinema List --------');
			    var label ='-------- Cinema List --------\n';
			    var count = 0;

			    for(var k in cinemaList){
			    	count++;
			    	 var str = k +'.\t'+cinemaList[k].Name +'\n';
			    	 label = label.concat(str);

			    }

			    console.log(label+'\n\n'); 

		    }
		});


	}


	//start listening for user input
	process.stdin.resume();
	process.stdin.setEncoding('utf8');


	 //get user input data
	process.stdin.on('data', function (text) {
	    
	    if (text === 'quit\n') {
	      done();
	    }
	    else if (Number(text) > 0 &&  Number(text) < 29){
	    	//get movies showing now
	    	postReq(Number(text));

	    }

	});
	
	function done() {
	    console.log('Movie App Closed');
	    process.exit();
	}

}


//instruction list
function movieDetails(){

	var params =  [ 'Type any cinema key below for movies showing at cinema' ];
	console.log(params);

}

//start app
var aMovApp = new movieApp();
















