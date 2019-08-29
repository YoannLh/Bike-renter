//formulaire
class Formulaire {
	constructor() {
		this.prenom = document.getElementById("prenom");
		this.nom = document.getElementById("nom");
		this.button = document.getElementById("button");
		this.reservation = document.getElementById("reservation");
		this.canvas = document.getElementById("canvas");
		this.buttonResa = document.getElementById("buttonResa");
		this.cancel = document.getElementById("cancel");
		this.buttonsCanvas = document.getElementById("buttonsCanvas");	
	}
	spyRecord() {
		// Espionne remplissage du formulaire et stocke dans localStorage :
		this.nom.addEventListener('input', () => {
			localStorage.setItem("nom", this.nom.value);	
		})
		this.prenom.addEventListener("input", () => {
			localStorage.setItem("prenom", this.prenom.value);	
		})
		// Au click de button, check que les champs soient bien remplis :
		this.button.addEventListener("click", () => {
			// Si champ nom vide :
			if (this.nom.value === "") {
				alert("Veuillez renseigner votre nom :)");
				this.canvas.style.display = "none";
			} 
			// Si champ prénom vide :
			if (this.prenom.value === "") {
				alert("Veuillez renseigner votre prénom :)");
				this.canvas.style.display = "none;"
			} else {
				// Si champs remplis et station selectionnée, affiche canvas et ses boutons :
				console.log("station sélectionnée");
                this.canvas.style.display = "block";
                this.buttonResa.style.display = "block";
                this.cancel.style.display = "block";
                this.buttonsCanvas.style.display = "block";
                console.log("pop");
			}
		})
		this.save();
	}
	save() {
		// Affiche les données de localStorage dans le formulaire :
		this.nom.value = localStorage.getItem("nom");
		this.prenom.value = localStorage.getItem("prenom");
        console.log(localStorage.nom);
        console.log(localStorage.prenom);
        console.log(localStorage.length);		
	}
}
const formulaire = new Formulaire();

formulaire.spyRecord();

