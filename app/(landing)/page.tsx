import LandingContent from "@/components/LandingContent"
import LandingHero from "@/components/LandingHero"
import LandingNav from "@/components/LandingNav"


const LandingPage = () => {
    return (
        <div className=" h-full">
            <LandingNav />
            <LandingHero />
            <LandingContent />
        </div>
    )
}

export default LandingPage