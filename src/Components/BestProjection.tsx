import { Projection } from "../types"
import ProjectionCard from "./ProjectionCard"

interface Props {
    best : Projection
}

const BestProjection = ({
    best
} : Props) => (
    <div className='flex flex-col gap-y-2'>
        <h2 className="font-semibold text-xl">
            Best Projection
        </h2>
        <ProjectionCard proj={best} />
    </div>
)

export default BestProjection