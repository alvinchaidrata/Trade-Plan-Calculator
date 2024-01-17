import React from "react"
import { IoMdAdd } from "react-icons/io"
import { Plan, Errors } from "../../types"
import numberWithCommas from "../../lib/numberWithCommas"
import extractNumber from "../../lib/extractNumber"
import Input from "./Input"

interface Props {
    plan    : Plan
    setPlan : React.Dispatch<React.SetStateAction<Plan>>
    errs    : Errors | null
}

const ProfitInputs = ({
    plan,
    setPlan,
    errs
} : Props) => (
    <div className="mb-8">
        <h3 className={`mb-2 font-semibold`}>Profit points</h3>
        <div className='flex flex-col gap-y-2'>
            {plan.tps.map((tp : number, idx : number) => (
                <Input 
                    key={idx}
                    name={`tp${idx}`}
                    inputClass="pl-10"
                    value={numberWithCommas(tp)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) : void => {
                        let updated  = plan.tps
                        updated[idx] = extractNumber(e.target.value)
                        setPlan({...plan, tps : updated})
                    }}
                >
                    <Input.Logo className='left-3'>
                        Rp.
                    </Input.Logo>
                </Input>
            ))}
            <button
                type="button"
                className='p-1 flex items-center gap-x-2'
                onClick={() => setPlan({...plan, tps: [...plan.tps, 0]})}
            >
                <IoMdAdd className='w-4 h-4' />
                <span className="text-xs">Add point</span>
            </button>
            {errs && errs.tps &&
                <p className="text-xs text-danger">
                    {errs.tps}
                </p>
            }
        </div>
    </div>
)

export default ProfitInputs