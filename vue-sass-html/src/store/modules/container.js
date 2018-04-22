import funs from "./container-move.js";
var goLeft = funs.goLeft
var goRight = funs.goRight
var goDown = funs.goDown
var goUp = funs.goUp
var gameOver = funs.gameOver

function item() {
  this.num = 0
  this.step = 0
  this.newNum = 0
  this.big = false
  this.classes = 'item-0'
}

const state = {
  data: [
    [new item(), new item(), new item(), new item()],
    [new item(), new item(), new item(), new item()],
    [new item(), new item(), new item(), new item()],
    [new item(), new item(), new item(), new item()]
  ],
  stop: false,
  time: new Date(),
  current: 0,
  addScore: 0,
  addScoreClasses: "",
  best: 0,
  mainClasses: '',
  gameOverClass: '',
  successClasses: '',
  startX: 0,
  startY: 0
}

if (localStorage.best) {
  state.best = localStorage.best
}


const getters = {
  data: state => state.data,
  current: state => state.current,
  best: state => state.best,
  addScore: state => state.addScore,
  addScoreClasses: state => state.addScoreClasses,
  gameOverClass: state => state.gameOverClass,
  mainClasses: state => state.mainClasses,
  successClasses: state => state.successClasses,
}

const actions = {
  random({
    commit
  }) {
    commit('random')
  },
  keyup({
    commit
  }, event) {
    commit('keyup', event)
  },
  touchend({
    commit
  }, event) {
    commit('touchend', event)
  },
  touchstart({
    commit
  }, event) {
    console.log(event);
    
    commit('touchstart', event)
  }
}

const mutations = {
  random(state) {
    var data = state.data
    var a = 0
    do {
      a = Math.floor(Math.random() * 16)
    } while (data[Math.floor(a / 4)][a % 4].num != 0);

    if (Math.random() > 0.2) {
      data[Math.floor(a / 4)][a % 4].num = 2
      data[Math.floor(a / 4)][a % 4].classes = 'item-2 create animated'
    } else {
      data[Math.floor(a / 4)][a % 4].num = 4
      data[Math.floor(a / 4)][a % 4].classes = 'item-4 create animated'
    }
  },
  keyup(state, event) {
    var data = state.data
    if (state.stop) return

    var time = new Date()
    if (time - state.time <= 350) return
    state.time = time

    var falg = false
    switch (event.keyCode) {
      case 65:
      case 37:
        falg = goLeft(state)
        event.preventDefault()
        break;
      case 40:
      case 83:
        falg = goDown(state)
        event.preventDefault()
        break;
      case 38:
      case 87:
        falg = goUp(state)
        event.preventDefault()
        break;
      case 39:
      case 68:
        falg = goRight(state)
        event.preventDefault()
        break;
      default:
        break;
    }
    var self = this
    if (falg) {
      setTimeout(() => {
        this.commit('random')
        gameOver(state)
      }, 300)
    }
  },
  newGame(state) {
    var data = state.data
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        data[i][j].num = 0
        data[i][j].step = 0
        data[i][j].newNum = 0
        data[i][j].big = false
        data[i][j].classes = 'item-0'
      }
    }
    state.current = 0;
    state.stop = false
    state.mainClasses = ''
    state.gameOverClass = ''
    state.successClasses = ''
    state.mainClasses = ''
    this.commit('random')
    this.commit('random')
  },
  contine(state) {
    state.stop = false
    state.successClasses = ''
    state.mainClasses = ''
  },
  touchstart(state,event) {
    if (state.stop) return
    
    state.startX = event.touches[0].pageX
    state.startY = event.touches[0].pageY;　　
    event.preventDefault();　
  },
  touchend(state,event) {　　　　
    if (state.stop) return
    if (new Date() - state.time < 300) return
         
    state.time = new Date()
    event.preventDefault();　　　　
    var moveEndX = event.changedTouches[0].pageX
    var moveEndY = event.changedTouches[0].pageY
    var x = moveEndX - state.startX
    var y = moveEndY - state.startY
    var falg = false
    if (x == 0 && y == 0) return
    else if (x > 0) {

      if (y / x > 1) falg = goDown(state)
      else if (y / x < -1) falg = goUp(state)
      else falg = goRight(state)

    } else if (x < 0) {

      if (y / x > 1) falg = goUp(state)
      else if (y / x < -1) falg = goDown(state)
      else falg = goLeft(state)

    } else if (x == 0) {

      if (y > 0) falg = goUp(state)
      else if (y < 0) falg = goDown(state)
    }
    var self = this
    if (falg) {
      setTimeout(() => {
        this.commit('random')
        gameOver(state)
      }, 300)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
