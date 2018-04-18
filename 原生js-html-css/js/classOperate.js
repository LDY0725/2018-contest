/**
 * 为相应的节点添加类名
 * @method addClass
 * @param {object} el:元素节点  
 *        {string} value: 要添加的类
 * @return {无} 
 */
function addClass(el, value) {
    if (!el.className) el.className = value
    else {
        newClassName = el.className
        newClassName += " "
        newClassName += value
        el.className = newClassName
    }
}

/**
 * 去除相应的节点，相应的类名
 * @method removeClass
 * @param {object} el:元素节点  
 *        {string} value: 要删除的类
 * @return {无} 
 */
function removeClass(el, value) {
    if(!el.className) return
    else if (el.className.indexOf(value) < 0) return
    else {
        var reg = '/' + value + ' /'
        reg = eval(reg)
        newClassName = el.className
        newClassName.replace(reg,"")
        el.className = newClassName
    }
}

/**
 * 将类名修改为block 加相应的值
 * @method removeClass
 * @param {object} el:元素节点  
 *        {string} value: 要加在block类名后的值
 * @return {无} 
 */
function changeClass(el, value) {
    el.className = "block" + value
}
