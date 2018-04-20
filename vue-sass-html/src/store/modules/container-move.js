/**
 * 当点击a 和 左方向键后需要执行的函数
 * @method goLeft
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function goLeft(state) {
  var score = 0
  var data = state.data
  for (let i = 0; i < 4; i++) {
    var array = [{}, {}, {}, {}]

    for (let j = 0; j < 4; j++) {
      array[j].num = data[i][j].num
      array[j].old = j
      array[j].step = 0
      array.big = false
    }

    score += getArrayData(state,array)

    for (let j = 0; j < array.length; j++) {
      var current = data[i][j]
      current.newNum = array[j].num
      current.step = array[j].step
      current.big = array[j].big
    }

  }

  changScore(state, score)
  return change('moveLeft', data)
}

/**
 * 当点击d 和 右方向键后需要执行的函数
 * @method goRight
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function goRight(state) {
  var score = 0
  var data = state.data
  for (let i = 0; i < 4; i++) {
    var array = [{}, {}, {}, {}]

    for (let j = 0; j < 4; j++) {
      array[j].num = data[i][3 - j].num
      array[j].old = j
      array[j].step = 0
      array.big = false
    }

    score += getArrayData(state,array)

    for (let j = 0; j < 4; j++) {
      var current = data[i][3 - j]
      current.newNum = array[j].num
      current.step = array[j].step
      current.big = array[j].big
    }
  }

  changScore(state, score)
  return change('moveRight', data)
}

/**
 * 当点击s 和 下方向键后需要执行的函数
 * @method goUp
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function goUp(state) {
  var score = 0
  var data = state.data

  for (let i = 0; i < 4; i++) {
    var array = [{}, {}, {}, {}]

    for (let j = 0; j < 4; j++) {
      array[j].num = data[j][i].num
      array[j].old = j
      array[j].step = 0
      array.big = false
    }

    score += getArrayData(state,array)

    for (let j = 0; j < 4; j++) {
      var current = data[j][i]
      current.newNum = array[j].num
      current.step = array[j].step
      current.big = array[j].big
    }
  }

  changScore(state, score)
  return change('moveUp', data)
}

/**
 * 当点击w 和 上方向键后需要执行的函数
 * @method goDown
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function goDown(state) {
  var score = 0
  var data = state.data

  for (let i = 0; i < 4; i++) {
    var array = [{}, {}, {}, {}]

    for (let j = 0; j < 4; j++) {
      array[j].num = data[3 - j][i].num
      array[j].old = j
      array[j].step = 0
      array.big = false
    }

    score += getArrayData(state,array)

    for (let j = 0; j < 4; j++) {
      var current = data[3 - j][i]
      current.newNum = array[j].num
      current.step = array[j].step
      current.big = array[j].big
    }
  }
  changScore(state, score)
  return change('moveDown', data)
}

/**
 * 当更新完 mainData 后进行dom 元素的更改，加入动画
 * @method change
 * @param {string} direction:方向
 *        {object} state:程序中的所有数据  
 * @return {无} 
 */
function change(direction, data) {
  var flag = false
  var all = 0
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (data[i][j].step != 0 && data[i][j].num != 0) {
        data[i][j].classes = "item-" + data[i][j].num
        data[i][j].classes = "animated " + direction + data[i][j].step + " item-" + data[i][j].num
      }

      if (data[i][j].newNum != 0) {

        setTimeout(((i, j) => {
          return function () {
            data[i][j].num = data[i][j].newNum
            if (data[i][j].big) {
              data[i][j].classes = "animated change item-" + data[i][j].num
            } else {
              data[i][j].classes = "item-" + data[i][j].num
            }
            data[i][j].big = false
            data[i][j].newNum = 0
          }
        })(i, j), 250);
      } else {
        setTimeout((function (i, j) {
          return function () {
            data[i][j].classes = "item-" + 0
            data[i][j].num = 0
          }
        })(i, j), 250);
      }
      if (data[i][j].step != 0) {
        flag = true
      }
      if (data[i][j].newNum != 0) {
        all++
      }

    }
  }

  if (flag && all < 16) {
    return true
  }
  return false
}

/**
 * 验证每一个block元素周围是否有相同的元素，如果没有则要游戏结束
 * @method gameOver
 * @param {object} state:程序中的所有数据  
 * @return {无} 
 */
function gameOver(state) {
  var data = state.data
  var flag = false
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (data[i][j].num == 0) {
        flag = true
        break
      }
      if (i < 3 && j < 3) {

        if (data[i][j].num == data[i + 1][j].num ||
          data[i][j].num == data[i][j + 1].num) {
          flag = true
          break
        }
      } else if (i < 3 && j == 3) {

        if (data[i][j].num == data[i + 1][j].num) {
          flag = true
          break
        }
      } else if (i == 3 && j < 3) {

        if (data[i][j].num == data[i][j + 1].num) {
          flag = true
          break
        }
      }
    }

    if (flag) break
  }
  if (!flag) {
    state.mainClasses = 'blur'
    state.gameOverClass = 'displayBlock'
  }
}

/**
 * 将array内的0去除，并合并相邻且相同的元素，并记录分数
 * @method getArrayData
 * @param {object} state:程序中的所有数据 
 *        {array} array:一列或一行数据 
 * @return {number} score：合并数组所得到分数 
 */
function getArrayData(state,array) {
  deleteZero(array)
  var score = 0
  for (let i = 0; i < 3; i++) {
    if (array[i].num == 0) break

    if (array[i].num == array[i + 1].num) {
      array[i].num = 2 * array[i].num
      score += array[i].num
      if (array[i].num == 2048) {
        success(state)
      }
      array[i].big = true
      array[array[i + 1].old].step++
        array[i + 1].num = 0
      deleteZero(array)
    }
  }
  return score
}

/**
 * 将array内的0去除，并移动元素，记录过程。
 * @method deleteZero
 * @param {array} array:一列或一行数据 
 * @return {无} 
 */
function deleteZero(array) {
  var all = 3
  var zero = 0
  for (let i = 0; i < all; i++) {

    if (array[i].num == 0) {
      all--

      var flag = false
      for (let j = i + 1; j < 4; j++) {
        if (array[j].num != 0) {
          flag = true
          break
        }
      }

      if (!flag) break

      for (let j = i; j < 3; j++) {
        array[j].num = array[j + 1].num
        if (j < 3 - zero) {
          if (array[j + 1].old > 0) {
            array[array[j + 1].old].step++
              array[j].old = array[j + 1].old
          }
        }
      }

      array[3].num = 0
      array[3].old = -1
      zero++
      i--
    }
  }
}

/**
 * 更改分数
 * @method changScore
 * @param {object} state:程序中的所有数据  
 *        {number} score:要更改的数据
 * @return {无} 
 */
function changScore(state, score) {
  if (score == 0) return  
  state.current += score
  state.addScore = score
  state.addScoreClasses = 'addScore animated scoreOut'
  setTimeout(function(){
    state.addScoreClasses = 'none'
  },200)
  if (state.current > state.best) {
    state.best = state.current
    localStorage.best = state.best;
  }
  console.log(state.current, state.addScore, state.best);

}

/**
 * 得到2048，显示成功界面
 * @method success
 * @param {object} state:程序中的所有数据  
 * @return {无} 
 */
function success(state) {
  state.stop = true
  state.successClasses = 'displayBlock'
  state.mainClasses = 'blur'
}


export default {
  goLeft,
  goRight,
  goDown,
  goUp,
  gameOver
}
