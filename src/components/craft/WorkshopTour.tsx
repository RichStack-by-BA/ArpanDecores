import Image from "next/image";
import { Button } from "@/components/ui/Button";

const WorkshopTour: React.FC = () => {
    return (
        <section className="py-16 bg-secondary/10">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="heading-lg">Visit Our Workshop</h2>
                        <p className="body-md text-muted-foreground">
                            Experience the craft process firsthand with a guided tour of our workshop. Watch our artisans at work,
                            learn about our techniques, and discover the story behind our creations.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span>Guided tours available Tuesday-Saturday</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span>Hands-on workshops for small groups</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span>Personalized consultation for custom orders</span>
                            </li>
                        </ul>
                        <Button className="bg-brass-gradient text-white shadow-brass hover:shadow-brass-lg">
                            Schedule a Visit
                        </Button>
                    </div>
                    <div className="relative h-[400px] rounded-md overflow-hidden shadow-soft-lg">
                        <Image
                            src="/placeholder.svg?height=600&width=800&text=Our+Workshop"
                            alt="Our workshop"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkshopTour;
