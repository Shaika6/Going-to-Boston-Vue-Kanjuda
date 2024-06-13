new Vue({
    el: '#app',
    data: {
        p1Name: '',
        p2Name: '',
        totalrounds: 0,
        gameStarted: false,
        submitDisabled: false,
        firstButtonDisabled: true,
        rollDisabled: true,
        calcDisabled: true,
        showInstruction: false,
        firstInfo: '',
        currentRound: 0,
        player1RoundsWon: 0,
        player2RoundsWon: 0,
        turn: 1,
        dice1: 0,
        dice2: 0,
        dice3: 0,
        player1Score: 0,
        player2Score: 0,
        finalRollCount1: 0,
        finalRollCount2: 0,
        result: '',
    },
    methods: {
        submitRounds() {
            if (isNaN(this.totalrounds) || this.totalrounds <= 0) {
                document.getElementById('error').style.display = 'block';
            } else {
                document.getElementById('error').style.display = 'none';
                this.currentRound = 1;
                this.gameStarted = true;
                this.submitDisabled = true;
                this.firstButtonDisabled = false;
            }
        },
        decideFirst() {
            this.dice1 = Math.floor(Math.random() * 6) + 1;
            this.dice2 = Math.floor(Math.random() * 6) + 1;
            if (this.dice1 > this.dice2) {
                this.firstInfo = `${this.p1Name} goes first!`;
                this.turn = 1;
            } else if (this.dice2 > this.dice1) {
                this.firstInfo = `${this.p2Name} goes first!`;
                this.turn = 2;
            } else {
                this.firstInfo = 'Tie! Roll again.';
                return;
            }
            this.firstButtonDisabled = true;
            this.rollDisabled = false;
            this.showInstruction = true;
        },
        roll() {
            if (this.turn === 1) {
                this.dice1 = Math.floor(Math.random() * 6) + 1;
                this.dice2 = Math.floor(Math.random() * 6) + 1;
                this.dice3 = Math.floor(Math.random() * 6) + 1;
                this.finalRollCount1 = Math.max(this.dice1, this.dice2, this.dice3);
                this.turn = 2;
            } else {
                this.dice1 = Math.floor(Math.random() * 6) + 1;
                this.dice2 = Math.floor(Math.random() * 6) + 1;
                this.dice3 = Math.floor(Math.random() * 6) + 1;
                this.finalRollCount2 = Math.max(this.dice1, this.dice2, this.dice3);
                this.turn = 1;
                this.calculateScore();
            }
        },
        calculateScore() {
            if (this.finalRollCount1 > this.finalRollCount2) {
                this.player1RoundsWon++;
            } else if (this.finalRollCount2 > this.finalRollCount1) {
                this.player2RoundsWon++;
            }
            this.finalRollCount1 = 0;
            this.finalRollCount2 = 0;
            this.currentRound++;
            if (this.currentRound > this.totalrounds) {
                this.endGame();
            } else {
                this.rollDisabled = false;
            }
        },
        endGame() {
            if (this.player1RoundsWon > this.player2RoundsWon) {
                this.result = `${this.p1Name} wins!`;
            } else if (this.player2RoundsWon > this.player1RoundsWon) {
                this.result = `${this.p2Name} wins!`;
            } else {
                this.result = 'Tie!';
            }
            this.calcDisabled = true;
            this.rollDisabled = true;
        },
        replayGame() {
            this.p1Name = '';
            this.p2Name = '';
            this.totalrounds = 0;
            this.gameStarted = false;
            this.submitDisabled = false;
            this.firstButtonDisabled = true;
            this.rollDisabled = true;
            this.calcDisabled = true;
            this.showInstruction = false;
            this.firstInfo = '';
            this.currentRound = 0;
            this.player1RoundsWon = 0;
            this.player2RoundsWon = 0;
            this.turn = 1;
            this.dice1 = 0;
            this.dice2 = 0;
            this.dice3 = 0;
            this.player1Score = 0;
            this.player2Score = 0;
            this.finalRollCount1 = 0;
            this.finalRollCount2 = 0;
            this.result = '';
        }
    }
});
