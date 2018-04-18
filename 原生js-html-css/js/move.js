/**
 * 当点击a 和 左方向键后需要执行的函数
 * @method goLeft
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function goLeft(mainData) {
    var score = 0
    for (let i = 0; i < 4; i++) {
        var array = [{}, {}, {}, {}]

        for (let j = 0; j < 4; j++) {
            array[j].num = mainData.data[i][j].num
            array[j].old = j
            array[j].step = 0
            array.big = false
        }

        score += getArrayData(mainData,array)

        for (let j = 0; j < array.length; j++) {
            var current = mainData.data[i][j]
            current.newNum = array[j].num
            current.step = array[j].step
            current.big = array[j].big
        }

    }

    changScore (mainData,score)
    change('moveLeft',mainData)
}

/**
 * 当点击d 和 右方向键后需要执行的函数
 * @method goRight
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function goRight(mainData) {
    var score = 0
    for (let i = 0; i < 4; i++) {
        var array = [{}, {}, {}, {}]

        for (let j = 0; j < 4; j++) {
            array[j].num = mainData.data[i][3 - j].num
            array[j].old = j
            array[j].step = 0
            array.big = false
        }

        score += getArrayData(mainData,array)

        for (let j = 0; j < 4; j++) {
            var current = mainData.data[i][3 - j]
            current.newNum = array[j].num
            current.step = array[j].step
            current.big = array[j].big
        }
    }

    changScore (mainData,score)
    change('moveRight',mainData)
}

/**
 * 当点击s 和 下方向键后需要执行的函数
 * @method goUp
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function goUp(mainData) {
    var score = 0
    for (let i = 0; i < 4; i++) {
        var array = [{}, {}, {}, {}]

        for (let j = 0; j < 4; j++) {
            array[j].num = mainData.data[j][i].num
            array[j].old = j
            array[j].step = 0
            array.big = false
        }

        score += getArrayData(mainData,array)

        for (let j = 0; j < 4; j++) {
            var current = mainData.data[j][i]
            current.newNum = array[j].num
            current.step = array[j].step
            current.big = array[j].big
        }
    }

    changScore (mainData,score)
    change('moveUp',mainData)
}

/**
 * 当点击w 和 上方向键后需要执行的函数
 * @method goDown
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function goDown(mainData) {
    var score = 0
    for (let i = 0; i < 4; i++) {
        var array = [{}, {}, {}, {}]

        for (let j = 0; j < 4; j++) {
            array[j].num = mainData.data[3 - j][i].num
            array[j].old = j
            array[j].step = 0
            array.big = false
        }

        score += getArrayData(mainData,array)

        for (let j = 0; j < 4; j++) {
            var current = mainData.data[3 - j][i]
            current.newNum = array[j].num
            current.step = array[j].step
            current.big = array[j].big
        }
    }
    changScore (mainData,score)
    change('moveDown',mainData)
}

/**
 * 当更新完 mainData 后进行dom 元素的更改，加入动画
 * @method change
 * @param {string} direction:方向
 *        {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function change(direction,mainData) {
    var flag = false
    var all = 0
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (mainData.data[i][j].step != 0 && mainData.data[i][j].num != 0) {
                addClass(mainData.data[i][j].el, 'animated ' + direction + mainData.data[i][j].step)
            }
            mainData.data[i][j].num = 0
            if (mainData.data[i][j].newNum != 0) {
                var a = mainData.data[i][j].newNum
                mainData.data[i][j].num = a

                setTimeout(((i, j, a) => {
                    return function () {
                        mainData.data[i][j].el.innerHTML = a
                        if (mainData.data[i][j].big) {
                            changeClass(mainData.data[i][j].el, ' animated change div' + a)
                        } else {
                            changeClass(mainData.data[i][j].el, ' div' + a)
                        }
                        mainData.data[i][j].big = false
                    }
                })(i, j, a), 250);
            } else {
                setTimeout((function (i, j) {
                    return function () {
                        mainData.data[i][j].el.innerHTML = ''
                        mainData.data[i][j].el.className = 'block'
                    }
                })(i, j), 250);
            }
            if (mainData.data[i][j].step != 0) {
                flag = true
            }
            mainData.data[i][j].old = j
            mainData.data[i][j].step = 0

            if (mainData.data[i][j].newNum != 0) {
                all++
            }
            mainData.data[i][j].newNum = 0
        }
    }

    if (flag && all < 16) {
        setTimeout(function () {
            random(mainData)
            gameOver(mainData)
        }, 300)
    }
}

/**
 * 验证每一个block元素周围是否有相同的元素，如果没有则要游戏结束
 * @method gameOver
 * @param {object} mainData:程序中的所有数据  
 * @return {无} 
 */
function gameOver(mainData) {
    
    var flag = false
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (mainData.data[i][j].num == 0) {
                flag = true
                break
            }
            if (i < 3 && j < 3) {

                if (mainData.data[i][j].num == mainData.data[i + 1][j].num ||
                    mainData.data[i][j].num == mainData.data[i][j + 1].num) {
                    flag = true
                    break
                }
            } else if (i < 3 && j == 3) {

                if (mainData.data[i][j].num == mainData.data[i + 1][j].num) {
                    flag = true
                    break
                }
            } else if (i == 3 && j < 3) {
                
                if (mainData.data[i][j].num == mainData.data[i][j + 1].num) {
                    flag = true
                    break
                }
            }
        }

        if (flag) break
    }
    if (!flag) {
        document.querySelector('.gameOver').style.display = 'block'
        document.querySelector('.contain').style.filter = 'blur(2px)'
    }
}