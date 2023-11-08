'use client'
import { Montserrat } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Bot, ImageIcon, VideoIcon, Music, Code, UserCog, User2, Frown } from "lucide-react"
import { usePathname } from "next/navigation"
import FreeCounter from "./FreeCounter"

const montserrat = Montserrat({weight: '600', subsets: ['latin']})

const routes = [
    {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: 'text-sky-500',
    },
    {
        label: "Conversation",
        icon: Bot,
        href: "/conversation",
        color: 'text-violet-500',
    },
    {
        label: "Mean Assistant",
        icon: Frown,
        href: "/person",
        color: 'text-yellow-700',
    },
    {
        label: "Image Generator",
        icon: ImageIcon,
        href: "/image",
        color: 'text-pink-700',
    },
    {
        label: "Video Generator",
        icon: VideoIcon,
        href: "/video",
        color: 'text-orange-700',
    }, {
        label: "Music Generator",
        icon: Music,
        href: "/music",
        color: 'text-emerald-500',
    },
    {
        label: "Code Generator",
        icon: Code,
        href: "/code",
        color: 'text-green-700',
    },
   
    {
        label: "Settings",
        icon: UserCog,
        href: "/settings",
        
    },
]

interface SidebarProps {
    apiLimitCount: number
    isPro: boolean
}

const Sidebar = ({apiLimitCount = 0, isPro=false}: SidebarProps) => {
    const pathname = usePathname()
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
       <div className="px-3 py-2 flex-1">
        <Link href='/dashboard' className="flex items-center pl-3 mb-14">
        <div className="relative w-8 h-8 mr-4">
            <Image 
            src="/logo.png"
            fill
            alt="logo"
            />
        </div>
        <h1 className={cn('text-2xl font-bold', montserrat.className)}>ChatterBox</h1>
        </Link>

        <div className="space-y-1">
            {routes.map((route) => (
            <Link 
            href={route.href} 
            key={route.href}
            className={cn("text-lg group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
            pathname=== route.href ? "bg-white/10" : 'bg-transparent'
            )}
            >
            <div className="flex items-center flex-1">
                <route.icon className={cn('w-5 h-5 mr-3',route.color  )} />
                <span className={route.color}>{route.label}</span>
            </div>
             </Link>
            ))}
        </div>
       </div>

       <FreeCounter 
       apiLimitCount={apiLimitCount}
       isPro={isPro}
       />
    </div>
  )
}

export default Sidebar