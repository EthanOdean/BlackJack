const GameState = createEnum(['betting', 'p-turn', 'd-turn']);
let ButtonOn = true

let deck = {
    cards : [
        {'img': 'AS.png', 'value': 11, type: 'ace', suit: 'spades'},
        {'img': 'AH.png', 'value': 11, type: 'ace', suit: 'hearts'},
        {'img': 'AD.png', 'value': 11, type: 'ace', suit: 'diamonds'},
        {'img': 'AC.png', 'value': 11, type: 'ace', suit: 'clubs'},

        {'img': '2S.png', 'value': 2, type: '2', suit: 'spades'},
        {'img': '2H.png', 'value': 2, type: '2', suit: 'hearts'},
        {'img': '2D.png', 'value': 2, type: '2', suit: 'diamonds'},
        {'img': '2C.png', 'value': 2, type: '2', suit: 'clubs'},

        {'img': '3S.png', 'value': 3, type: '3', suit: 'spades'},
        {'img': '3H.png', 'value': 3, type: '3', suit: 'hearts'},
        {'img': '3D.png', 'value': 3, type: '3', suit: 'diamonds'},
        {'img': '3C.png', 'value': 3, type: '3', suit: 'clubs'},

        {'img': '4S.png', 'value': 4, type: '4', suit: 'spades'},
        {'img': '4H.png', 'value': 4, type: '4', suit: 'hearts'},
        {'img': '4D.png', 'value': 4, type: '4', suit: 'diamonds'},
        {'img': '4C.png', 'value': 4, type: '4', suit: 'clubs'},

        {'img': '5S.png', 'value': 5, type: '5', suit: 'spades'},
        {'img': '5H.png', 'value': 5, type: '5', suit: 'hearts'},
        {'img': '5D.png', 'value': 5, type: '5', suit: 'diamonds'},
        {'img': '5C.png', 'value': 5, type: '5', suit: 'clubs'},

        {'img': '6S.png', 'value': 6, type: '6', suit: 'spades'},
        {'img': '6H.png', 'value': 6, type: '6', suit: 'hearts'},
        {'img': '6D.png', 'value': 6, type: '6', suit: 'diamonds'},
        {'img': '6C.png', 'value': 6, type: '6', suit: 'clubs'},

        {'img': '7S.png', 'value': 7, type: '7', suit: 'spades'},
        {'img': '7H.png', 'value': 7, type: '7', suit: 'hearts'},
        {'img': '7D.png', 'value': 7, type: '7', suit: 'diamonds'},
        {'img': '7C.png', 'value': 7, type: '7', suit: 'clubs'},

        {'img': '8S.png', 'value': 8, type: '8', suit: 'spades'},
        {'img': '8H.png', 'value': 8, type: '8', suit: 'hearts'},
        {'img': '8D.png', 'value': 8, type: '8', suit: 'diamonds'},
        {'img': '8C.png', 'value': 8, type: '8', suit: 'clubs'},

        {'img': '9S.png', 'value': 9, type: '9', suit: 'spades'},
        {'img': '9H.png', 'value': 9, type: '9', suit: 'hearts'},
        {'img': '9D.png', 'value': 9, type: '9', suit: 'diamonds'},
        {'img': '9C.png', 'value': 9, type: '9', suit: 'clubs'},

        {'img': '10S.png', 'value': 10, type: '10', suit: 'spades'},
        {'img': '10H.png', 'value': 10, type: '10', suit: 'hearts'},
        {'img': '10D.png', 'value': 10, type: '10', suit: 'diamonds'},
        {'img': '10C.png', 'value': 10, type: '10', suit: 'clubs'},

        {'img': 'JS.png', 'value': 10, type: 'jack', suit: 'spades'},
        {'img': 'JH.png', 'value': 10, type: 'jack', suit: 'hearts'},
        {'img': 'JD.png', 'value': 10, type: 'jack', suit: 'diamonds'},
        {'img': 'JC.png', 'value': 10, type: 'jack', suit: 'clubs'},

        {'img': 'QS.png', 'value': 10, type: 'queen', suit: 'spades'},
        {'img': 'QH.png', 'value': 10, type: 'queen', suit: 'hearts'},
        {'img': 'QD.png', 'value': 10, type: 'queen', suit: 'diamonds'},
        {'img': 'QC.png', 'value': 10, type: 'queen', suit: 'clubs'},

        {'img': 'KS.png', 'value': 10, type: 'king', suit: 'spades'},
        {'img': 'KH.png', 'value': 10, type: 'king', suit: 'hearts'},
        {'img': 'KD.png', 'value': 10, type: 'king', suit: 'diamonds'},
        {'img': 'KC.png', 'value': 10, type: 'king', suit: 'clubs'}
    ],
    discard : [],
    drawCard : function () {
        if (this.cards.length === 0){
            this.reshuffle()
            alert("Out of cards. Reshuffling")
        }
        let rNum = Math.floor( Math.random() * this.cards.length );
        let ret = this.cards[rNum]
        this.cards.splice(rNum, 1)
        return ret
    },
    discardCard : function (card) {
        if(card.value === 1){
            card.value = 11
        }
        this.discard.push(card)
    },
    discardCards : function (hand) {
        let card = null
        while (hand.length > 0) {
            card = hand.pop()
            if(card.value === 1){
                card.value = 11
            }
            this.discard.push(card)
        }
    },
    reshuffle : function () {
        // while (this.discard.length > 0) {
        //     this.cards.push(this.discard.pop())
        // }
        let temp = this.cards
        this.cards = this.discard
        this.discard = temp
    }
}

