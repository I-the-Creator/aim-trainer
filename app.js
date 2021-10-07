const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')   // get the array of elements  
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {   // add event listener on click and set 'prevent default' for that event
    event.preventDefault();            // set 'prevent default' for that event
    screens[0].classList.add('up');  // add 'up' class to the first screen from array - it's the first one in DOM - this element goes up, becomes invisible
})

timeList.addEventListener('click', event => {  // event listener for whole list, not only for one element of list
    
    if (event.target.classList.contains('time-btn')){  // check if clicked element has '.time-btn' class
    console.log(event.target.getAttribute('data-time'))    // debug - getting clicked element attribute. it's string
    time = parseInt(event.target.getAttribute('data-time'))   //  convert to number
    screens[1].classList.add('up');    // the screen[1] goes up and becomes invisible
    startGame()
 }
})

     //    add SCOREs counter
board.addEventListener('click', event => {   
    if (event.target.classList.contains('circle')) {   // check if we clicked into the circle
        score++
        event.target.remove()                   //  remove circle after click on it
        createRandomCircle()
    }
})

 // DEBUG
// startGame()     // only for debug purposes

function startGame () {
    // screens[1].classList.add('up');    // the screen[1] goes up and becomes invisible
    setInterval(decreaseTime, 1000);
    createRandomCircle()   //  adв the aims(circles) on board
    setTime(time); // put the selected time to Countdown timer
}

function decreaseTime () {   // to start countdown
    if(time ===  0) {
        finishGame()
    } else{
        let current = --time;
        if (current < 10) {    //   to add 0  if below 10
            current = `0${current}`   
        }
        setTime(current);    // put the selected time to Countdown timer
    }
}

function setTime (value) {   //   insert time to element inner HTML  - span with #time

        timeEl.innerHTML = `00:${value}`
}

function finishGame () {    //   finishing the game upon countdown
    timeEl.parentNode.classList.add('hide')   // to hide h3 with countdown upon finishing the game - the parent of timeEl span 
    // timeEl.parentNode.remove()   // to remove h3 with countdown upon finishing the game - the parent of timeEl span 
    board.innerHTML = `<h1>Your Score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle () {    //  create circles - aims
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()   // destructuring assignment to get width and height of BOARD
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`   // circle  width
    circle.style.height = `${size}px`   // circle  height
    circle.style.top = `${y}px`   //  position on Y axis - indent from the top edge of board
    circle.style.left = `${x}px`   //  position on X axis - indent from the left edge of board

    board.append(circle)
}

//  to get number for width and height circles (put to createRandomCircle)
function getRandomNumber (min, max) {
   return Math.round(Math.random() * (max - min) + min)
}