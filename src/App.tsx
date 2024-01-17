import { useState } from "react"
import { Plan, Projection } from "./types"
import calcProjection from "./lib/calculateProjection"
import PageLayout from "./Components/PageLayout"
import PlanComponent from "./Components/PlanComponent"
import BestProjection from "./Components/BestProjection"
import OtherProjections from "./Components/OtherProjections"

const App = () => {
    const [best, setBest]     = useState<Projection | null>(null)
    const [others, setOthers] = useState<Projection[] | null>(null)

    const findBestPlan = (plan : Plan) => {
        let plans = [
            calcProjection(plan, [3, 7], '3-7'),
            calcProjection(plan, [5, 5], '5-5'),
            calcProjection(plan, [1.5, 1.5, 7], '1.5-1.5-7'),
            calcProjection(plan, [2, 3, 5], '2-3-5'),
        ]

        let losers      : Projection[] = []
        let currentBest : Projection   = plans[0]
        for(let i = 1; i < plans.length; i++) {
            if(currentBest.projectionScore < plans[i].projectionScore) {
                losers      = [...losers, currentBest]
                currentBest = plans[i]
            } else {
                losers = [...losers, plans[i]]
            }
        }

        setBest(currentBest)
        setOthers(losers)
    }

    return (
        <PageLayout>
            <div className='flex flex-col gap-y-10'>
                <PlanComponent findBestPlan={findBestPlan} />

                {best &&
                    <BestProjection best={best} />
                }

                {others &&
                    <OtherProjections others={others} />
                }
            </div>
        </PageLayout>
    )
}

export default App