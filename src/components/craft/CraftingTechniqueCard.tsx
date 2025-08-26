import Image from "next/image";

type CraftingTechniqueCardProps = {
  name: string;
  description: string;
  image: string;
  years: string;
};

const CraftingTechniqueCard: React.FC<CraftingTechniqueCardProps> = ({ name, description, image, years }) => {
  return (
    <div className="bg-card rounded-md overflow-hidden shadow-soft border border-primary/10">
      <div className="relative h-64">
        <Image src={image} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-heading font-semibold text-2xl text-white mb-1">{name}</h3>
          <div className="text-xs text-white/80 font-medium">{years}</div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default CraftingTechniqueCard;
