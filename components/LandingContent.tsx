'use client'

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"


const testimonials = [
    {
    name: "Daniil",
    avatar: 'https://i.ibb.co/SnxCR4P/Untitled-design-1.png',
    title: "ChatterBox Developer",  
    description: 'ChatterBox is a great platform to build your next project with.',  
    },
    {
        name: "Sara",
        avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
        title: "UI/UX Designer",
        description: 'ChatterBox helps me create intuitive and visually appealing user interfaces.',
      },
      {
        name: "Mike",
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        title: "Data Scientist",
        description: 'ChatterBox is a valuable tool for analyzing and extracting insights from data.',
      },
      {
        name: "Emily",
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        title: "Content Writer",
        description: 'ChatterBox streamlines my writing process, making content creation a breeze.',
      }
]

const LandingContent = () => {
  return (
    <div className="px-10 pb-16">
        <h2 className="text-4xl text-white text-center font-extrabold mb-10">
            Testimonials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item) => (
                <Card key={item.description} {...item} className="bg-[#192339] border-none text-white">
                <CardHeader>
                    <div className="flex items-center justify-between gap-x-2">
                        <div>
                            <p className="text-lg">{item.name}</p>
                            <p className="text-zinc-400 text-sm">{item.title}</p>
                        </div>
                        <Image 
                            src={item.avatar}
                            alt="logo"
                            width={65}
                            height={65}
                            className="rounded-full ml-5"
                        />
                    </div>
                </CardHeader>
                <CardContent className="pt-4 px-4">
                    Review: <br/>
                    {item.description}
                </CardContent>
            </Card>
            ))}
        </div>
    </div>
  )
}

export default LandingContent