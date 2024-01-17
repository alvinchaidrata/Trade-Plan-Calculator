const extractNumber = (str : string | number) => {
    let num = 0
    if(typeof str == 'string')  num = parseFloat(str.replace(/[^\d.-]/g, ''))
    else                        num = str

    return isNaN(num) ? 0 : num
}

export default extractNumber