"use strict"

createItem("card_holder", CONTAINER(false), {
	loc:"nowhere"
})

createItem("blank_playing_card", TAKEABLE(), {
	loc: "card_holder",	
})

createItem("empty_deck", CONTAINER(false), {
	loc:"nowhere",
	
})

w.empty_deck.examine = function() {
		msg("An ordinary deck of cards. ")
		if (this.usedDeck){
			let cardsInIt = this.listContents()
			msg("The deck currently contains: ")
			msg(cardsInIt)
		}
}

function getCardVal(rank, suit, aceLow=false, ...args){
	let val
	if (parseInt(rank)){
		val = parseInt(rank)
	}else{
		switch (rank[0].toUpperCase()){
			case "J":
			case "Q":
			case "K":
				val = 10
				break
			case "A":
				if (aceLow){
					val = 1
				}else{
					val = 11
				}
				break
			default:
				errormsg("FUNCT getCardVal:  Could not find card rank: " + rank)
		}
	}
	return val
}

function getCardImage(rank, suit, size=100){
	let regx = /(king|queen|jack|ace)/i
	if (regx.test(rank)) {
		rank = rank[0].toLowerCase()
	}
	return Poker.getCardImage(size, suit,rank).outerHTML
	//return Poker.getCardCanvas(size, suit, rank).outerHTML
}

function getCardBack(size=100, foregroundColor="white", backgroundColor="red"){
	return Poker.getBackImage(size,foregroundColor,backgroundColor).outerHTML
}

function cloneCardDeck(deckName="deck_of_cards", loc=game.player.name, size=100, fgColor="white", bgColor="red"){
	let newDeck = cloneObject(w.empty_deck, loc, deckName)
	newDeck.fgColor = fgColor
	newDeck.bgColor = bgColor
	newDeck.backImg = getCardBack(size,fgColor,bgColor)
	let rgx = new RegExp('_', 'g')
	newDeck.alias = newDeck.name.replace(rgx, ' ')
	//log(newDeck)
	let deck = new Deck().cards
	newDeck.deck = deck
	deck.forEach(card => {
		let newCard = cloneObject(w.blank_playing_card, newDeck.name, card.name.replace(/ /g, '_'))
		newCard.alias = card.name
		newCard.rank = card.value.toLowerCase()
		newCard.suit = card.suit
		newCard.examine = "The " + newCard.alias + "."
		newCard.backImg = newDeck.backImg
		newCard.img = getCardImage( newCard.rank, newCard.suit, size)
		newCard.scenery = true
		newCard.deck = newDeck
	})
	newDeck.itemDropped = function (item)  {
		item.scenery = false
	}
	newDeck.itemTaken = function (item) {
		item.scenery = true
	}
}

function shuffleDeck(deck){ //UNTESTED
	for (let i = deck.length - 1; i > 0; i--){
		const newIndex = Math.floor(Math.random() * (i + 1))
		const oldValue = deck[newIndex]
		deck[newIndex] = deck[i]
		deck[i] = oldValue
	}
}

//--
//const SUITS = ["&hearts;","&diams;","&clubs;","&spades;"]
//const SUITS = ["♥","♦","♣","♠"]  //same as line above, just copied and pasted the HTML output

const SUITS = ["hearts","diamonds","clubs","spades"]
const VALUES = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"]

class Deck {
	constructor(cards = freshDeck()){
		this.cards = cards
	}
	get numberOfCards() {
		return this.cards.length
	}
	pop() {
		return this.cards.shift()
	}
	push(card) {
		this.cards.push(card)
	}
	shuffle() {
		for (let i = this.numberOfCards - 1; i > 0; i--){
			const newIndex = Math.floor(Math.random() * (i + 1))
			const oldValue = this.cards[newIndex]
			this.cards[newIndex] = this.cards[i]
			this.cards[i] = oldValue
		}
	}
}

class Card {
	constructor(suit,value){
		this.suit = suit
		this.value = value
		this.rank = value
		this.name = value + " of " +  suit
	}
	get color() {
		return this.suit === "clubs" || this.suit === "spades" ? "black" : "red"
	}
	getHTML() {
		const cardDiv = document.createElement("div")
		cardDiv.innerText = this.suit
		cardDiv.classList.add("card", this.color)
		cardDiv.dataset.value = `${this.value} ${this.suit}`
		return cardDiv
	}
}

function freshDeck(){
	return SUITS.flatMap(suit => { // flatMap is same as map, but combines into one single array
		return VALUES.map(value => {
			return new Card(suit, value)
		})
	})
}


//createItem("deck", TAKEABLE(), CONTAINER(false), {
	//loc:"nowhere",
	//suits: {
		//hearts: 13,
		//clubs: 13,
		//diamonds: 13,
		//spades: 13
	//},
	//cardsInDeck() {
		//return this.suits.hearts + this.suits.clubs + this.suits.diamonds + this.suits.spades
	//},
	//ranks: ["2","3","4","5","6","7","8","9","10","J","Q","K","A"],
	//faceCards: {
		//jack: ["hearts","diamonds","clubs","spades"], // TODo - Break these and ranks down in to objects for each suit?
		//queen: ["hearts","diamonds","clubs","spades"],
		//king: ["hearts","diamonds","clubs","spades"],
		//val:10
	//},
	//ace: {
		//low:false,
		//getVal() {
			//return (this.ace.low) ? 1 : 11
		//},
		//suits: ["hearts","diamonds","clubs","spades"]
	//},
	//faceCardProbability() {
		//return 12/52 //TODO - Use a return function that actually calculates this.
	//},
	//redProbability() {
		//return 26/52 //TODO - Use a return function that actually calculates this.
	//},
	//blackProbability() {
		//return (this.cardsInDeck() - this.redProbability() * this.cardsInDeck()) / this.cardsInDeck()
	//},
//})
