import React from "react"
import { Plan, Errors } from "../../types"
import numberWithCommas from "../../lib/numberWithCommas"
import extractNumber from "../../lib/extractNumber"
import Input from "./Input"

interface Props {
    plan    : Plan
    setPlan : React.Dispatch<React.SetStateAction<Plan>>
    errs    : Errors | null
}

const AmountInput = ({
    plan,
    setPlan,
    errs
} : Props) => (
    <Input 
        name="amount"
        label="amount"
        className="mb-4"
        inputClass="pl-10"
        error={errs && errs.amount}
        value={numberWithCommas(plan.amount)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) : void => {
            setPlan({...plan, amount : extractNumber(e.target.value)})
        }}
    >
        <Input.Logo className='left-3'>
            Rp.
        </Input.Logo>
    </Input>
)

export default AmountInput