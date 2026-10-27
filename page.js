
const formulaire = document.getElementById("Réserver");
const nomPassager = document.getElementById("name");
const seatSelect = document.getElementById("seat-number");
const message = document.getElementById("message");
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
function sauvegarderReservations(){
    localStorage.setItem("reservations", JSON.stringify(reservations));
}
formulaire.addEventListener("submit",function(event){
event.preventDefault();
let nom = nomPassager.value.trim();
let siege = seatSelect.value;

if(nom === ""){
message.textContent = "Entrer le nom du passager";
return;
}
for(let reservation of reservations){
if(reservation.nom.toLowerCase() === nom.toLowerCase()){
message.textContent = "Ce passager est déjà réservé";
return;
}
if(reservation.siege == siege && siege !== ""){
message.textContent = "Ce siège est déjà réservé";
return;
}}
if(siege === ""){
siege = 1;
while(reservations.find(function(reservation){
return reservation.siege == siege;
})){
siege++;
}}

if(siege > 20){
message.textContent = "Tous les sièges sont réservés";
return;
}

let place = document.querySelector('[data-seat="' + siege + '"]');
if(!place) return;

reservations.push({nom: nom, siege: Number(siege)}
);
sauvegarderReservations();

place.classList.remove("bg-green-400");
place.classList.add("bg-red-500");
place.textContent = "Siège " + siege + " " + nom;
message.textContent = "Réservation réussie";
setTimeout(function(){
message.textContent = "";
},3000);
afficherPassanger();
formulaire.reset();
});







const formModifier = document.getElementById("Modifier");
const ancienNom = document.getElementById("name2");
const nouveauNom = document.getElementById("new-name");
const nouveauSiege = document.getElementById("new-seat");

formModifier.addEventListener("submit",function(event){
event.preventDefault();
let trouve = false;

for(let reservation of reservations){
if(reservation.nom.toLowerCase() === ancienNom.value.trim().toLowerCase()){
let nom = nouveauNom.value.trim() || reservation.nom;
let siege = nouveauSiege.value || reservation.siege;

for(let autre of reservations){
if(autre !== reservation && autre.nom.toLowerCase() === nom.toLowerCase()){
message.textContent = "Ce nom existe déjà";
setTimeout(function(){message.textContent = "";},3000);
return;
}
if(autre !== reservation && autre.siege == siege){
message.textContent = "Ce siège est déjà réservé";
setTimeout(function(){message.textContent = "";},3000);
return;
}
}

let anciennePlace = document.querySelector('[data-seat="' + reservation.siege + '"]');
let nouvellePlace = document.querySelector('[data-seat="' + siege + '"]');

anciennePlace.classList.remove("bg-red-500");
anciennePlace.classList.add("bg-green-400");
anciennePlace.textContent = "Siège " + reservation.siege;

reservation.nom = nom;
reservation.siege = Number(siege);

nouvellePlace.classList.remove("bg-green-400");
nouvellePlace.classList.add("bg-red-500");
nouvellePlace.textContent = "Siège " + siege + " " + nom;

message.textContent = "Modification réussie";
setTimeout(function(){message.textContent = "";},3000);
formModifier.reset();
trouve = true;
break;
}
}

if(!trouve){
message.textContent = "Passager introuvable";
setTimeout(function(){message.textContent = "";},3000);
}
});


const formAnnuler = document.getElementById("Annuler");
const passangerAnnuler =document.getElementById("passenger-delete");
const messageModifier = document.getElementById("message");
const messageAnnuler = document.getElementById("message");


function afficherPassanger(){
    ancienNom.innerHTML = '<option value ="">choisir un passager</option>';
    passangerAnnuler.innerHTML = '<option value="">Sélectionner un passager</option>';

    for(let reservation of reservations){
        let option = document.createElement("option");
        option.value = reservation.nom;
        option.textContent = reservation.nom;
        ancienNom.appendChild(option);

        let option2 = document.createElement("option");
        option2.value = reservation.nom;
        option2.textContent = reservation.nom;
        passangerAnnuler.appendChild(option2); 
    }
}
afficherPassanger()



formAnnuler.addEventListener("submit",function(event){
    event.preventDefault();
    let nom= passangerAnnuler.value;
    let index = reservations.findIndex(function(reservation){
        return reservation.nom===nom;
    });
    if(index ===-1){
        message.textContent = "choisir un passager";
        setTimeout(function(){message.textContent="";},3000);
        return;
    }
    let siege = reservations[index].siege;
    reservations.splice(index,1);
    let place= document.querySelector('[data-seat="' + siege + '"]');
    place.classList.remove("bg-red-500");
    place.classList.add("bg-green-400");
    place.textContent="siège "+ siege;
    message.textContent = "Ticket supprimé";
    afficherPassanger();
    formAnnuler.reset();
    setTimeout(function(){
        message.textContent = "";
    },3000);
});
