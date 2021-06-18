const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('.board')

const colors = [
    '#e74c3c',
    '#8e44ad',
    '#3498db',
    '#e67e22',
    '#2ecc71',
    '#727072',
    '#e6cfbf',
    '#ae7862',
    '#b18e2c',
    '#2b3120',
    '#503143',
    '#9a532b',
    '#c49b60',
    '#79ad9f',
    '#193439'
]

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    let current = --time
    if (time === 0) {
        finishGame()
    }
    else {
        current = `0${current}`
    }
    setTime(current)
}

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle(event) {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const {width, height} = board.getBoundingClientRect()
    const size = getRandomNumber(10, 60)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)


    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
    setColor(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    let primary = document.querySelector('.primary')

    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    board.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}