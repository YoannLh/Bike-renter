// canvas

class Canvas {
	constructor() {
		this.button = document.getElementById("button");
		this.canvas = document.getElementById("canvas");
		this.context = this.canvas.getContext('2d');
		this.x;
		this.y;
		this.buttonResa = document.getElementById("buttonResa");
		this.cancel = document.getElementById("cancel");
		this.paint = false;
		this.start = true;
		this.check = false;	
		this.buttonsCanvas = document.getElementById("buttonsCanvas");
	}
	init() {
		// Au click de button, affiche le canvas et ses boutons :
		this.button.addEventListener("click", (event) => {
		canvas.dessiner();
		})
		// Au click du bouton "Annuler", vide le canvas et cache canvas et ses boutons :
		this.cancel.addEventListener("click", (event) => {
			console.log("clear");
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.canvas.style.display = "none";
			this.buttonResa.style.display = "none";
			this.buttonsCanvas.style.display = "none";
		})
	}
	dessiner() {
		// Au click de la souris, espionne les coordonnées de x et y :
		this.canvas.addEventListener("mousedown", (event) => {
			this.paint = true;
			this.start = true;
			this.context.lineWidth = 1;
			this.context.strokeStyle = "red";
			// Lance le tracé
			this.context.beginPath();
			// Espionne les deplacements de x et y :
			this.context.moveTo(this.x, this.y); 
			this.check = true;
		})
		if (this.start === true) {
			// Trace les traits entre chaque nouvelles coordonnées de x et y avec context.lineTo :
			this.canvas.addEventListener("mousemove", (event) => {
				if (this.paint === true) {
					this.x = event.offsetX;
					this.y = event.offsetY;
					this.context.lineTo(this.x, this.y); 
					this.context.stroke();
				}	
			})
		}
		// Au relachement de la souris, trace toujours les traits mais sans couleur et avec opacité: 0 :
		this.canvas.addEventListener("mouseup", (event) => {
			this.context.strokeStyle = "rgba(0,0,0,0)";	
			this.x = event.offsetX;
			this.y = event.offsetY;
			this.context.moveTo(this.x, this.y); 
		})			
	}			
}

const canvas = new Canvas();

canvas.init();

















