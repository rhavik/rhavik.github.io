function RhombClass (x, y){
// Coordinates
	this.col = x;
	this.row = y;

	this.move = function (side){
		var side = side || '';
		switch (side){
			case 'right':
				this.row += 1;
				this.col += 1;
				break;
			case 'left': 
				this.row += 1;
				this.col -= 1;
				break;
			default:
				break;
		}
	};
}