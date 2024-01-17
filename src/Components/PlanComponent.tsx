import { useState } from "react"
import { Plan, Errors } from "../types"
import validateInputs from "../lib/validateInputs"
import AmountInput from "./InputComponents/AmountInput"
import PriceInput from "./InputComponents/PriceInput"
import ProfitInputs from "./InputComponents/ProfitInputs"
import SupportInputs from "./InputComponents/SupportInput"
import LossInputs from "./InputComponents/LossInputs"

interface Props {
    findBestPlan : Function
}

const PlanComponent = ({
    findBestPlan
} : Props) => {
    const [plan, setPlan] = useState<Plan>({
        amount : 0,
        price  : 0,
        supps  : [0, 0],
        tps    : [],
        cls    : [0, 0]
    })

    const [errs, setErrs] = useState<Errors | null>(null)

    return (
        <div className='flex flex-col gap-y-2'>
            <h2 className="font-semibold text-xl">
                Plan values
            </h2>
            <div className='border border-primary/30 p-5 rounded-md flex flex-col'>
                <AmountInput
                    plan={plan}
                    setPlan={setPlan}
                    errs={errs} 
                />
                <PriceInput
                    plan={plan}
                    setPlan={setPlan}
                    errs={errs} 
                />

                <ProfitInputs
                    plan={plan}
                    setPlan={setPlan}
                    errs={errs} 
                />

                <div className="mb-12 flex gap-x-6">
                    <SupportInputs
                        plan={plan}
                        setPlan={setPlan}
                        errs={errs} 
                    />

                    <LossInputs
                        plan={plan}
                        setPlan={setPlan}
                        errs={errs} 
                    />
                </div>

                <button
                    type="button" 
                    className='w-full px-4 py-2 text-center font-semibold border border-primary rounded-md hover:bg-primary hover:text-secondary transition'
                    onClick={() => {
                        let errors = validateInputs(plan)

                        if(errors) {
                            setErrs(errors)
                        } else {
                            setErrs(null)
                            findBestPlan(plan)
                        }
                    }}
                >
                    Calculate Projections
                </button>
            </div>
        </div>
    )
}

export default PlanComponent