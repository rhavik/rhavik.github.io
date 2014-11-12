
function UserInterfaceClass () {

	this.element = []; // User interface elements

	this.bindElement = function (id) {
		this.element [id] = document.getElementById(id);
	};
}