let UI = {
    imgTop : {
        winner : ['9vh', '43vh'],
        loser : ['1vh', '35vh'],
        busted : ['12vh', '43vh'],
        blackJack : ['23vh', '52vh']
    },
    animatingCards : 0,
    updateGameState : function (gameState, player) {
        for (let gs in GameState){
            let elems = document.getElementsByClassName(`gs-${gs}`)
            let vis = "hidden"
            if (gs === gameState){
                vis = "visible"
            }
            for (let i = 0; i < elems.length; i ++) {
                elems[i].style.visibility = vis
            }
        }
        if (gameState === 'p-turn') {
            this.updateStatus(`Bet: ${player.bet} Click Stick or Hit to Continue`)
        } else if (gameState === 'd-turn') {
            this.updateStatus(`Player sticks at ${player.hand_points}`)
        }
    },
    updateStatus : function (msg) {
        document.getElementById("status1").innerText = msg
    },
    resetGame : function (player) {
        this.updateBet(player.bet)
        this.updateStatusTable(player)
        this.updateGameState('betting', player)
    },
    updateStatusTable : function (player) {
        document.getElementById("balance").innerText = String(player.balance)
        document.getElementById("num-games").innerText = String(player.games)
        document.getElementById("num-wins").innerText = String(player.wins)
        document.getElementById("num-losses").innerText = String(player.losses)
    },
    startRound : function (){
        document.getElementById("winner").style.display = 'none'
        document.getElementById("loser").style.display = 'none'
        document.getElementById("busted").style.display = 'none'
        document.getElementById("black-jack").style.display = 'none'
    },
    updateBet : function (bet) {
        document.getElementById("bet").innerText = String(bet)
    },
    betErrorMessage : function (msg){
        let e = document.getElementById("bet-error-msg")
        if (msg !== ''){
            e.innerText = msg
            e.style.visibility = 'visible'
        } else {
            e.style.visibility = 'hidden'
        }
    },
    dealCardAnimation : function (id) {
        ButtonOn = false
        this.animatingCards ++
        let item = document.getElementById(id)
        item.style.visibility = 'visible'
        let endTop = item.offsetTop
        item.style.left = `${window.innerWidth/2 - item.offsetWidth/2}px`
            //`${item.offsetLeft}`
        let top = -2 * item.offsetHeight
        item.style.top = `${top}px`
        item.style.position = 'absolute'
        let self = setInterval(()=>{
            item.style.top = (++top) + 'px'
            if (top >= endTop){
                clearInterval(self)
                item.style.position = 'static'
                if (--this.animatingCards <= 0){
                    ButtonOn = true
                }
            }
        }, 4)
    },
    dealCard : function (person, card) {
        document.getElementById(`${person}-cards`).innerHTML += `<img id='${card.img}' class='cardImg' src='img/${card.img}'  alt='card' />`;
        this.dealCardAnimation(card.img)
    },
    dealHand : function (person, hand, animate = true ) {
        let area = document.getElementById(`${person}-cards`)
        area.style.visibility = 'hidden'
        let cards = hand
        if (person === 'dealer'){
            cards = hand.showing
            if (hand.hidden != null){
                area.innerHTML += `<img id='${hand.hidden.img}' class='cardImg' src='img/purple_back.png'  alt='facedown card' />`;

                setTimeout(() => {
                    this.dealCardAnimation(hand.hidden.img)
                }, 500)
            }
        }
        let offset = 0
        if (person === 'dealer'){
            offset = 0.5
        }
        for (let i=0; i < cards.length; i++){
            area.innerHTML += `<img id='${cards[i].img}' class='cardImg' src='img/${cards[i].img}'  alt='card' />`;
            if(animate) {
                setTimeout(() => {
                    this.dealCardAnimation(cards[i].img)
                }, (++offset) * 1000)
            } else {
                setTimeout(()=>{
                    document.getElementById(cards[i].img).style.visibility = 'visible'
                }, 100)
            }
        }
        // area.innerHTML = oStr
        setTimeout(()=>{
            area.style.visibility = 'visible'
        }, 100)
    },
    emptyHand : function (person){
        document.getElementById(`${person}-cards`).innerHTML = ''
    },
    playerWin : function (blackjack){
        let win = document.getElementById("winner")
        win.style.top = this.imgTop.winner[1]
        win.style.display = 'block'
        let lose = document.getElementById("loser")
        lose.style.top = this.imgTop.loser[0]
        lose.style.display = 'block'
        if(blackjack){
            let bj = document.getElementById("black-jack")
            bj.style.top = this.imgTop.blackJack[1]
            bj.style.display = 'block'
            UI.updateStatus(`BLACKJACK! Player Wins 2x bet`)
        }else {
            UI.updateStatus(`Player Wins!`)
        }
    },
    dealerWin : function (blackjack, bust){
        let win = document.getElementById("winner")
        win.style.top = this.imgTop.winner[0]
        win.style.display = 'block'
        let lose = document.getElementById("loser")
        lose.style.top = this.imgTop.loser[1]
        lose.style.display = 'block'
        if(bust){
            document.getElementById("busted").style.display = 'block'
            UI.updateStatus(`Player Takes Hit ... and BUSTS!`)
        } else if (blackjack){
            let bj = document.getElementById("black-jack")
            bj.style.top = this.imgTop.blackJack[0]
            bj.style.display = 'block'
            UI.updateStatus(`Dealer Wins with Blackjack!`)
        } else {
            UI.updateStatus('Dealer wins by points')
        }
    },
    updatePlayerHit (num_hits) {
        document.getElementById("player-num-hits").innerText = num_hits
    },
    updateDealerHit (num_hits) {
        document.getElementById("dealer-num-hits").innerText = num_hits
    },
    updatePlayerPoints (points) {
        document.getElementById("player-hand-points").innerText = String(points)

    },
    updateDealerPoints (points) {
        document.getElementById("dealer-hand-points").innerText = String(points)
    },
    lostGame : function () {
        ButtonOn = false
        setTimeout(()=>{
            let msg = document.getElementById("failure")
            msg.style.display = 'block'
            let top = window.innerHeight
            msg.style.top = `${top}px`
            let self = setInterval(()=>{
                msg.style.top = top-- + 'px'
                if (top <= window.innerHeight/2 - msg.offsetHeight/2){
                    document.getElementById("refresh").style.display = 'block'
                    clearInterval(self)
                }
            }, 20)
        }, 2000)
        setTimeout(()=>{
            let msg2 = document.getElementById("failure2")
            msg2.style.display = 'block'
            let top = window.innerHeight
            msg2.style.top = `${top}px`
            let self = setInterval(()=>{
                msg2.style.top = top-- + 'px'
                if (top <= 0 - msg2.offsetHeight + window.innerHeight){
                    clearInterval(self)
                }
            }, 50)
        }, 60 * 1000)
    },
}

