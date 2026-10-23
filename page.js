
const totalplaces = 20;
const totalamount = 1600;

const board = document.getElementById("board");
const seatSelect = document.getElementById("seat-number");
const newSeatSelect = document.getElementById("new-seat");
const canceling = document.getElementById("canceling");
const sieges = board.querySelectorAll("div");
const nomPassager = document.getElementById("name");
const formulaire = document.getElementById("Réserver");
const compteur = document.getElementById("totalplaces");
const recette = document.getElementById("totalamount");
const prixTicket = 80;
const passengerEdit = document.getElementById("passenger-edit");
const passengerDelete = document.getElementById("passenger-delete");
const newName = document.getElementById("new-name");
const newSeat = document.getElementById("new-seat");
const formulaireModifier = document.getElementById("Modifier");
let reservations = [];


function updateStats() {
    const libres = 20 - reservations.length;
    const total = reservations.length * prixTicket;

    compteur.textContent = libres + " / 20";
    recette.textContent = total + " DH";
}
updateStats();






formulaire.addEventListener("submit", function(event) {
    event.preventDefault();

    let nom = nomPassager.value.trim();
    let siege = seatSelect.value || sieges.find(s => !s.classList.contains("bg-red-500"))?.dataset.seat;

    if (!nom || !siege) return alert("Nom obligatoire ou aucun siège libre");
    if (reservations.some(r => r.nom.toLowerCase() === nom.toLowerCase())) return alert("Passager déjà réservé");
    if (reservations.some(r => r.siege === Number(siege))) return alert("Siège déjà occupé");

    reservations.push({ nom: nom, siege: Number(siege) });

    passengerEdit.add(new Option(nom, nom));
    passengerDelete.add(new Option(nom, nom));

    sieges[Number(siege) - 1].classList.replace("bg-green-400", "bg-red-500");
    updateStats();
    nomPassager.value = "";
    seatSelect.value = "";
});


passengerEdit.addEventListener("change", function() {
    const reservation = reservations.find(function(r) {
        return r.nom === passengerEdit.value;
    });

    if (reservation) {
        newName.value = reservation.nom;
        newSeat.value = reservation.siege;
    }
});

formulaireModifier.addEventListener("submit", function(event){
    event.preventDefault();

    const reservation = reservations.find(function(r){
        return r.nom === passengerEdit.value;
    });

    if(!reservation) return alert("choisir un passager");

    const nom = newName.value.trim();
    const siege = newSeat.value ? Number(newSeat.value) : reservation.siege;

    if (nom && reservations.some(r => r !== reservation && r.nom.toLowerCase() === nom.toLowerCase())) {
        return alert("Passager déjà réservé");
    }

    if (reservations.some(r => r !== reservation && r.siege === siege)) {
        return alert("Siège déjà occupé");
    }

    const ancienSiege = reservation.siege;

    if(nom){
        reservation.nom = nom;
    }

    reservation.siege = siege;

    sieges[ancienSiege - 1].classList.replace("bg-red-500", "bg-green-400");
    sieges[siege - 1].classList.replace("bg-green-400", "bg-red-500");

    passengerEdit.options[passengerEdit.selectedIndex].text = reservation.nom;
    passengerEdit.options[passengerEdit.selectedIndex].value = reservation.nom;
    passengerDelete.options[passengerDelete.selectedIndex]?.remove();

    passengerDelete.add(new Option(reservation.nom, reservation.nom));

    updateStats();

    alert("Réservation modifiée ");
});