//랜덤 번호 지정
//유저가 번호를 입력한 후, go라는 버튼을 누름

//만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다!
//랜덤 번호가 < 유저 번호 => down!
//랜덤 번호가 > 유저 번호 => up!

//reset 버튼을 누르면 게임이 리셋됨
//5번의 기회를 다 쓰면 게임이 끝남 (더 이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려줌.  기회를 깎지는 않음
//유저가 입력한 숫자를 또 입력하면 알려주고, 기회를 깎지는 않음

//제발 되기를..

let playButton = document.getElementById('play-button')
let userInput = document.getElementById('user-input')
let resultArea = document.getElementById('result-area')
let resetButton = document.getElementById('reset-button')
let chanceArea = document.getElementById('chance-area')
let sulnum = 0;
let chances = 5;
let gameOver = false;
let history = []

playButton.addEventListener('click', play)
userInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      play();
    }
  })
  userInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 82) {
      event.preventDefault();
      reset();
    }
  })
resetButton.addEventListener('click', reset)
userInput.addEventListener("focus", function () {userInput.value = ""})

function pickRandomNum() {
    sulnum = Math.floor((Math.random() * 100)) + 1
    console.log(`Answer: ${sulnum}`)
}

function play() {
    let userValue = userInput.value

    if(userValue < 1 || userValue > 100 || userValue % 1 !== 0) {
        resultArea.textContent = '유효하지 않은 숫자입니다! 다시 입력해주세용'
        return;
    }

    if(history.includes(userValue)) {
        resultArea.textContent = '이미 입력한 숫자입니다! 다시 입력해주세용'
        return;
    }

    chances --;
    chanceArea.textContent = `남은 기회: ${chances}번`

    if(userValue > sulnum) {
        resultArea.textContent = 'Down!'
    }else if(userValue < sulnum) {
        resultArea.textContent = 'Up!'
    }else {
        resultArea.textContent = 'Right!'
        gameOver = true
    }

    history.push(userValue)

    if(chances < 1) {
        gameOver = true
    }

    if(gameOver === true) {
        playButton.disabled = true;
        resultArea.textContent = `정답은 ${sulnum}이었습니당!`
    }
}

function reset() {
    pickRandomNum()
    resultArea.textContent = '결과가 나온당'
    userInput.value = ''
    chances = 5
    chanceArea.textContent = `남은 기회: ${chances}번`
    gameOver = false
    playButton.disabled = false;
    history = []
}

pickRandomNum()