let Game = {
    game_state : 'betting',
     player : {
        balance : 1000,
        bet : 0,
        games : 0,
        wins : 0,
        losses : 0,
        hand_points : 0,
        num_hits : 0,
        hand : []
    },
    dealer : {
        hand_points : 0,
        num_hits : 0,
        hand : {
            hidden : null,
            showing : [],
        }
    },
    checkBet : function(bet){
        let ret = ''
        if (Number.isNaN(bet) || bet === ''){
            ret = 'Bet must be a number.'
        } else if (!Number.isInteger(Number(bet))) {
            ret = 'Bet must be a whole number.'
        }else {
            bet = Number.parseInt(bet)
            if (bet <= 0){
                ret = 'Bet must bet a positive amount.'
            } else if (bet > 500) {
                ret = 'Bet cannot bet more than 500'
            } else if (bet > this.player.balance) {
                ret = "Balance too low to place this bet"
            }
        }
        return ret
    },
    beginRound : function (d, ui){
        d.discardCards(this.emptyHands(ui.emptyHand))
        this.drawBeginningCards(d)
        this.resetRoundStatus()
        ui.dealHand('player', this.player.hand)
        setTimeout(()=>{
            ui.dealHand('dealer', this.dealer.hand)
        }, 3000)
        setTimeout(()=>{
            ui.updatePlayerPoints(this.player.hand_points)
            ui.updateDealerPoints(this.dealer.hand_points)
            let msg = this.checkForBlackJack()
            if (msg !== ''){
                if (msg === 'dealer'){
                    this.revealDealerCard(ui)
                }
                this.endRound(ui, msg === 'player', true, false)
            } else{
                ui.updateGameState('p-turn', this.player)
            }
        }, 5000)
    },
    drawBeginningCards : function (d){
        this.player.hand.push(d.drawCard())
        this.player.hand.push(d.drawCard())
        this.dealer.hand.showing.push(d.drawCard())
        this.dealer.hand.hidden = d.drawCard()
    },
    resetRoundStatus: function () {
        this.player.hand_points = this.player.hand[0].value + this.player.hand[1].value
        this.dealer.hand_points = this.dealer.hand.showing[0].value
        this.player.num_hits = 0
        this.dealer.num_hits = 0
    },
    checkForBlackJack : function (){
        if ((this.dealer.hand.showing[0].type === 'jack' && this.dealer.hand.hidden.type === 'ace') || 
            (this.dealer.hand.showing[0].type === 'ace' && this.dealer.hand.hidden.type === 'jack')){
            return 'dealer'
        } else if ((this.player.hand[0].type === 'jack' && this.player.hand[1].type === 'ace') ||
            (this.player.hand[0].type === 'ace' && this.player.hand[1].type === 'jack')) {
            return 'player'
        } else {
            return ''
        }
    },
    emptyHands : function (emptyHand) {
        let ret  = []
        while (this.player.hand.length > 0){
            ret.push(this.player.hand.pop())
        }
        while (this.dealer.hand.showing.length > 0){
            ret.push(this.dealer.hand.showing.pop())
        }
        if (this.dealer.hand.hidden != null){
            ret.push(this.dealer.hand.hidden)
            this.dealer.hand.hidden = null
        }
        emptyHand('player')
        emptyHand('dealer')
        return ret
    },
    endRound : function (ui, pWin, blackJack, bust){
        this.player.games++
        if (pWin){
            ui.playerWin(blackJack)
            this.player.wins++
            if (blackJack){
                this.player.balance += this.player.bet * 2
            } else {
                this.player.balance += this.player.bet
            }
        } else {
            ui.dealerWin(blackJack, bust)
            this.player.losses++
            this.player.balance -= this.player.bet
            if(this.player.balance <= 0 ){
                ui.lostGame()
            }
        }
        this.player.bet = 0
        ui.resetGame(this.player)
    },
    revealDealerCard: function (ui) {
        if (this.dealer.hand.hidden != null) {
            this.dealer.hand.showing.unshift(this.dealer.hand.hidden)
            ui.updateDealerPoints(this.dealer.hand_points += this.dealer.hand.hidden.value)
            this.dealer.hand.hidden = null;
            ui.emptyHand('dealer')
            ui.dealHand('dealer', this.dealer.hand, false)
        }
    },
    dealerHit : function (card) {
        this.dealer.hand.showing.push(card)
        this.dealer.num_hits++
        this.dealer.hand_points += card.value
    },
    playerHit : function (card) {
        this.player.hand.push(card)
        this.player.num_hits++
        this.player.hand_points += card.value
        if (this.player.hand_points > 21 && this.lowerAceValue(this.player.hand)){
            this.player.hand_points -= 10
        }
    },
    lowerAceValue : function (hand){
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].value === 11){
                hand[i].value = 1
                return true
            }
        }
        return false;
    }
}

