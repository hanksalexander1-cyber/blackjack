

let suits = ["spades", "diamonds", "clubs", "hearts"]

let ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13]

dealerAbove21 = false;
playerAbove21 = false;


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
        if (this.flipped == true) {
            this.#element.src = this.image_path;
            destination.appendChild(this.#element);
        } else {
            this.#element.src = "cards/back of card.png";
            destination.appendChild(this.#element);
        }
        
    }

    setflip() {
        if (this.flipped != true) {
            this.#flipped = true
        } else{
            this.#flipped = false
        }
    }

    get flipped() {
        return this.#flipped;
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

function above21() {
    if (dealerTotal > 21) {
        dealerAbove21 = true;
        // document.getElementById("dealerTotal").innerText = dealerTotal;
        window.alert("Dealer is above 21");
    }
    if (cardTotal > 21) {
        playerAbove21 = true;
        document.getElementById("cardTotal").innerText = cardTotal;
        window.alert("Player is above 21");
    }
    return false;
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


function reflip(deck) {
    for (let card of deck) {
        if (card.flipped == true) {
            card.setflip();
        }
    }
}

function dealToDealer(deck) {
    if (i >= 1 ) {deck[i].setflip()}
    deck[i].appendIt(document.getElementById("dealer-deck"))
    dealerTotal += deck[i].value;
    i += 1;
}




function shuffle(deck) {
    for (let i = 0; i < 200; i ++) {
        let card1 = Math.floor(Math.random() * deck.length);
        let card2 = Math.floor(Math.random() * deck.length);
        [deck[card1], deck[card2]] = [deck[card2], deck[card1]]
    }
    reflip(deck);
    return deck
}

function dealToPlayer(deck) {
    deck[i].appendIt(document.getElementById("player-deck"))
    cardTotal += deck[i].value;
    i += 1;
}

// function replaceImages (deck, destination) {
//     document.getElementById("card-container").replaceChildren();
//     for (let card of deck) {
//         card.appendIt(`${destination}`);
//     }
// }

let cardTotal = 0
let dealerTotal = 0
let i = 0

//main Game Segment 

document.getElementById("shuffle").addEventListener("click", () => {
    //dealing with the initiation of the game from shuffle

    cardTotal = 0;
    dealerTotal = 0;
    i = 0;
    shuffle(deck);
    
    document.getElementById("player-deck").replaceChildren();
    document.getElementById("dealer-deck").replaceChildren();
    
    dealToPlayer(deck);
    dealToDealer(deck);

    

    document.getElementById("dealerTotal").innerText = dealerTotal;
    document.getElementById("cardTotal").innerText = cardTotal;
 })


document.getElementById("hit").addEventListener("click", () => {
    dealToPlayer(deck);
    document.getElementById("cardTotal").innerText = cardTotal;
    above21();
    
})

let dealerTurn = true;
document.getElementById("stand").addEventListener("click", () => {
    while (dealerTotal < 17) {
        dealToDealer(deck);
    }
    document.getElementById("dealerTotal").innerText = dealerTotal;
    dealerTurn = false;
    
    above21();
    document.getElementById("dealerTotal").innerText = dealerTotal;
    window.alert("Dealer is above 21");
}) 


