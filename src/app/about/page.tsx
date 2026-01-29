import about from "@/constants/aboutContent.json"

// Components
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import AboutHero from "@/components/about/AboutHero"
import ValuesGrid from "@/components/about/ValuesGrid"
import TeamGrid from "@/components/about/TeamGrid"
import WorkshopSection from "@/components/about/WorkshopSection"
import StatsStrip from "@/components/about/StatsStrip"

export default function AboutPage() {
    return (
        <div className="py-8 md:py-12 container-custom">
            <Breadcrumbs  />

            <AboutHero
                titleHTML={about.hero.title}
                paragraphs={about.hero.paragraphs}
                image={about.hero.image}
            />

            <ValuesGrid
                title={about.values.title}
                description={about.values.description}
                items={about.values.items.map(item => ({
                    ...item,
                    icon: item.icon as "Heart" | "Award" | "Sparkles" | "Users"
                }))}
            />

            <TeamGrid
                title={about.team.title}
                description={about.team.description}
                members={about.team.members}
            />

            <WorkshopSection
                title={about.workshop.title}
                image={about.workshop.image}
                paragraphs={about.workshop.paragraphs}
                bullets={about.workshop.bullets}
            />

            <StatsStrip stats={about.stats} />
        </div>
    )
}
