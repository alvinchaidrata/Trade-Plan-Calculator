import { useState } from "react"
import { Projection } from "../types"
import ProjectionCard from "./ProjectionCard"

interface Props {
    others : Projection[]
}

const OtherProjections = ({
    others
} : Props) => {
    const [selected, setSelected] = useState<Projection>(others[0])

    return (
        <div className='flex flex-col gap-y-2'>
            <h2 className="font-semibold text-xl">
                Other Projections
            </h2>

            <div className="flex flex-col gap-y-4">
                <div className='flex items-center gap-x-4'>
                    {others.map((other : Projection, idx) => (
                        <button
                            key={idx}
                            className={`
                                ${selected.name === other.name ? 'bg-primary text-secondary' : 'hover:bg-primary hover:text-secondary transition'}
                                px-5 py-2 border border-primary rounded-md font-semibold
                            `}
                            onClick={() => setSelected(other)}
                        >
                            {other.name}
                        </button>
                    ))}
                </div>
                <ProjectionCard proj={selected} />
            </div>
        </div>
    )
}

export default OtherProjections