import { Plan, Projection, ProfitProj } from "../types"

const calcProjection = (
    plan   : Plan,
    ratios : number[],
    name   : string
) : Projection => {
    let prices = [plan.price, ...plan.supps]

    let lots : number[] = []
    let vals : number[] = []
    let avgs : number[] = []
    let losses : number[] = []
    let movingVals : number[] = []
    
    let lossValue      = 0
    let lossPercentage = 0

    ratios.forEach((ratio : number, idx : number) => {
        let lot = Math.floor((plan.amount * ratio/10) / (prices[idx] * 100))
        let val = lot * prices[idx] * 100

        let avg  = 0
        let loss = 0
        let movingVal = 0
        
        if(idx > 0) {
            avg       = (vals[idx-1] + val) / (lots[idx-1] + lot) / 100
            loss      = movingVals[idx-1] * ((avgs[idx-1] - prices[idx]) / avgs[idx-1])
            movingVal = vals[idx-1] + val - loss
        } else {
            avg       = prices[idx]
            movingVal = val
            loss      = 0
        }

        avgs.push(avg)
        losses.push(loss)
        vals.push(val)
        lots.push(lot)
        movingVals.push(movingVal)
        
        if(ratios.length === idx+1) {
            lossValue      = loss + (movingVal * ((avg - plan.cls[ratios.length - 2]) / avg))
            lossPercentage = lossValue / vals.reduce((acc, val) => acc+val, 0) * 100
        }
    })

    let projections : ProfitProj[][] = [] 
    let totalRatio  : number = 0
    let ratioFreq   : number = 0

    for(let i = 0; i < avgs.length-1; i++) {
        let row : ProfitProj[] = []

        for(let j = 0; j < plan.tps.length; j++) {
            let per = (plan.tps[j] - avgs[i]) / avgs[i] * 100
            let val = movingVals[i] * per / 100
            let rat = val / lossValue

            totalRatio += rat
            ratioFreq++

            row.push({
                sellPrice  : plan.tps[j],
                value      : val,
                ratio      : rat,
                percentage : per
            })
        }

        projections.push(row)
    }

    return ({
        name   : name,
        ratios : ratios,
        lots   : lots,
        vals   : vals,
        avgs   : avgs,
        movingVals : movingVals,
        losses     : losses,
        projections     : projections,
        lossValue       : lossValue,
        lossPercentage  : lossPercentage,
        projectionScore : totalRatio / ratioFreq
    })
}

export default calcProjection