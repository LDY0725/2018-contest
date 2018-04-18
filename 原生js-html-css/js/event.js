/**
 * 触摸开始事件
 * @method touchstart
 * @param {object} event:事件对象
 *        {object} mainData:程序中的所有数据 
 * @return {无} 
 */
function touchstart(event,mainData) {  
    if (mainData.stop) return
    
    mainData.startX = event.touches[0].pageX
    mainData.startY = event.touches[0].pageY;　　
    event.preventDefault();　            
}

/**
 * 触摸结束事件，触发相应的函数
 * @method touchend
 * @param {object} event:事件对象
 *        {object} mainData:程序中的所有数据 
 * @return {无} 
 */
function touchend(event, mainData) {　　　　
    if (mainData.stop) return
    if (new Date() - mainData.time < 300) return
    
    mainData.time = new Date()        
    event.preventDefault();　　　　
    moveEndX = event.changedTouches[0].pageX
    moveEndY = event.changedTouches[0].pageY
    x = moveEndX - mainData.startX
    y = moveEndY - mainData.startY

    if (x == 0 && y == 0) return
    else if (x > 0) {
    
        if (y / x > 1)  goDown(mainData)       
        else if (y / x < -1) goUp(mainData)
        else  goRight(mainData)
    
    } else if (x < 0) {
        
        if (y / x > 1) goUp(mainData)
        else if (y / x < -1)  goDown(mainData)
        else goLeft(mainData)
        
    } else if (x == 0) {

        if (y > 0) goUp(mainData)
        else if (y < 0)  goDown(mainData)
    }
}

/**
 * 键盘监听函数，监听 wasd，上下左右方向键
 * @method keyup
 * @param {object} event:事件对象
 *        {object} mainData:程序中的所有数据 
 * @return {无} 
 */
function keyup(event,mainData) {
    if (mainData.stop) return
    var time = new Date()

    if (time - mainData.time <= 350) return

    mainData.time = time
    switch (event.keyCode) {
        case 65:
        case 37:
            goLeft(mainData)
            event.preventDefault()
            break;
        case 40:
        case 83:
            goDown(mainData)
            event.preventDefault()
            break;
        case 38:
        case 87:
            goUp(mainData)
            event.preventDefault()
            break;
        case 39:
        case 68:
            goRight(mainData)
            event.preventDefault()
            break;
        default:
            break;
    }
}