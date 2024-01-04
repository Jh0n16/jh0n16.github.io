const $canvas = document.querySelector("canvas")
const $menu = document.querySelector("#menu")
const $score = document.querySelector("#score")
const $finalScore = document.querySelector("#finalScore")
const $btnPlay = document.querySelector("#playAgain")

const context = $canvas.getContext("2d")
const audio = new Audio("./assets/audio.mp3")

const size = 30
let snake = [
    {x: 270, y: 240},

] // o ideal é que para a posição inicial tenhamos um multiplo do valor definido como size
let direction, loopId

const randomNumber = (min, max) => {
    return Math.round( Math.random() * (max - min ) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, $canvas.width - size)

    return Math.round(number/30) * 30

}

let food = {
    x: randomPosition(),
    y: randomPosition(),
    color: "#FCF14E"
}

const incrementScore = () => {
    $score.innerText = +$score.innerText + 10
}

const drawSnake = () => {
    context.fillStyle = "#63009c"

    snake.forEach((position, index) => {
        if(index == snake.length - 1)
            context.fillStyle = "#4b0275"

        context.fillRect(position.x, position.y, size, size)

    })
}

const drawFood = () => {
    const {x, y, color} = food // destruturação

    context.shadowColor = color
    context.shadowBlur = 5
    context.fillStyle = color
    context.fillRect(x, y, size, size)
    
    context.shadowBlur = 0 // reiniciando o blur para não aplicar nos outros elementos
}

const drawGrid = () => {
    context.lineWidth = 1
    context.strokeStyle = "#4D0EA4"

    for(i = 0; i < $canvas.width; i += size) {
        context.beginPath()
        context.lineTo(i, 0)
        context.lineTo(i, 600)
        context.stroke()
        
        context.beginPath()
        context.lineTo(0, i)
        context.lineTo(600, i)
        context.stroke()

    }
}

const moveSnake = () => {
    if(!direction) return

    const head = snake[snake.length - 1]

    switch(direction) {
        case "right":
            snake.push({x: head.x + size, y: head.y})
            break

        case "left":
            snake.push({x: head.x - size, y: head.y})
            break
        
        case "up":
            snake.push({x: head.x, y: head.y - size})
            break

        case "down":
            snake.push({x: head.x, y: head.y + size})
            break

        default:
            return
    }

    snake.shift()
}

const checkEat = () => {
    const head = snake.at(-1) // o mesmo que 'const head = snake[snake.length - 1]'

    if(food.x == head.x && food.y == head.y){
        snake.push(head)

        audio.play()
        incrementScore()

        let x = randomPosition()
        let y = randomPosition()

        while(snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition()
            y = randomPosition()
        }
        
        food.x = x
        food.y = y

    }
}

const checkCollision = () => {
    const head = snake.at(-1)
    const snakeBody = snake.length - 2
    const limit = $canvas.width - size

    const sceneCollision = head.x < 0 || head.x > limit || head.y < 0 || head.y > limit // colisão com o cenário
    const selfCollision = snake.find((position, index) => {
        return index < snakeBody && position.x == head.x && position.y == head.y
    }) // colisão com o corpo

    if(sceneCollision || selfCollision) { 
        gameOver()
    }
}

const gameOver = () => {
    $menu.style.display = "flex"
    $finalScore.innerText = $score.textContent
    
    direction = undefined

}

const gameLoop = () => {
    clearInterval(loopId) // removendo o looping anterior para evitar erros
    context.clearRect(0, 0, 600, 600)

    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()
    
    loopId = setInterval(() => {
        gameLoop()
    }, 200)
}

gameLoop() // iniciando o looping principal

document.addEventListener("keydown", event => {
    const { key } = event

    if(key == "ArrowUp" && direction != "down"){
        event.preventDefault()
        direction = "up"
    }

    if(key == "ArrowDown" && direction != "up"){
        event.preventDefault()
        direction = "down"
    }

    if(key == "ArrowLeft" && direction != "right"){
        event.preventDefault()
        direction = "left"
    }

    if(key == "ArrowRight" && direction != "left"){
        event.preventDefault()
        direction = "right"
    }

})

$btnPlay.addEventListener("click", event => {
    $score.innerText = ""
    $menu.style.display = "none"

    food = {x: randomPosition(), y: randomPosition(), color: "#FCF14E"}
    drawFood()

    snake = [{x: 270, y: 240}]
})