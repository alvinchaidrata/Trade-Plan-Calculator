import { Plan, Errors } from "../types"

const validateInputs = (
    plan   : Plan
) : Errors | null => {
    let errors : Errors = {}

    if(plan.amount <= 0) {
        errors.amount = 'Amount cannot be less than zero!'
    }

    if(plan.price <= 0) {
        errors.price = 'Price cannot be less than zero!'
    }

    if(plan.tps.length <= 0) {
        errors.tps = 'Please enter at least 1 point!'
    }
    
    if(plan.supps[1] >= plan.supps[0]) {
        errors.supps = 'Second support must be less than the first!'
    }
    
    if(plan.cls[1] >= plan.cls[0]) {
        errors.cls = 'Second point must be less than the first!'
    }

    if(plan.cls[0] >= plan.supps[0]) {
        errors.cls = 'Loss point must be lower than support!'
    }

    if(plan.cls[1] >= plan.supps[1]) {
        errors.cls = 'Loss point must be lower than support!'
    }

    return Object.keys(errors).length > 0 ? errors : null
}

export default validateInputs