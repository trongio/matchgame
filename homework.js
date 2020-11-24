
// Icons
// https://fontawesome.com/icons?d=gallery

// =======================================
// Card Memory Game
// =======================================

// Project  - https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/Card-Memory-Game.md
// Example  - https://codepen.io/zerospree/full/bNWbvW

var TimeLimit=60;
var time=0;

var icons = ['<i class="fab fa-angellist"></i>',
             '<i class="fab fa-android"></i>',
             '<i class="fas fa-bell"></i>',
             '<i class="fas fa-bomb"></i>',
             '<i class="fas fa-bicycle"></i>',
             '<i class="fab fa-bitcoin"></i>',
             '<i class="fas fa-bread-slice"></i>',
             '<i class="fas fa-cat"></i>',
             '<i class="fas fa-chair"></i>',
             '<i class="fas fa-check"></i>',
             '<i class="fas fa-carrot"></i>',
             '<i class="fas fa-fan"></i>',
             '<i class="fas fa-dragon"></i>',
             '<i class="fas fa-dog"></i>',
             '<i class="fas fa-dice-d20"></i>'];

var blocks=[];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function drawflipcard(n) {
    var flipcard = document.createElement("div");
        flipcard.className="flip-card";
        flipcard.setAttribute('onclick','rotate(this)');

    var inner=document.createElement("div");
        inner.className="flip-card-inner";
        inner.setAttribute('name',n);

    var front=document.createElement('div');
        front.className="flip-card-front"
        inner.append(front)

    var back= document.createElement('div');
        back.className="flip-card-back";
        back.innerHTML=icons[n];

        inner.append(back);
    
    flipcard.append(inner);
    blocks.push(flipcard);
}

var cardnum;

function drawboard(card_num,lim){
    cardnum=card_num;
    TimeLimit=lim;
    var gamemode=document.getElementsByClassName('gamemode');
    gamemode[0].className='none';
    var gameboard=document.getElementById('gameboard'); 
    for (i = 0; i < card_num/2; i++) {
        drawflipcard(i);
        drawflipcard(i);
    }
    shuffle(blocks);
    blocks.forEach(block => {
        gameboard.append(block);
    });

    setInterval(() => {
        time+=0.01;
        var number=time/TimeLimit*100+'vw';
        document.getElementById('bar').style.width=number;
        if(time==TimeLimit){
            document.getElementById('lost').class.remove('none');
        }
    }, 10);
}

var clicked=[]

function rotate(block){
    block.childNodes[0].classList.add('rotate');
    if(block.childNodes[0]!=clicked[0])
        clicked.push(block.childNodes[0]);
    console.log(clicked);
    if(clicked.length===3){
        if(clicked[0].getAttribute('name')!=clicked[1].getAttribute('name')){
            clicked[0].classList.remove('rotate');
            clicked[1].classList.remove('rotate');
        }
        clicked.shift();
        clicked.shift();
    }
    var items=document.getElementsByClassName('rotate').length;
    if(items==cardnum){
        var gameboard=document.getElementById('gameboard');
        gameboard.classList.add('none');
        var won=document.getElementById('won');
        won.classList.remove('none');
        TimeLimit=0;
    }
}



