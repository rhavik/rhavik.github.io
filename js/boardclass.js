
function BoardClass (){

// Measure
	this.BoardWidth = 10;
	this.BoardHeight= 10;

// Rhombus
	this.Rhomb = new RhombClass (this.BoardWidth/2, 0);

// Numeric array
	this.Numbers = [];

// Numeric stuff
	this.takeRand = function (min, max) {
		var min = min || -1;
		var max = max || 1;

		min = parseInt(min);
		max = parseInt(max);

		var pseudoRandNum = Math.random() * (max - min + 1) + min;
		var randPos = Math.floor(Math.random() * (9) + 1);
		var tempRandNum = (pseudoRandNum >= 0) ? Math.floor (pseudoRandNum * Math.pow (10, randPos-1) ) * 10 : Math.ceil (pseudoRandNum * Math.pow (10, randPos-1) ) * 10;
		var tempRandNum2 = pseudoRandNum * Math.pow (10, randPos);
		var RandNum = tempRandNum2 - tempRandNum;
		var result = Math.floor(RandNum);

		if (result == 0) result = this.takeRand ();

		return result;
	};

	this.pushNumber = function (x, y, mode){
		var mode = mode || 0;

		if (this.Numbers[y] == undefined) {
			this.Numbers[y] = new Array (5);
		}

		if (this.Numbers[y][x] == undefined || (mode && this.Numbers[y][x] == 0 ) ){ 
			this.Numbers[y][x] = this.takeRand();
		}
	};

	this.getNumber = function (x, y){
		var x = x || this.getRhombX ();
		var y = y || this.getRhombY ();
		return this.Numbers[y][x];
	};

	this.resetNumber = function (){
		var x = this.getRhombX ();
		var y = this.getRhombY ();
		this.Numbers[y][x] = 0;
	};

	this.resetAllNumbers = function (){
		var evenY = 1;
		for (var y = 1; y < this.BoardWidth; y += 1) {
			for (var x = 1 + evenY; x < this.BoardHeight; x += 2) {
				this.Numbers[y][x] = 0;
			}

			if (evenY == 1) evenY--; 
			else evenY++;
		}
	};

// CSS Board stuff
	this.drawCSSBoard = function (BoardElement){
		var evenY = 1;

		// Mark line
		v_mline = document.createElement("div");
		v_mline.className = "mark-line";
		BoardElement.appendChild (v_mline);

		for (var m = 1; m < this.BoardHeight; m += 2) {
			v_mark = document.createElement("div");
			v_mark.className = (m == this.BoardHeight/2) ? "start-mark" : "blank-mark";
			v_mark.id = m;
			v_mline.appendChild (v_mark);
		}

		// Board tile's
		for (var y = 1; y < this.BoardWidth; y += 1) {
			v_line = document.createElement("div");
			v_line.className = "board-line";
			BoardElement.appendChild (v_line);

			for (var x = 1 + evenY; x < this.BoardHeight; x += 2) {
				this.pushNumber(x,y);
				var num = this.getNumber(x,y);

				v_tile = document.createElement("div");
				v_tile.className = "board-tile";
				v_tile.id = y*10 + x;
				v_line.appendChild (v_tile);

				v_num = document.createElement("div");
				v_num.className = "num"
				v_num.innerHTML = num || '&';
				v_tile.appendChild (v_num);
			}

			if (evenY == 1) evenY--;
			else evenY++;
		}
	}

	this.updateCSSBoard = function (){
		for (var m = 1; m < this.BoardHeight; m += 2) {
			v_mark = document.getElementById (m);
			v_mark.className = (m == this.getRhombX()) ? "start-mark" : "blank-mark";
		}

		var evenY = 1;
		for (var y = 1; y < this.BoardWidth; y += 1) {
			for (var x = 1 + evenY; x < this.BoardHeight; x += 2) {
				this.pushNumber(x,y,1);	// reset 0-values
				var num = this.getNumber(x,y);

				var v_tile = document.getElementById (y*10 + x);
				v_tile.className = "board-tile"; //return default CSS class to all tile's
				v_tile.firstElementChild.innerHTML = num; // display updated value
			}
			if (evenY == 1) evenY--;
			else evenY++;

		}
	}

// CSS Rhomb
	this.drawCSSRhomb = function (){
		var v_tile = document.getElementById (this.getRhombY ()*10 + this.getRhombX ());
		v_tile.className = "rhomb-tile";
	}

// Rhomb stuff
	this.liftRhomb = function (){
		this.Rhomb.row = 0;
	};

	this.getRhombX = function (){
		return this.Rhomb.col;
	};

	this.getRhombY = function (){
		return this.Rhomb.row;
	};

	this.setRhombDefaultPosition = function (){
		this.Rhomb.col = this.BoardWidth/2,
		this.Rhomb.row = 0;
	};

}
	
// Rhomb stuff
	this.liftRhomb = function (){
		this.Rhomb.row = 0;
	};

	this.getRhombX = function (){
		return this.Rhomb.col;
	};
