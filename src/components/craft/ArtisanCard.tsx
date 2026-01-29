import Image from "next/image";

type ArtisanCardProps = {
    name: string;
    specialty: string;
    experience: string;
    bio: string;
    image: string;
};

const ArtisanCard: React.FC<ArtisanCardProps> = ({ name, specialty, experience, bio, image }) => {
    return (
        <div className="bg-card rounded-md overflow-hidden shadow-soft border border-primary/10">
            <div className="relative h-64">
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
            <div className="p-5">
                <h3 className="font-heading font-semibold text-xl mb-1">{name}</h3>
                <div className="text-primary text-sm font-medium mb-3">
                    {specialty} • {experience}
                </div>
                <p className="text-sm text-muted-foreground">{bio}</p>
            </div>
        </div>
    );
};

export default ArtisanCard;
