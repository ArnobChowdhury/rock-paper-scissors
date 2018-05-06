
var game = (function() {
    var roundCache, announcement;
    roundCache = [];
    announcement = '';

    return {
        isGameOn: true,
        getScore: [0,0],
        humanTurn: function(choice) {
            if (this.isGameOn) {
                roundCache[0] = choice;
                this.turnWinnerSelector();
            };            
        },
        computerTurn: function() {
            var rpsArr = ['rock', 'paper', 'scissor'];
            var randomSelector = Math.floor(Math.random() * 3);
            roundCache[1] = rpsArr[randomSelector];
        },
        turnWinnerSelector: function() {
            // this.humanTurn();
            this.computerTurn();
            if (roundCache[0] === roundCache[1]) {
                announcement = '<span>draw! </span><br> both chose ' + roundCache[0];
            } else {
                if (roundCache[0] === 'rock') {
                    switch (roundCache[1]) {
                        case 'paper':
                            announcement = '<span>lost!</span>  <br> paper covers rock';
                            this.getScore[1] += 1;
                            break;
                        case 'scissor':
                        announcement = '<span>won!</span> <br> rock crushes scissors';
                            this.getScore[0] += 1;
                            break; 
                    };
                } else if (roundCache[0] === 'paper') {
                    switch (roundCache[1]) {
                        case 'rock':
                            announcement = '<span>won!</span> <br> paper covers rock';
                            this.getScore[0] += 1;
                            break;
                        case 'scissor':
                            announcement = '<span>lost!</span> <br> scissor cuts paper';
                            this.getScore[1] += 1;
                            break;
                    };
                } else if (roundCache[0] === 'scissor') {
                    switch(roundCache[1]) {
                        case 'paper':
                            announcement = '<span>won!</span><br> scissor cuts paper';
                            this.getScore[0] += 1;
                            break;
                        case 'rock':
                            announcement = '<span>lost!</span><br> rock crushes scissors';
                            this.getScore[1] += 1;
                            break;
                    };
                }
            };
            this.winnerChecker();
        },
        winnerChecker: function() {
            if (this.getScore[0] === 5) {
                // announcement = '<span>victory kisses your feet!!!</span>';
                this.isGameOn = false;
            } else if (this.getScore[1] === 5) {
                // announcement = '<span>you lost, try again</span>';
                this.isGameOn = false;
            }
            view.updateDisplay(announcement, roundCache);
            // handler.init();
        },
    };
})();

var handler = (function(game) {
    return {
        humanTurn : function(choice) {
            game.humanTurn(choice);
        },
        init: function() {
            game.isGameOn = true;
            var announcement = 'score 5 to win!';
            game.getScore = [0,0];

            var headerZero = document.getElementById('player_header_0');
            headerZero.innerHTML = 'player';

            var headerOne = document.getElementById('player_header_1');
            headerOne.innerHTML = 'computer';

            view.updateDisplay(announcement);
        },
    }
})(game);

var view = (function(){
    
    return {
        updateDisplay: function(announcement, roundCache) {
            var score = game.getScore;
            score.forEach(function(playerScore, position) {
                var scoreElementSelector = document.getElementById('score-' + position);
                scoreElementSelector.innerHTML = 'score: <span class= "score">' + playerScore + '</span>';                
            });

            var middleAnnouncement = document.querySelector('.announcer');
            middleAnnouncement.innerHTML = announcement;

            var playerPanel = document.getElementById('player_panel');
            playerPanel.innerHTML = '<img src="resource/img/' + roundCache[0] +'.png" alt= "" class="appear"><p class="selection">' + roundCache[0] + '<p>' ;

            var computerPanel = document.getElementById('computer_panel');
            computerPanel.innerHTML = '<img src="resource/img/' + roundCache[1] +'.png" alt= "" class="appear"><p class="selection">' + roundCache[1] + '<p>';

            setTimeout(this.reinstate, 1700);
        },
        reinstate: function() {
            var playerPanel = document.getElementById('player_panel');
            playerPanel.innerHTML = '<figure class="player"><img src="resource/img/rock.png" alt= "rock" id="rock"></figure><figure class="player"><img src="resource/img/paper.png" alt= "paper" id="paper"></figure><figure class="player"><img src="resource/img/scissor.png" alt= "scissors" id="scissor"></figure>'

            var computerPanel = document.getElementById('computer_panel');
            computerPanel.innerHTML = '<figure><img src="resource/img/rock.png" alt= "rock" id="rock"></figure><figure><img src="resource/img/paper.png" alt= "paper" id="paper"></figure><figure><img src="resource/img/scissor.png" alt= "scissors" id="scissor"></figure>'

            var middleAnnouncement = document.querySelector('.announcer');
            middleAnnouncement.innerHTML = '<span>. . .</span>';

            if (game.getScore[0] === 5) {
                var header = document.getElementById('player_header_0');
                header.innerHTML = '<span>winner</span>';
                
                var middleAnnouncement = document.querySelector('.announcer');
                middleAnnouncement.innerHTML = '<span>vicotry kisses your feet</span>';
            } else if (game.getScore[1] === 5) {
                var header = document.getElementById('player_header_1');
                header.innerHTML = '<span>winner</span>';

                var middleAnnouncement = document.querySelector('.announcer');
                middleAnnouncement.innerHTML = '<span>tough luck, try again...</span>';
            }
        },
        setUpEventListener : function() {
            var rpsDiv = document.querySelector('.left');
            rpsDiv.addEventListener('click', function(e) {
            var elementClicked = e.target;
            handler.humanTurn(elementClicked.id);
            });
        },
    }
})();

view.setUpEventListener();

