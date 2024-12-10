const nocaps = document.getElementById("nocaps")
const caps = document.getElementById("caps")
const numbers = document.getElementById("numbers")
const symbols = document.getElementById("symbols")
const longueur = document.getElementById("len")

const gen_btn = document.getElementById("gen-btn")
const test_txt = document.getElementById("console-txt")
const mdp_champ = document.getElementById("input_pass")
const copy_btn = document.getElementById("copy-btn")

function gen_mdp(){

    if(longueur.value >= 20){
        alert("La limite est de 20 caractères.")
        longueur.value = 0
        return;
    }
    const numbersArray = [..."12345689"]
    const capsArray = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
    const nocapsArray = [..."abcdefhijklmnopqrstuvwxyz"]
    const symbolsArray = [..."!@#$%^&*()_+{}[]<>?"]

    let selectedChars = []
    if(numbers.checked) selectedChars = selectedChars.concat(numbersArray);
    if(caps.checked) selectedChars = selectedChars.concat(capsArray);
    if(nocaps.checked) selectedChars = selectedChars.concat(nocapsArray);
    if(symbols.checked) selectedChars = selectedChars.concat(symbolsArray)

    if(selectedChars.length == 0) {
        alert("Choisissez une option de mot de passe !");
        mdp_champ.value = ""
    }

    mdp_champ.value = ""
    
    if(selectedChars.length !== 0){
        for(let i = 0; i < longueur.value; i++){
            const rdmIndex = Math.floor(Math.random() * selectedChars.length)
            mdp_champ.value += selectedChars[rdmIndex]
        }
    }
}

gen_btn.addEventListener("click", () => {
    gen_mdp()
})


copy_btn.addEventListener("click", () => {
    if(mdp_champ.value.length >= 6 && mdp_champ.value.length <= 20){
        navigator.clipboard.writeText(mdp_champ.value)
        alert("Mot de passe copié avec succès.")
    } else {
        alert("Aucun mot de passe n'a été généré.")
    }
});


