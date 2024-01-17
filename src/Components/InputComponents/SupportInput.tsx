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

const SupportInputs = ({
    plan,
    setPlan,
    errs
} : Props) => (
    <div className='w-full flex flex-col gap-2'>
        <h3 className='font-semibold'>Supports</h3>
        {plan.supps.map((supp : number, idx : number) => (
            <Input 
                key={idx}
                name={`supp${idx}`}
                inputClass="pl-10"
                value={numberWithCommas(supp)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) : void => {
                    let updated  = plan.supps
                    updated[idx] = extractNumber(e.target.value)
                    setPlan({...plan, supps : updated})
                }}
            >
                <Input.Logo className='left-3'>
                    Rp.
                </Input.Logo>
            </Input>
        ))}
        {errs && errs.supps &&
            <p className="text-xs text-danger">
                {errs.supps}
            </p>
        }
    </div>
)

export default SupportInputs