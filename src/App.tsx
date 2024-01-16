import React, { useState, useEffect } from "react"

interface Plan {
    amount : number
    price  : number
    supps  : number[]
    tps    : number[]  
    cl     : number
}

interface ProfitProj {
    value      : number
    percentage : number
    ratio      : number
}

interface Projection {
    ratios : number[]
    lots   : number[]
    vals   : number[]
    avgs   : number[]
    movingVals : number[]
    losses     : number[]
    projections    : ProfitProj[][]
    lossValue      : number
    lossPercentage : number
}

const App = () => {
    const [plan, setPlan] = useState<Plan>({
        amount : 1000000,
        price  : 100,
        supps  : [90,80],
        tps    : [110,114],
        cl     : 88
    })

    const [proj, setProj] = useState<Projection | null>(null)

    const calcProjection = (ratios : number[]) => {
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
                movingVal = avg * (lots[idx-1] + lot)
                loss      = movingVals[idx-1] * ((avgs[idx-1] - prices[idx]) / avgs[idx-1])
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
                lossValue      = movingVal * ((avg - plan.cl) / avg) * 100
                lossPercentage = lossValue / vals.reduce((acc, val) => acc+val, 0) * 100
            }
        })

        

        let projections : ProfitProj[][] = [] 
        plan.tps.forEach((tp : number) => {
            let row : ProfitProj[] = []

            for(let i = 0; i < ratios.length-1; i++) {
                let per = (tp - avgs[i]) / avgs[i] * 100
                let val = movingVals[i] * per / 100
                let rat = val / lossValue

                row.push({
                    value : val,
                    ratio : rat,
                    percentage : per
                })
            }

            projections.push(row)
        })

        setProj({
            ratios : ratios,
            lots   : lots,
            vals   : vals,
            avgs   : avgs,
            movingVals : movingVals,
            losses     : losses,
            projections    : projections,
            lossValue      : lossValue,
            lossPercentage : lossPercentage
        })

        console.log({
            ratios : ratios,
            lots   : lots,
            vals   : vals,
            avgs   : avgs,
            movingVals : movingVals,
            losses     : losses,
            projections    : projections,
            lossValue      : lossValue,
            lossPercentage : lossPercentage
        })
    }

    useEffect(() => calcProjection([3,7]), [])

    return (
        <div className='p-5 flex flex-col gap-y-8'>
            
        </div>
    )
}

export default App;