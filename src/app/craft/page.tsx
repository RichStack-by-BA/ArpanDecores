import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CraftingTechniqueCard from "@/components/craft/CraftingTechniqueCard";
import ArtisanCard from "@/components/craft/ArtisanCard";
import WorkshopTour from "@/components/craft/WorkshopTour";
import craftingTechniques from "@/constants/craftingTechniques.json";
import HeroSection from "@/components/craft/HeroSection";
import CraftingProcessStep from "@/components/craft/CraftingProcessStep";

export default function CraftPage() {
    return (
        <div className="py-8 md:py-12">
            {/* Breadcrumbs */}
            <HeroSection
                heading="The Art of"
                description="At Arpan Decores, we preserve traditional crafting techniques while embracing innovation. Each piece tells a story of skill, patience, and dedication passed down through generations."
                imageSrc="/images/craft-hero.jpg" // Assuming a path to your hero image
            />

            {/* Crafting Process Steps */}
            <section className="py-16 bg-background">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="heading-lg mb-4">Our Craft Process</h2>
                        <p className="body-md text-muted-foreground max-w-2xl mx-auto">
                            Every piece we create follows a meticulous journey from concept to completion
                        </p>
                    </div>

                    <div className="space-y-16">
                        <CraftingProcessStep
                            stepNumber={1}
                            title="Material Selection"
                            description="We begin by carefully selecting premium materials from sustainable sources. Each wood, metal, and fabric is chosen for its quality, character, and suitability for the intended piece."
                            imageSrc="/images/craft-materials.jpg"
                        />
                        <CraftingProcessStep
                            stepNumber={2}
                            title="Artisan Design"
                            description="Our skilled artisans sketch and plan each piece, blending traditional techniques with contemporary aesthetics. For custom orders, we work closely with clients to bring their vision to life."
                            imageSrc="/images/craft-design.jpg"
                        />
                        <CraftingProcessStep
                            stepNumber={3}
                            title="Meticulous Crafting"
                            description="Every item is handcrafted with precision and care, with artisans dedicating hours to perfect each detail. This stage is where the magic happens, as raw materials transform into beautiful creations."
                            imageSrc="/images/craft-making.jpg"
                        />
                        <CraftingProcessStep
                            stepNumber={4}
                            title="Quality Assurance"
                            description="Each piece undergoes rigorous quality checks to ensure it meets our exacting standards before reaching you. We inspect every detail, ensuring perfection in both form and function."
                            imageSrc="/images/craft-quality.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* Crafting Techniques */}
            <section className="py-16 bg-secondary/5">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="heading-lg mb-4">Our Crafting Techniques</h2>
                        <p className="body-md text-muted-foreground max-w-2xl mx-auto">
                            Traditional methods preserved and perfected over generations
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {craftingTechniques.craftingTechniques.map((technique) => (
                            <CraftingTechniqueCard
                                key={technique.id}
                                name={technique.name}
                                description={technique.description}
                                image={technique.image}
                                years={technique.years}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet Our Artisans */}
            <section className="py-16 bg-background">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="heading-lg mb-4">Meet Our Master Artisans</h2>
                        <p className="body-md text-muted-foreground max-w-2xl mx-auto">
                            The skilled hands and creative minds behind every Arpan Decores creation
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {craftingTechniques.artisans.map((artisan) => (
                            <ArtisanCard
                                key={artisan.id}
                                name={artisan.name}
                                specialty={artisan.specialty}
                                experience={artisan.experience}
                                bio={artisan.bio}
                                image={artisan.image}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Workshop Tours */}
            <WorkshopTour />
        </div>
    );
}