function onLoad(){
    Game.game_state = "betting"
    UI.updateGameState("betting", Game.player)
    UI.resetGame(Game.player)
}

function startGame(){
    if(ButtonOn){
        let bet = document.getElementById("uBet").value
        let msg = Game.checkBet(bet)
        UI.betErrorMessage(msg)
        if (msg === ''){
            ButtonOn = false
            UI.updateBet(Game.player.bet = Number.parseInt(bet))
            UI.startRound()
            Game.beginRound(deck, UI)
        }
    }
}

function dealerTurn() {
    if(ButtonOn){
        if (Game.dealer.hand.hidden != null){
            Game.revealDealerCard(UI)
            UI.updateStatus(`Dealer Reveals Their Hidden Card`)
        } else if (Game.dealer.hand_points < 17) {
            let card = deck.drawCard()
            Game.dealerHit(card)
            UI.dealCard('dealer', card)
            UI.updateDealerPoints(Game.dealer.hand_points)
            UI.updateDealerHit(Game.dealer.num_hits)
            UI.updateStatus(`Dealer Plays Taking Hit ${Game.dealer.num_hits}.`)
        } else {
            Game.endRound(UI, (Game.player.hand_points <= 21 && (Game.dealer.hand_points < Game.player.hand_points || Game.dealer.hand_points > 21)),
                false, Game.player.hand_points > 21)
            UI.updateGameState("betting", Game.player);
        }
    }
}

function playerHit(){
    if(ButtonOn){
        let card = deck.drawCard()
        Game.playerHit(card)
        UI.dealCard('player', card)
        UI.updatePlayerPoints(Game.player.hand_points)
        UI.updatePlayerHit(Game.player.num_hits)
        if (Game.player.hand_points > 21) {
            ButtonOn = false
            setTimeout(()=>{
                Game.endRound(UI, false, false, true)
            }, 3000)
        } else {
            UI.updateStatus(`Player Takes Hit ${Game.player.num_hits}. Stick or Hit to Continue`)
        }
    }
}

function playerStick() {
    if (ButtonOn){
        UI.updateGameState("d-turn", Game.player);
    }
}

function createEnum(values) {
    const enumObject = {};
    for (const val of values) {
        enumObject[val] = val;
    }
    return Object.freeze(enumObject);
}

