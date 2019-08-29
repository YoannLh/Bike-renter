// compteur

class Compteur {
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.context = this.canvas.getContext('2d');
		this.buttonsCanvas = document.getElementById("buttonsCanvas");
		this.checking = false;
		this.buttonResa = document.getElementById("buttonResa");
		this.go = false;
		this.interval = 0;
		this.interval2 = 0;
		this.reservation = document.getElementById("reservation");
		this.textResa = document.getElementById("textResa");
		this.superlaser = document.getElementById("superlaser");
		this.hope = document.getElementById("hope");
		this.failed = document.getElementById("failed");
		this.mn = 19;
		this.sec = 59;
		this.buttonClearSession = document.getElementById("clearSession");
		this.checkSec = false;
		this.checkMn = false;
		this.station = document.getElementById("station");
		this.addressStationResa = document.getElementById("addressStationResa");
	}
	check() {
		// Au click de la souris dans le canvas, check si le canvas est signé avec le booléen this.checking :
		this.canvas.addEventListener("mousedown", (event) => {
			this.checking = true;
		})
		// Au click du bouton "Reserver" du canvas, check si "dispoStation" dans sessionStorage est "rempli", si non >>> ligne 37
		this.buttonResa.addEventListener("click", (event) => {
			if (sessionStorage.getItem("dispoStation") < 1) {
				compteur.canvas.style.display = "none";
				this.buttonsCanvas.style.display = "none";
			}
			// >>> Affiche une alert pour obliger à signer le canvas : 
			if (this.checking === false) {
				alert("Vous devez signer afin de valider votre réservation ;)");
			} else {
				// Si le canvas est signé, lance tous les elements necessaires et lance le 1er superlaser :
				this.canvas.style.display ="none";
				this.buttonsCanvas.style.display = "none";
				clearInterval(this.interval);
				clearInterval(this.interval2);
				this.mn = 19;
				this.sec = 59;
				this.interval = setInterval(() => {this.superlaseR()}, 1000);
				this.reservation.style.display = "block";
				this.textResa.style.display = "block";
				this.superlaser.style.display = "block";
				this.superlaser.style.background = "rgba(0, 255, 0, 0.8)";
				this.failed.style.display = "none";
				this.textResa.style.textDecoration = "none";
				document.getElementById("station").innerHTML = sessionStorage.getItem("nameStation");
				document.getElementById("addressStationResa").innerHTML = sessionStorage.getItem("addressStation");
				console.log("pouet");
			}
		})	
		// Si le compteur meurt, vide sessionStorage et cache le bloc reservation :
		if (this.mn === 0 && this.sec === 0) {
			sessionStorage.clear();
			this.reservation.style.display = "none";
			console.log("clear");
		}
		// Si le sessionStorage.go est true, c'est qu'il y a refresh de la page, alors lancement du superlaser2, et relance du bloc reservation :
		if (sessionStorage.go === "true") {
			console.log("yes");
			this.interval2 = setInterval(() => {this.superlaser2()}, 1000);	
			console.log("superlaser2");
			this.reservation.style.display = "block";
			this.superlaser.style.display = "block";
			this.superlaser.innerHTML = sessionStorage.getItem("minutes") + " : " + sessionStorage.getItem("secondes");
		}
	}
	superlaseR() {
		// lancement du premier compte à rebours et des ses conditions, go devient true pour detecter un refresh
		// et invocation de DarthVader en cas d'appui du bouton "Tout annuler" :
		console.log("superlaser go go go");
		sessionStorage.setItem("go", true);
		sessionStorage.setItem("minutes", this.mn);
		sessionStorage.setItem("secondes", this.sec);
		if (this.sec === 0) {
				this.sec = 59; 
				this.mn --;
			} else { 
				this.sec--;
			}
		this.superlaser.innerHTML = sessionStorage.getItem("minutes") + " : " + sessionStorage.getItem("secondes");
		if (this.mn === 0 && this.sec === 0) {
			sessionStorage.clear();
			clearInterval(this.interval);
			this.textResa.style.textDecoration = "line-through";
			this.hope.style.display = "none";
			this.failed.style.display = "block";
			this.failed.style.margin = "25px 0px 0px 0px";
			this.superlaser.style.background = "rgba(255, 0, 0, 0.8)";
			console.log("S U P E R L A S E R");		
			this.superlaser.innerHTML =  " 00 : 00 ";
			this.mn = 20;
			this.sec = 0;
			this.station.style.display = "none";
			this.addressStationResa.style.display = "none";
		}
		this.darthVader();
	}
	superlaser2() {
		// Si refresh de la page, lancement de superlaser2 avec recuperation de mn et sec :
		console.log("superlaser2 go go go !");
		this.mn = sessionStorage.getItem("minutes");
		this.sec = sessionStorage.getItem("secondes");
		if (this.mn === "0" && this.sec === "0") {
			sessionStorage.clear();
			clearInterval(this.interval);
			this.textResa.style.textDecoration = "line-through";
			this.hope.style.display = "none";
			this.failed.style.display = "block";
			this.failed.style.margin = "25px 0px 0px 0px";
			this.superlaser.style.background = "rgba(255, 0, 0, 0.8)";
			console.log("S U P E R L A S E R 2");	
			this.superlaser.innerHTML =  " 00 : 00 ";
		} else {
			if (this.sec === "0") {
				this.sec = 59; 
				this.mn --;
			} else { 
				this.sec--;
			}
		}
		sessionStorage.setItem("minutes", this.mn);
		sessionStorage.setItem("secondes", this.sec);
		this.superlaser.innerHTML = this.mn + " : " + this.sec;
		this.darthVader();	
	}
	darthVader() {
		// Destruction de tous les elements necessaires à une reservation, et relance en backstage des elements necessaires à une nouvelle résa :
		this.buttonClearSession.addEventListener("click", (event) => {
			sessionStorage.clear();
			clearInterval(this.interval);
			clearInterval(this.interval2);
			console.log("kill");
			this.reservation.style.display = "none";
			this.canvas.style.display = "none";
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.buttonsCanvas.style.display = "none";
			document.getElementById("nameStation").innerHTML = "Nom : ";
            document.getElementById("addressStation").innerHTML = "Adresse : ";
            document.getElementById("dispoStation").innerHTML = "Vélos disponibles : ";
            document.getElementById("placeStation").innerHTML = "Emplacements disponibles : ";
            document.getElementById("statusStation").innerHTML = "Etat de la station : ";
            this.checking = false;
            this.mn = 19;
            this.sec = 59;
            this.textResa.style.textDecoration = "none";
			this.hope.style.display = "block";
			this.failed.style.display = "none";
			this.superlaser.style.background = "rgba(0, 255, 0, 0.8)";
		})
	}
}

const compteur = new Compteur();

compteur.check();





