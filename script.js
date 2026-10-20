

let suits = ["spades", "diamonds", "clubs", "hearts"]

let ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13]



class Card{
    #element;
    #flipped = false;
    constructor(val, suit){
        this.val = val;
        this.suit = suit;
        this.#element  = document.createElement('img');
        this.#element.src = this.image_path;
        
    }

    appendIt(destination) {
        destination.appendChild(this.#element);
    }

    get value(){
        if(this.real_name == "ace"){
            return 11;
        }else if(["J", "Q", "K"].includes(this.real_name)){
            return 10;
        }else{
            return Number(this.val)
        }
    }
    get image_path(){
        return `/cards/${this.real_name} ${this.suit}.png`
    }
    get real_name(){
        switch (this.val) {
            case 1:
                return "ace"
            case 11:
                return "J"
            case 12:
                return "Q"
            case 13:
                return "K"
            default:
                return this.val;
        }
    }
}




let deck = [];
    for(let suit of suits){
        for(let rank of ranks) {
            deck.push(new Card(rank, suit)) 
        }
    }


for(let card of deck){
    console.log(card, card.real_name, card.suit, card.rank)

    //card.append();
}








function shuffle(deck) {
    for (let i = 0; i < 200; i ++) {
        let card1 = Math.floor(Math.random() * deck.length);
        let card2 = Math.floor(Math.random() * deck.length);
        [deck[card1], deck[card2]] = [deck[card2], deck[card1]]
    }
    return deck
}

// function replaceImages (deck, destination) {
//     document.getElementById("card-container").replaceChildren();
//     for (let card of deck) {
//         card.appendIt(`${destination}`);
//     }
// }

let cardTotal = 0
let dealerTotal = 0

//main Game Segment 

document.getElementById("shuffle").addEventListener("click", () => {
    //dealing with the initiation of the game from shuffle
    cardTotal = 0;
    dealerTotal = 0;
    let i = 0
    shuffle(deck);
    document.getElementById("player-deck").replaceChildren();
    for (i; i != 2; i += 1) {
    if (i = 1) {
        deck[i].appendIt(document.getElementById("player-deck"))
    } else {
        //need to finish this
    }
    
    cardTotal += deck[i].value;
    }
    for (i; i != 4; i += 1) {
        deck[i].appendIt(document.getElementById("dealer-deck"))
        dealerTotal += deck[i].value;
    }
    document.getElementById("dealerTotal").innerText = dealerTotal;
    document.getElementById("cardTotal").innerText = cardTotal;
 })



