'use client'

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import TypewriterComponent from 'typewriter-effect'
import { Button } from "./ui/button"


const LandingHero = () => {
const {isSignedIn} = useAuth()


  return (
    <div className="text-white font-bold py-16 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl space-y-5 font-extrabold">
            <h1>The best AI tool for</h1>
            <div className="text-transparent py-2 bg-clip-text bg-gradient-to-br from-red-200 via-red-300 to-yellow-200">
                <TypewriterComponent 
                options={{
                    strings:[
                        "Chatbot",
                        "Code Generation",
                        "Video Generation",
                        "Image Generation",
                        "Music Generation",
                        "and more..."
                    ],
                    autoStart: true,
                    loop: true,
                    
                }}
                />
            </div>
        </div>

            <div className="text-sm md:text-xl font-light text-zinc-400">
                Create content using AI with 
                <span className="font-bold "> ChatterBox.</span>
            </div>

            <div>
                <Link href={isSignedIn? '/dashboard' : '/sign-up'}>
                    <Button variant={'premium'}
                    className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
                    >
                        Start Generating Content!
                    </Button>
                </Link>
            </div>

            <div className="text-xs md:text-sm font-normal text-zinc-400">
                No credit card required
            </div>
    </div>
  )
}

export default LandingHero