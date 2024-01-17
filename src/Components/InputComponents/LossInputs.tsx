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

const LossInputs = ({
    plan,
    setPlan,
    errs
} : Props) => (
    <div className='w-full flex flex-col gap-2'>
        <h3 className='font-semibold'>Loss points</h3>
        {plan.cls.map((cl : number, idx : number) => (
            <Input 
                key={idx}
                name={`cl${idx}`}
                inputClass="pl-10"
                value={numberWithCommas(cl)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) : void => {
                    let updated  = plan.cls
                    updated[idx] = extractNumber(e.target.value)
                    setPlan({...plan, cls : updated})
                }}
            >
                <Input.Logo className='left-3'>
                    Rp.
                </Input.Logo>
            </Input>
        ))}
        {errs && errs.cls &&
            <p className="text-xs text-danger">
                {errs.cls}
            </p>
        }
    </div>
)

export default LossInputs