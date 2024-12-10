const nombre_minimum = document.getElementById("nb_min");
const nombre_maximum = document.getElementById("nb_max");
const tries_champ = document.getElementById("tries_champ");
const userinput = document.getElementById("user-input");
const startgame = document.getElementById("start-game");
const found_numbers = document.getElementById("found_nbs");
let last_tries = document.getElementById("try_lasting");
const lb_guess = document.getElementById("lb-guess");
const input_result = document.getElementById("result_input")
const result_sent = document.getElementById("send_result")

let launching = true;
let nbs_founds = []
let attempts;

let random_number;
function manage_game() {
    if (nombre_maximum.value == 0 || tries_champ.value == 0) {
        alert("Merci de bien remplir tout les champs.");
    } else if(tries_champ.value > 20){
        alert("Vous avez le droit à 20 essais maximum.")
        tries_champ.value = 0
    }
    else if(startgame.textContent === "Arrêter la partie"){
        resetGame()
    }
    else if (launching) {
        newGame()
    }
}

function noneLabels() {
    const labels = document.querySelectorAll("div#guess_tn_base > label");
    labels.forEach((label) => {
        label.style.display = "none";
    });
}

function newGame() {
    launching = false // Finir le côté "launcher" et démarrer le côté "game"

    nombre_maximum.style.display = "none"; // Plus afficher le choix du nombre max
    nombre_minimum.style.display = "none"; // Plus afficher le choix du nombre min
    noneLabels() // Utiliser la fonction qui va cacher tout les labels
    tries_champ.style.display = "none"; // Plus afficher le choix du nombre d'essais

    startgame.style.backgroundColor = "red"; // Changer la couleur du backgroudn du bouton en rouge
    startgame.innerHTML = "Arrêter la partie"; // Changer le texte du bouton en "Arrêter la partie"

    attempts = tries_champ.value
    userinput.style.display = "block"; // Afficher le champ d'entrée des nombres
    lb_guess.style.display = "block"; // Afficher le label "Devine le nombre"

    input_result.style.display = "block"

    last_tries.style.display = "block"; 
    last_tries.textContent = `Il vous reste : ${attempts} essais !  `

    found_numbers.style.display = "block"
    found_numbers.textContent = `Les nombres trouvés sont : ${nbs_founds}`

    result_sent.style.display = "block"

    input_result.style.display = "block"

    random_number = Math.floor(Math.random() * (parseInt(nombre_maximum.value) - parseInt(nombre_minimum.value) + 1)) + parseInt(nombre_minimum.value);
    console.log(random_number)
}

function resetGame() {
    launching = true; // Réinitialiser l'état du jeu

    // Afficher les champs de configuration
    nombre_maximum.style.display = "block";
    nombre_minimum.style.display = "block";
    tries_champ.style.display = "block";

    // Réinitialiser le bouton de démarrage
    startgame.textContent = "Démarrer la partie";
    startgame.style.backgroundColor = "green";

    // Masquer les éléments de jeu
    found_numbers.style.display = "none";
    found_numbers.textContent = `Les nombres trouvés sont : ${nbs_founds}`;

    result_sent.style.display = "none";
    input_result.style.display = "none";

    attempts = tries_champ.value;
    userinput.style.display = "none"; // Masquer le champ d'entrée des nombres
    userinput.value = ""; // Réinitialiser l'entrée utilisateur
    userinput.removeAttribute("disabled"); // Réactiver le champ d'entrée

    lb_guess.style.display = "none"; // Masquer le label "Devine le nombre"
    last_tries.style.display = "none"; // Masquer les essais restants
    input_result.textContent = ""; // Effacer le résultat précédent

    nbs_founds = []; // Réinitialiser les nombres essayés
    resetLabels(); // Réafficher les labels masqués
    nombre_minimum.value = 0
    nombre_maximum.value = 0
    lb_guess.style.display = "none"
    tries_champ.value = 0
}

function resetLabels(){
    const labels = document.querySelectorAll("div#guess_tn_base > label");
    labels.forEach((label) => {
        label.style.display = "block";
    });
}
function verifResult() {
    const userGuess = parseInt(userinput.value);
    // Vérifier si l'entrée est un nombre valide
    if (isNaN(userGuess) || userinput.value.trim() === "") {
        alert("Veuillez entrer un nombre valide à deviner.");
        return;
    }

    // Vérifier si le nombre est en dehors des bornes
    const min = parseInt(nombre_minimum.value);
    const max = parseInt(nombre_maximum.value);
    if (userGuess < min || userGuess > max) {
        input_result.textContent = `Veuillez entrer un nombre entre ${min} et ${max}.`;
        input_result.style.color = "red";
        return;
    }

    // Comparer le nombre entré avec le nombre à deviner
    if (userGuess < random_number) {
        input_result.textContent = "Le nombre entré est inférieur au nombre à deviner.";
        input_result.style.color = "red";
    } else if (userGuess > random_number) {
        input_result.textContent = "Le nombre entré est supérieur au nombre à deviner.";
        input_result.style.color = "red";
    } else {
        input_result.textContent = "Félicitations ! Vous avez deviné le nombre.";
        input_result.style.color = "green";
        userinput.setAttribute("disabled", true);
        result_sent.setAttribute("disabled", true);
        return; // Fin de la fonction si le nombre est deviné
    }

    // Réduire le nombre d'essais restants
    attempts -= 1;
    last_tries.textContent = `Il vous reste : ${attempts} essais.`;
    nbs_founds.push(userGuess)
    found_numbers.textContent = `Les nombres essayés sont : ${nbs_founds}`

    // Vérifier si les tentatives sont épuisées
    if (attempts === 0) {
        input_result.textContent = `Vous avez atteint le nombre maximum d'essais. Le nombre était : ${random_number}.`;
        input_result.style.color = "red";
        userinput.setAttribute("disabled", true);
        result_sent.setAttribute("disabled", true);
    }
}


