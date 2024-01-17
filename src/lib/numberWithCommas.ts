// parses number input with thousand seperator

const numberWithCommas = (num : number) => {
    const formattedNumber = Math.abs(num).toLocaleString(undefined, {
        maximumFractionDigits: 2,
    })

    return num < 0 ? `-${formattedNumber}` : formattedNumber
}

export default numberWithCommas