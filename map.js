// Map Leaflet

// Invocation de la map Leaflet avec les coordonnées de Toulouse :
const mapOpen = L.map('mapid').setView([43.600000, 1.433333], 14); // <<< longitude et latitude de Toulouse
const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapOpen);

class Map {
	constructor() {
        this.responses;
        this.marker;
        this.button = document.getElementById("button");
        this.clicked = false;
        this.canvas = document.getElementById("canvas");
        this.buttonResa = document.getElementById("buttonResa");
        this.cancel = document.getElementById("cancel");
        this.buttonsCanvas = document.getElementById("buttonsCanvas");
        this.station = document.getElementById("station");
        this.mn = 20;
        this.sec = 0;
        this.cancelOtherResa = false;
	}
	askApi() {
        //Envoi de la requete, récuperation, et affichage des elements de la station concernée au clic de son marker :
  		const request = new XMLHttpRequest();
  		request.onreadystatechange = function() {
  			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                this.responses = JSON.parse(this.responseText);
                for (const response of this.responses) {
                    this.marker = L.marker([response.position.lat, response.position.lng]);
                    this.marker.addTo(mapOpen);
                    this.marker.addEventListener("click", () => {
                        // relance timer au cas ou nouvelle résa :
                        this.mn = 20;
                        this.sec = 0;
                        if (map.cancelOtherResa === false) {
                        // stocke nom station pour reservation
                        sessionStorage.setItem("nameStationResa", response.name);
                        console.log(sessionStorage.nameStationResa);
                        console.log(map.cancelOtherResa);
                        //stocke adresse reservation
                        sessionStorage.setItem("addressStationResa", response.address);
                        console.log(sessionStorage.addressStationResa);
                        }
                        // cache boutons canvas
                        map.buttonsCanvas.style.display = "none";
                        //cache canvas
                        canvas.canvas.style.display = "none";
                        // stocke booléen clicked
                        sessionStorage.setItem("clicked", true);
                        // stocke nom station
                        sessionStorage.setItem("nameStation", response.name);
                        //affiche nom station formulaire
                        document.getElementById("nameStation").innerHTML = "Nom : " + response.name;
                        // stocke adrresse
                        sessionStorage.setItem("addressStation", response.address);
                        // affiche adresse formulaire
                        document.getElementById("addressStation").innerHTML = "Adresse : " + response.address;
                        // affiche dispo formulaire
                        document.getElementById("dispoStation").innerHTML = "Vélos disponibles : " + response.available_bikes;
                        // stocke nombre
                        sessionStorage.setItem("dispoStation", response.available_bikes);
                        // affiche emplacements formulaire
                        document.getElementById("placeStation").innerHTML = "Emplacements disponibles : " + response.available_bike_stands;
                        // stocke emplacements 
                        sessionStorage.setItem("placeStation", response.available_bike_stands);
                        // affiche etat formulaire
                        document.getElementById("statusStation").innerHTML = "Etat de la station : " + response.status;
                        // stocke état
                        sessionStorage.setItem("statusStation", response.status);
                        // Si station sans vélo alert et cache button, sinon laisse button
                        if(response.available_bikes === 0) {
                            document.getElementById("statusStation").innerHTML = "Etat de la station : " + "Fermée"; 
                            alert("Cette station est actuellement fermée. Veuillez en choisir une autre ou retentez plus tard...");
                            canvas.button.style.display = "none";
                            console.log("0 !");
                        } else {
                            canvas.button.style.display = "block";
                        }
                    })
                    console.log(sessionStorage.length);
                }
            }  
     	};
        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=543c13664eb516f1b4ae38ca53849d9dff500d80");
        request.send();    
    }
    resa() {
        console.log(sessionStorage.length);
        // Au click de buttonResa cancelOtherResa est true
        this.buttonResa.addEventListener("click", () => {
            this.cancelOtherResa = true;
        })
        // Si rien dans sessionstorage, et cancelOtherResa est false n'affiche pas "null"
        if (this.cancelOtherResa === false && sessionStorage.length < 1) {
            console.log("null");
            document.getElementById("nameStation").innerHTML = "Nom : ";
            document.getElementById("addressStation").innerHTML = "Adresse : ";
            document.getElementById("dispoStation").innerHTML = "Vélos disponibles : ";
            document.getElementById("placeStation").innerHTML = "Emplacements disponibles : ";
            document.getElementById("statusStation").innerHTML = "Etat de la station : ";
        } 
        // Si elements dans sessionStorage, affiche les elememts avec les reponses de la requete dans formulaire et recupere 
        // et affiche infos reservation
        if (sessionStorage.length > 1 ) { 
        document.getElementById("nameStation").innerHTML = "Nom : " + sessionStorage.getItem("nameStation");
        document.getElementById("addressStation").innerHTML = "Adresse : " + sessionStorage.getItem("addressStation");
        document.getElementById("dispoStation").innerHTML = "Vélos disponibles : " + sessionStorage.getItem("dispoStation");
        document.getElementById("placeStation").innerHTML = "Emplacements disponibles : " + sessionStorage.getItem("placeStation");
        document.getElementById("statusStation").innerHTML = "Etat de la station : " + sessionStorage.getItem("statusStation");
        document.getElementById("station").innerHTML = sessionStorage.getItem("nameStationResa");
        document.getElementById("addressStationResa").innerHTML = sessionStorage.getItem("addressStationResa");
        }
        // Si cancelOtherResa est true ne modifie pas reservation :
        if (this.cancelOtherResa === true) { 
            document.getElementById("station").innerHTML = "";
            document.getElementById("addressStationResa").innerHTML = "";
        }
        this.button.addEventListener("click", () => {
            // Au click de button, véifie qu'une station a été sélectionnée, sinon alert :
            console.log(sessionStorage.clicked);
            if (sessionStorage.getItem("clicked") === "true") {
                console.log("station sélectionnée");   
            } else {
                alert("Veuillez sélectionner une station :)");  
                this.canvas.style.display = "none";
                this.buttonsCanvas.style.display = "none";
            }
        })
        this.askApi();
    }
}
const map = new Map();

// D'abord verifcation qu'une résa n'est pas en cours, puis askApi() :
map.resa();










