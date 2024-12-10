const numbersArray = [..."12345689"]
const capsArray = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
const nocapsArray = [..."abcdefhijklmnopqrstuvwxyz"]
const symbolsArray = [..."!@#$%^&*()_+{}[]<>?"]

let selectedChars =  []
selectedChars = selectedChars.concat(numbersArray)
selectedChars= selectedChars.concat(nocapsArray)
console.log(selectedChars)