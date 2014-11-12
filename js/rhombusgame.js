var RhombusGame;
var GameBoard;

var gInputHanler;


// ******************************************************************************************** //

function Game (){

	this.gameInProgress = false;
	this.gameScore = 0;
	this.currentScore = 0;
	this.activeHelpPage = '';

	this.ui = new UserInterfaceClass (); // User unterface
	
	this.startGame = function () {
		this.gameInProgress = true;
		this.gameScore = 0;
		this.currentScore = 0;
		
		this.ui.element['GameOver'].style.display = 'none';
		this.ui.element['GameScore'].innerHTML = this.gameScore;
		this.ui.element['CurrentScore'].innerHTML = this.currentScore;
		this.ui.element['Sequence'].innerHTML = '= ' + this.currentScore;
		GameBoard.setRhombDefaultPosition();
	}
	
	this.endGame =  function () {
		this.gameInProgress = false;
		this.ui.element['GameOver'].style.display = 'block';
	}
	
	this.pauseGame = function () {
		this.gameInProgress = false;
	}
	
	this.resumeGame = function () {
		this.gameInProgress = true;
	}
	
	
	this.updateScore = function (num){
		this.gameScore += num;
		this.currentScore += num;
	}
	
	this.Desciption = function (page) {
		var page = page || 0;
		
		if (this.activeHelpPage == '' ){ // Nothing displayed? Lets show default page
			this.activeHelpPage = (page > 0) ? page : 1;
			this.ui.element['HelpPage'+this.activeHelpPage].style.display = 'block';
			this.pauseGame ();
		}
		else{ // Something displayed... 
			// ...hide active page
			this.ui.element['HelpPage'+this.activeHelpPage].style.display = 'none';
			this.activeHelpPage = '';
			
			if (page > 0){ // and display another page
				this.activeHelpPage = page;
				this.ui.element['HelpPage'+this.activeHelpPage].style.display = 'block';
			}
			else this.resumeGame ();
		}
	}
	
	this.toProcess = function (action){
		switch (action){
			case 0: // Up
				break;
			case 1: // Right
				if (this.gameInProgress && GameBoard.getRhombX () < GameBoard.BoardWidth - 1) GameBoard.Rhomb.move ('right')
				else return false;
				break;
			case 2: // Down
				break;
			case 3: // Left
				if (this.gameInProgress && GameBoard.getRhombX () > 1) GameBoard.Rhomb.move ('left');
				else return false;
				break;
			case 4: //Restart
				if (!this.gameInProgress){
					this.startGame ();
				}
				else return false;
				break;
			default:
				return false;
		}

		if (!this.gameInProgress) {
			return false;
		}
		
		if (GameBoard.getRhombY () >= GameBoard.BoardHeight ) GameBoard.liftRhomb ();
			
		
		if (GameBoard.getRhombY () > 0){
			var currentNum = GameBoard.getNumber (); // take number with current rhomb coordinates
			this.updateScore (currentNum);
			GameBoard.drawCSSRhomb ();
			this.ui.element['CurrentScore'].innerHTML = this.currentScore;
			this.ui.element['Sequence'].innerHTML += (currentNum >= 0) ? '+' + currentNum : currentNum;
			GameBoard.resetNumber (); // reset current tile to 0
		}
		else {
			if (this.currentScore < 0){
				this.endGame();
			}
			else {
				this.currentScore = 0;
				GameBoard.updateCSSBoard ();
				this.ui.element['GameScore'].innerHTML = this.gameScore;
				this.ui.element['CurrentScore'].innerHTML = this.currentScore;
				this.ui.element['Sequence'].innerHTML = '= ' + this.currentScore;
			}
		}	
	}
};


// ******************************************************************************************** //


function initGame() {

	if (!RhombusGame) RhombusGame = new Game ();
	if (!GameBoard) GameBoard = new BoardClass ();
	
	RhombusGame.ui.bindElement ('GameScore');
	RhombusGame.ui.bindElement ('GameOver');
	RhombusGame.ui.bindElement ('GameRestart');
	RhombusGame.ui.bindElement ('Sequence');
	RhombusGame.ui.bindElement ('CurrentScore');
	RhombusGame.ui.bindElement ('Board');
	RhombusGame.ui.bindElement ('Help');
	RhombusGame.ui.bindElement ('HelpPage1');
	RhombusGame.ui.bindElement ('HelpPage2');
	RhombusGame.ui.bindElement ('Rules');
	RhombusGame.ui.bindElement ('Controls');
	
	gInputHanler = new inputHandler ();
	
	GameBoard.drawCSSBoard (RhombusGame.ui.element['Board']);
	RhombusGame.startGame();
	
	RhombusGame.ui.element['GameScore'].innerHTML = RhombusGame.gameScore;
	RhombusGame.ui.element['CurrentScore'].innerHTML = RhombusGame.currentScore;
	RhombusGame.ui.element['Sequence'].innerHTML = '= ' + RhombusGame.currentScore;
	
	gInputHanler.listen ();
}
