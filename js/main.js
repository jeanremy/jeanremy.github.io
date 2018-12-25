(function() {

	function setSize() {
		var winHeight 		= window.innerHeight,
			main = document.getElementById('main');
		
		main.height = winHeight;


	}

	// Set title container to 100% height			
	window.onresize = function() {
		setSize();
	}

	setSize();

})();