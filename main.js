$(document).ready(init);

var deck = ["ace-of-clubs ace","two-of-clubs","three-of-clubs","four-of-clubs","five-of-clubs","six-of-clubs","seven-of-clubs","eight-of-clubs","nine-of-clubs","ten-of-clubs","jack-of-clubs","queen-of-clubs","king-of-clubs","ace-of-spades ace","two-of-spades","three-of-spades","four-of-spades","five-of-spades","six-of-spades","seven-of-spades","eight-of-spades","nine-of-spades","ten-of-spades","jack-of-spades","queen-of-spades","king-of-spades","ace-of-hearts ace","two-of-hearts","three-of-hearts","four-of-hearts","five-of-hearts","six-of-hearts","seven-of-hearts","eight-of-hearts","nine-of-hearts","ten-of-hearts","jack-of-hearts","queen-of-hearts","king-of-hearts","ace-of-diamonds ace","two-of-diamonds","three-of-diamonds","four-of-diamonds","five-of-diamonds","six-of-diamonds","seven-of-diamonds","eight-of-diamonds","nine-of-diamonds","ten-of-diamonds","jack-of-diamonds","queen-of-diamonds","king-of-diamonds"];
var values = [11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10,11,2,3,4,5,6,7,8,9,10,10,10,10];

var dealerCards = [];
var dealerTotal = 0;
var gamblerCards = [];
var gamblerTotal = 0;
var $dealerCards = $('.dealerCards');
var $gamblerCards = $('.gamblerCards');
var cardClass;
var aceCount =0;



function init(){
	deal(dealerCards, dealerTotal, 2);
	deal(gamblerCards, gamblerHit, 2);
	displayDealerCards();
	displayGamblerCards();
	$('.gamblerTotalSpan').text(gamblerTotal);
	// $('.dealerTotalH').hide();
	$('.dealerTotalSpan').text(dealerTotal);
	$('.dealerCards .card:first-child').addClass('flipped');
	// console.log('dealerCards:', dealerCards, 'dealerTotal:', dealerTotal)
	// console.log('gamblerCards:', gamblerCards, 'gamblerTotal:', gamblerTotal);
	$('#hit').on('click' ,gamblerHit);
	$('#stay').on('click', dealerHit);
	$('#reset').on('click', resetGame);

}

function resetGame(){
	// aceCount = 0;
	// $dealerCards.empty();
	// $gamblerCards.empty();
	// dealerCards = [];
	// gamblerCards = [];
	// dealerTotal = 0;
	// gamblerTotal= 0;
	// $('.dealerTotalSpan').text(gamblerTotal);
	// $('.gamblerTotalSpan').text(dealerTotal);
	// init();
	// console.log('clicked');

}

function displayDealerCards (){
	$gamblerCards.empty();
	for (var i = 0; i < dealerCards.length; i++){
		// console.log($cardClass);
		$card = $('<div>').addClass('card')
											.addClass(dealerCards[i]);
		$dealerCards.append($card);
	}	
}

function displayGamblerCards (){
	$gamblerCards.empty();
	for (var i = 0; i < gamblerCards.length; i++){
		// console.log($cardClass);
		$card = $('<div>').addClass('card')
											.addClass(gamblerCards[i]);
		$gamblerCards.append($card);
	}	
}

function gamblerHit(){
	deal(gamblerCards, gamblerHit, 1)
	aceCount = 0;
	$('.gamblerTotalSpan').text(gamblerTotal);
	displayGamblerCards();
	// checkForAce();
	checkForBust(gamblerTotal);
}	

function dealerHit(){
	if(dealerTotal < 17) {
		deal(dealerCards, dealerTotal, 1)
		displayDealerCards();
		$('.dealerTotalSpan').text(dealerTotal);
		checkForBust(dealerTotal);
	} else 
			if (dealerTotal > 17 && dealerTotal < gamblerTotal){
				deal(dealerCards, dealerTotal, 1)
				displayDealerCards();
				$('.dealerTotalSpan').text(dealerTotal);
				checkForBust(dealerTotal);
	} else if (dealerTotal < gamblerTotal){
		deal(dealerCards, dealerTotal, 1);
		checkForBust;
	}
}

function deal(playerCards, playerTotal, number){
	var total = 0;

	for (var i = 0; i < number; i++){
		var rand = Math.floor(Math.random()*deck.length);
		cardClass = deck[rand];
		var value = parseInt(values[rand]);
		playerCards.push(cardClass);
		total += value;
		deck.splice(cardClass,1);
		values.splice(value,1);
	}
		if (playerTotal ===dealerTotal){
			dealerTotal += total;
		} else {
			gamblerTotal += total;
		}
}	

// function checkForAce(){
	
// 		$('.gamblerCards .card').each( function(){
// 			if($(this).hasClass('ace')) {
// 				console.log('aceFound');
// 				aceCount +=1;
// 				gamblerTotal -=10;
// 				console.log('aceCount:', aceCount);
// 			}
// 	  });
	
// }
function checkForBust(player){
	if (player === gamblerTotal) {
		if(gamblerTotal > 21) {
			console.log('youlose');
			$('.dealerCards .card:first-child').removeClass('flipped');
			$('.resultsSpan').text('You Lose');
			$('#stay').off('click');
			$('#hit').off('click');

		}
	}

	if(player === dealerTotal){
		if (dealerTotal < 17) {
			dealerHit();
		} else if(dealerTotal >21) {
			$('.dealerCards .card:first-child').removeClass('flipped');
			$('.resultsSpan').text('You Win');
			console.log('you win');

		} else if (dealerTotal <= 21 && dealerTotal > gamblerTotal) {
			$('.dealerCards .card:first-child').removeClass('flipped');
			$('.resultsSpan').text('You Lose');
			$('#stay').off('click');
			$('#hit').off('click');
		}
	}
};



