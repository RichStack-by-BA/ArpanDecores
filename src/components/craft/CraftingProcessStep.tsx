import Image from "next/image"

type CraftingProcessStepProps = {
    stepNumber: number
    title: string
    description: string
    imageSrc: string
}

const CraftingProcessStep: React.FC<CraftingProcessStepProps> = ({
    stepNumber,
    title,
    description,
    imageSrc,
}) => {
    return (
        <div className="relative">
            <div className="md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 z-10 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg mb-4 md:mb-0 mx-auto">
                {stepNumber}
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="md:text-right space-y-4 md:pr-12">
                    <h3 className="font-heading font-semibold text-2xl">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                <div className="relative h-64 rounded-md overflow-hidden shadow-soft">
                    <Image src={imageSrc} alt={title} fill className="object-cover" />
                </div>
            </div>
        </div>
    )
}

export default CraftingProcessStep
