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

const PriceInput = ({
    plan,
    setPlan,
    errs
} : Props) => (

    <Input 
        name="price"
        label="price"
        className="mb-8"
        inputClass="pl-10"
        error={errs && errs.price}
        value={numberWithCommas(plan.price)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) : void => {
            setPlan({...plan, price : extractNumber(e.target.value)})
        }}
    >
        <Input.Logo className='left-3'>
            Rp.
        </Input.Logo>
    </Input>
)

export default PriceInput