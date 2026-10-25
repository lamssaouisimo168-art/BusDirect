const formulaire = document.getElementById("Réserver");
const nomPassager = document.getElementById("name");
const seatSelect = document.getElementById("seat-number");
function afficherMessage(texte, couleur) {
    let message = document.getElementById("message");

    message.textContent = texte;
    message.className = "fixed bottom-5 right-5 bg-white shadow-lg rounded-xl p-4 font-bold " + couleur;

    setTimeout(function() {
        message.textContent = "";
    }, 3000);
}

console.log(formulaire)

formulaire.addEventListener("submit" , function(event){
    event.preventDefault();;
    let nom = nomPassager.value;
    let siege = seatSelect.value;



let place = document.querySelector(`[data-seat="` + siege + `"]`);

if(place.classList.contains("bg-red-500")){
 afficherMessage("Siège déjà occupé !", "text-red-600");
return;
}
place.classList.remove("bg-green-400");
place.classList.add("bg-red-500");
 afficherMessage("Réservation réussie !", "text-green-600");
});