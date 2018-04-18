/**
 * 将array内的0去除，并合并相邻且相同的元素，并记录分数
 * @method getArrayData
 * @param {object} mainData:程序中的所有数据 
 *        {array} array:一列或一行数据 
 * @return {number} score：合并数组所得到分数 
 */
function getArrayData(mainData,array) {
    deleteZero(array)
    var score = 0
    for (let i = 0; i < 3; i++) {        
        if (array[i].num == 0) break
        
        if (array[i].num == array[i+1].num) {
            array[i].num = 2 * array[i].num
            score += array[i].num
            if (array[i].num == 2048) {
                success(mainData)
            }      
            array[i].big = true
            array[array[i+1].old].step++
            array[i+1].num = 0
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
function deleteZero (array) {
    var all = 3
    var zero = 0
    for (let i = 0; i < all; i++) {

        if (array[i].num == 0) {
            all--
            
            var flag = false
            for (let j = i+1; j < 4; j++) {
                if (array[j].num !=0) {
                    flag = true
                    break
                }                
            }

            if (!flag) break

            for (let j = i; j < 3; j++) {
                array[j].num = array[j+1].num
                if (j < 3-zero) {
                    if (array[j+1].old>0) {
                        array[array[j+1].old].step ++
                        array[j].old = array[j+1].old
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
