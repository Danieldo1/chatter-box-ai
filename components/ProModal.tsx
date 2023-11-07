'use client'

import { useProModal } from "@/hooks/UseProModal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import {  Bot, ImageIcon, Code, Music,VideoIcon,Check,ZapIcon } from "lucide-react"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import axios from "axios"
import {useState} from "react"



const tools = [
    {
      label: 'Conversation',
      icon: Bot,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10',
     
    },
    {
      label: 'Music Generation',
      icon: Music,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      href: '/music'
    },
    {
      label: 'Image Generation',
      icon: ImageIcon,
      color: 'text-pink-700',
      bgColor: 'bg-pink-700/10',
    },
    {
      label: 'Video Generation',
      icon: VideoIcon,
      color: 'text-orange-700',
      bgColor: 'bg-orange-700/10',
    },
    {
      label: 'Code Generator',
      icon: Code,
      color: 'text-green-700',
      bgColor: 'bg-green-700/10',
      
    },
   
  ]

const ProModal = () => {

    const [loading, setLoading] = useState(false)
    const proModal = useProModal()

    const onSubscribe = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/stripe')
        window.location.href = response.data.url
      } catch (error) {
        console.log(error,"STRIPE_CLIENT_ERROR")
      } finally {
        setLoading(false)
      }



    }
  return (
   <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                <div className="flex items-center gap-x-2 font-bold py-1">

                Become a ChatterBox
                <Badge className="uppercase text-sm py-1 text-white " variant={"premium"}>
                    Pro
                </Badge>
                </div>
            </DialogTitle>
                <p className="text-bold px-1 text-lg">Unlock all features: </p>
                <DialogDescription className="text-center pt-2 spacey2 text-zinc-900 font-medium">
                    {tools.map((tool) => (
                        <Card key={tool.label} className="p-3 mt-2 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                            <div className="flex items-center gap-x-4">
                                <div className={cn('p-2 w-fit rounded-md ',tool.bgColor )}>
                                    <tool.icon className={cn('w-6 h-6',tool.color )} />
                                </div>
                                <div className="font-semibold text-md">
                                    {tool.label} 
                                </div>
                            </div>

                            <span className="text-sm text-zinc-500 justify-end items-end px-4 mx-auto"><em>Unlimited</em></span>
                            <Check className="text-primary w-5 h-5 justify-end " />
                        </Card>
                    ))}
                </DialogDescription>
        </DialogHeader>

        <DialogFooter>
            <Button size={"lg"} className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-[#000000] rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200  focus:ring-2 focus:outline-none focus:ring-red-100 "
            onClick={onSubscribe}
            >
                
                <ZapIcon className="w-5 h-5 mr-2 fill-black group-hover:fill-[#ffffff] group-hover:text-white " />
                <span className="relative px-0 py-2.5 transition-all ease-in duration-150 bg-transparent rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                Get Started
                </span>
            </Button>
        </DialogFooter>
    </DialogContent>
   </Dialog>
  )
}

export default ProModal