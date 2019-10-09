import words from 'random-words';
// Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
export function computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.has(letter) ? letter : '_')
    );
}

// Renvoie true si le mot entier a été découvert
export function isFound(word, usedLetters) {
    for (let i = 0; i < word.length; i++) {
        if(!usedLetters.has(word.charAt(i))){
            return false;
        }
    }
    return true;
}

// Génère un mot aléatoire en majuscule
export function generateRandomWord(){
    return words().toUpperCase();
}

