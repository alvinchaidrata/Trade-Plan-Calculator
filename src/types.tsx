export interface Plan {
    amount : number
    price  : number
    supps  : number[]
    tps    : number[]  
    cls    : number[]
}

export interface ProfitProj {
    sellPrice  : number
    value      : number
    percentage : number
    ratio      : number
}

export interface Projection {
    name   : string
    ratios : number[]
    lots   : number[]
    vals   : number[]
    avgs   : number[]
    movingVals : number[]
    losses     : number[]
    projections     : ProfitProj[][]
    lossValue       : number
    lossPercentage  : number
    projectionScore : number
}

export interface Errors {
    amount? : string
    price?  : string
    tps?    : string
    supps?  : string
    cls?    : string
}