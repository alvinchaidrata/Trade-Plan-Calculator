import { PropsWithChildren } from "react"

const PageLayout = ({
    children
} : PropsWithChildren) => (
    <div className='min-w-screen min-h-screen bg-secondary text-primary font-poppins'>
        <div className='max-w-3xl mx-auto p-5'>
            <h1 className='mb-12 text-3xl font-bold text-center'>
                Trade plan calculator
            </h1>
            
            {children}
        </div>
    </div>
)

export default PageLayout