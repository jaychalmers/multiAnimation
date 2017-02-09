window.onload = function (){

	/* =========================================================
		VARIABLES
		
		Variables are set here to set timing on animation events.
		This allows fine-tuning through adjustment of fewer values.
	*/
	var bpm = 142;
	var beat = (1000/(bpm / 60));
	
	var introLinesDelay = 49;
	var introLinesAnimSpeed = 430;
	
	var psychedelicShapesDelay = (introLinesDelay+(introLinesAnimSpeed*4));
	var	psychedelicShapesAnimSpeed = (beat*1.8);
	
	var skullSpinDelay = psychedelicShapesDelay;
	var skullSpinAnimSpeed = (beat * 32);
	
	var letsBeFriendsDelay = (skullSpinDelay + skullSpinAnimSpeed);
	
	var animationLength = letsBeFriendsDelay + 2000;
	
	//var to point to audio
	var animAudio = document.createElement("AUDIO");
	
	/* =========================================================
		ANIMATION FUNCTIONS
		
		These contain the different animations that make up the sequence.
		On clicking the Play button, the run_animation() function is called,
		which itself calls the individual animation functions and passes them
		various values to have them run at the correct time and speed with correct colours, etc.
	*/
	
	function intro_lines(){		
		var upLeft = paper.path("M 0 0 l 0 0");
		var upRight = paper.path("M 480 0 l 0 0");
		var downLeft = paper.path("M 0 360 l 0 0");
		var downRight = paper.path("M 480 360 l 0 0");
		
		var ula = Raphael.animation({path: "M 0 0 l 240 180"}, introLinesAnimSpeed, 'linear');
		upLeft.animate(ula.delay(introLinesDelay));
		var ura = Raphael.animation({path: "M 480 0 l -240 180"}, (introLinesAnimSpeed), 'linear');
		upRight.animate(ura.delay((introLinesDelay+introLinesAnimSpeed)));
		var dla = Raphael.animation({path: "M 0 360 l 240 -180"}, (introLinesAnimSpeed), 'linear');
		downLeft.animate(dla.delay((introLinesDelay+(introLinesAnimSpeed*2))));
		var dra = Raphael.animation({path: "M 480 360 l -240 -180"}, (introLinesAnimSpeed), 'linear');
		downRight.animate(dra.delay((introLinesDelay+(introLinesAnimSpeed*3))));
	}
	
	function psychedelic_shapes(myColor, myDelay){
		
		var upPsych = paper.path("M 240 180 l 0 0")
			.attr({
				fill : myColor
			});
		var rightPsych = paper.path("M 240 180 l 0 0")
			.attr({
				fill : myColor
			});
		var downPsych = paper.path("M 240 180 l 0 0")
			.attr({
				fill : myColor
			});
		var leftPsych = paper.path("M 240 180 l 0 0")
			.attr({
				fill : myColor
			});
		
		var uPsyA = Raphael.animation({path: "M -1 -1 l 482 0 l -241 181 Z"}, psychedelicShapesAnimSpeed, 'ease-in');
		upPsych.animate(uPsyA.delay(myDelay));
		var rPsyA = Raphael.animation({path: "M 481 -1 l 0 362 l -241 -181 z"}, psychedelicShapesAnimSpeed, 'ease-in');
		rightPsych.animate(rPsyA.delay(myDelay));
		var dPsyA = Raphael.animation({path: "M -1 361 l 482 0 l -241 -181 z"}, psychedelicShapesAnimSpeed, 'ease-in');
		downPsych.animate(dPsyA.delay(myDelay));
		var lPsyA = Raphael.animation({path: "M -1 -1 l 0 362 l 241 -181 z"}, psychedelicShapesAnimSpeed, 'ease-in');
		leftPsych.animate(lPsyA.delay(myDelay));
	}
	
	function skull_spin(myDelay){
		var skull = paper.image("images/skull.png", 240, 180, 1, 1);
		
		var skullA = Raphael.animation({x:-48,y:-292,width:579,height:878,transform:"r360"}, skullSpinAnimSpeed, 'ease-in');
		skull.animate(skullA.delay(myDelay));
	}
	
	function lets_be_friends(){
		var friends = paper.text(240, 180, "LET'S BE\nFRIENDS")
			.attr({
				'font-size': 80,
				'font-weight': 'bold',
				'fill' : 'white',
				stroke: 'black'
			});
	}
	
	function endscreen_trigger(){
		paper.clear();
		background_create();
		endscreen_create();
	}
		
	/* =========================================================
		CONTROL FUNCTIONS
		
		These contain the background creation, play screen, animation run, and end screen.
		The actual sequence occurs thusly:
		
		0. To begin with, the paper is created.
			1. The background is created.
				2. Then the play screen is populated. On clicking 'Play'...
					3. The animation runs.
						4. Everything on the paper is deleted, then 2 is repeated, and the end screen is populated.
						   On clicking 'Play Again', we return to 4.
	*/
	
	function background_create(){
		var background = paper.rect(0,0,480,360)
		.attr({
			fill : "white",
			stroke : "none"
		});
	}
	
	function audio_run(){
		animAudio.setAttribute("src","audio/VPT_Intro.mp3");
		animAudio.play();
	}
	
	function playscreen_create(){
		var button = paper.text(240, 180, "Play..?")
			.attr({
				'font-size': 24,
				'fill' : 'black',
				cursor : "pointer"
			}).click(function(){
				this.remove();
				audio_run();
				run_animation();
			});
	}
	
	function run_animation(){
		/*These vars are used to give different colors to the psychedelic_shapes() function*/
		var psychedelic_shapes_colors = ["#ff0000","#0000ff","#00ff00","#ff00ff"];
		var colorPicker = 0;
		
		intro_lines();
		
		for (i = 0; i < 32; i++) {
			if (colorPicker > 3) {
				colorPicker = 0;
			}
			psychedelic_shapes(psychedelic_shapes_colors[colorPicker], (psychedelicShapesDelay + (beat * i)));
			colorPicker++;
		}
		
		skull_spin(skullSpinDelay);
		
		var friendsRun = setTimeout(lets_be_friends, letsBeFriendsDelay);
		
		var endRun = setTimeout(endscreen_trigger, animationLength);
	}
	
	function endscreen_create(){
		
		var credits = paper.text(76, 354, "Written by Jamie Chalmers 2015");
				
		var button = paper.text(240, 180, "Play again..?")
			.attr({
				'font-size': 24,
				'font-weight': 'italics',
				'fill' : 'black',
				cursor : "pointer"
			}).click(function(){
				credits.remove();
				this.remove();
				audio_run();
				run_animation();
			});
	}
	
	/* MAGIC FINALLY ACTUALLY HAPPENS HERE */
	var paper = new Raphael(document.getElementById("canvas_container"), 480, 360);
	background_create();
	playscreen_create();
}