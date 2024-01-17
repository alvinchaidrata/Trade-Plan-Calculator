import { ProfitProj, Projection } from "../types"
import numberWithCommas from "../lib/numberWithCommas"

interface Props {
    proj : Projection
}

const ProjectionCard = ({
    proj
} : Props) => (
    <div className='border border-primary/30 rounded-md flex flex-col divide-y divide-primary/30'>
        <h1 className="p-5 text-2xl font-bold">
            {proj.name}
        </h1>
        
        <div className='p-5 flex flex-col gap-y-4'>
            <h2 className="w-full pb-2 font-semibold text-lg border-b border-primary/30">
                Buy planning
            </h2>
            <div className='grid grid-cols-2 gap-2'>
                {proj.avgs.map((avg : number, idx : number) => (
                    <div 
                        key={idx}
                        className="border border-primary/30 rounded-md p-3 flex flex-col gap-y-1"
                    >
                        <h3 className="font-semibold">
                            BUY {numberWithCommas(avg)}
                        </h3>
                        <div className='flex items-center gap-x-2'>
                            <span>Lot :</span>
                            <span className='font-semibold'>{numberWithCommas(proj.lots[idx])}</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <span>Value :</span>
                            <span className='font-semibold'>Rp. {numberWithCommas(Math.floor(proj.vals[idx]))}</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <span>Moving Value :</span>
                            <span className='font-semibold'>Rp. {numberWithCommas(Math.floor(proj.movingVals[idx]))}</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <span>Loss :</span>
                            <span className='font-semibold text-danger'>Rp. {numberWithCommas(Math.floor(proj.losses[idx]))}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className='p-5 flex flex-col gap-y-4'>
            <h2 className="w-full pb-2 font-semibold text-lg border-b border-primary/30">
                Profit projections
            </h2>
            {proj.projections.map((rows : ProfitProj[], rIdx : number) => (
                <div
                    key={rIdx}
                    className="flex flex-col gap-y-4"
                >
                    <h2 className="font-semibold">Avg = {numberWithCommas(proj.avgs[rIdx])}</h2>
                    <div className='grid grid-cols-2 gap-2'>
                        {rows.map((profit : ProfitProj, pIdx : number) => (
                            <div 
                                key={pIdx}
                                className="border border-primary/30 rounded-md p-3 flex flex-col gap-y-1"
                            >
                                <h3 className="font-semibold">
                                    TP {numberWithCommas(profit.sellPrice)}
                                </h3>
                                <div className='flex items-center gap-x-2'>
                                    <span>Value :</span>
                                    <span className='font-semibold text-confirm'>Rp. {numberWithCommas(Math.floor(profit.value))}</span>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <span>Percentage :</span>
                                    <span className='font-semibold text-confirm'>{numberWithCommas(profit.percentage)} %</span>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <span>Score :</span>
                                    <span className={`${profit.value < 1 ? 'text-danger' : 'text-confirm'} font-semibold`}>
                                        {numberWithCommas(profit.ratio)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <div className='p-5 flex flex-col gap-y-1'>
            <div className='flex items-center gap-x-2'>
                <span>Total Position Amount :</span>
                <span className='font-semibold'>
                    Rp. {numberWithCommas(Math.floor(proj.vals.reduce((acc, val) => acc+val, 0)))}
                </span>
            </div>
            <div className='flex items-center gap-x-2'>
                <span>Potential Loss :</span>
                <span className='text-danger font-semibold'>
                    Rp. {numberWithCommas(Math.floor(proj.lossValue))}
                </span>
            </div>
            <div className='flex items-center gap-x-2'>
                <span>Potential Loss Percentage :</span>
                <span className='text-danger font-semibold'>
                    -{numberWithCommas(proj.lossPercentage)} %
                </span>
            </div>
            <div className='flex items-center gap-x-2'>
                <span>Score :</span>
                <span className={`${proj.projectionScore < 1 ? 'text-danger' : 'text-confirm'} font-semibold`}>
                    {numberWithCommas(proj.projectionScore)}
                </span>
            </div>
        </div>
    </div>
)

export default ProjectionCard