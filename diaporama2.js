//diaporama2

const images = ["", "url('img/velo1.jpg')", "url('img/velo2.jpg')", "url('img/velo3.jpg')"];

class Diaporama {
	constructor() {
		this.back = document.getElementById("diaporama");
		this.interval = 0;
		this.counter = 1;
		this.hopela = false;
		this.pause = document.getElementById("pause");
		this.play = document.getElementById("play");
		this.overlay = document.getElementById("overlay");
		this.screenArrowLeft = document.getElementById("screenArrowLeft");
		this.screenArrowRight = document.getElementById("screenArrowRight");
	}
	slide() {
		if (this.counter === 4) {
			this.counter = 0;
		};
		if (this.counter <= images.length) {
			this.back.style.backgroundImage = images[this.counter];
			this.counter++;	
		};	
		console.log(this.counter);
	}	
	buttonPlay() {
		this.interval = setInterval( () => {this.slide()}, 5000);
	}
	go() {
		// lancement du timer, play devient bleu
		clearInterval(this.interval); 
		this.interval = setInterval( () => {this.slide()}, 5000);
		this.play.style.color = "blue";
		// Au click de pause, arret du timer, apparition de l'overlay, pause devient jaune, play devient noir
		this.pause.addEventListener("click", () => { 
			clearInterval(this.interval); 
			this.overlay.style.display = "flex";
			this.screenArrowLeft.style.display = "block";
			this.screenArrowRight.style.display = "block";
			this.pause.style.color = "yellow"; 
			this.play.style.color = "black";
		});	
		// A l'appel du clavier, overlay disparait, image up & down avec counter 
		document.addEventListener("keydown", (event) => { 
			clearInterval(this.interval);
			this.overlay.style.display = "none";
			this.nameKey = event.key;
				if (this.nameKey != "ArrowLeft" || this.nameKey != "ArrowRight") {
					//this.back.style.backgroundImage = images[this.counter]; 
				};
				console.log(this.counter);
				// Au click de fleche gauche :
				if (this.nameKey === "ArrowLeft") {

					if (this.counter === 0){
						this.counter = 4;
					};
						this.counter--;
						this.back.style.backgroundImage = images[this.counter];
					};
				// Au click de fleche droite :
				if (this.nameKey === "ArrowRight") {

					if (this.counter === 4) {
						this.counter = 0;
					};
					this.back.style.backgroundImage = images[this.counter];	
					this.counter++;
				};
				console.log(this.counter);
		})
		// Au click de arrowleft, devient vert
		this.screenArrowLeft.addEventListener("click", () => { 
			clearInterval(this.interval);
			this.overlay.style.display = "none";	
			this.screenArrowRight.style.color = "black";
			this.screenArrowLeft.style.color = "green";
			console.log(this.counter);
			if (this.counter === 0) {
				this.counter = 4;
			};
			this.counter--;
			this.back.style.backgroundImage = images[this.counter];
		})
		// Au click de arrowright, devient vert
		this.screenArrowRight.addEventListener("click", () => {
			clearInterval(this.interval);
			this.overlay.style.display = "none";
			this.screenArrowLeft.style.color = "black";
			this.screenArrowRight.style.color = "green";
			console.log(this.counter);
			this.back.style.backgroundImage = images[this.counter];
			this.counter++;
			if (this.counter === 4) {
				this.counter = 0;
			};
			console.log(this.counter);
		})
		// Au click de play, relance de go(), pause devient noir, play devient bleu
		this.play.addEventListener("click", () => {
			//clearInterval(this.interval);
			this.overlay.style.display = "none"; 
			this.screenArrowLeft.style.color = "black";
			this.screenArrowRight.style.color = "black"; 
			this.pause.style.color = "black"; 
			this.play.style.color = "blue"; 
			this.buttonPlay();  
		})
	}	
}

const diaporama = new Diaporama();

diaporama.go();









