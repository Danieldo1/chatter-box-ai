// 'use client'

import {useEffect, useState} from "react"
import { Card, CardContent } from "./ui/card"
import { MAX_FREE_COUNTS } from "@/constants"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { ZapIcon } from "lucide-react"
import { useProModal } from "@/hooks/UseProModal"

interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean
}

const FreeCounter = ({apiLimitCount = 0, isPro=false}: FreeCounterProps) => {

    const proModel = useProModal()
    const [mounted,setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    })

    if(!mounted) {
        return null
    }

    if(isPro) {
        return null
    }


  return (
    <div className="px-3">
        <Card className="bg-white/10 border-0">
            <CardContent className="py-6">
                <div className="text-center text-sm text-white mb-4 space-y-2 ">
                    <p>
                        {apiLimitCount} out of {MAX_FREE_COUNTS} Free Generations
                    </p>

                    <Progress 
                    className="h-3"
                    value={(apiLimitCount / MAX_FREE_COUNTS) * 100}

                    />
                </div>

                <Button 
                className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-[#000000] rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200  focus:ring-2 focus:outline-none focus:ring-red-100 "
                onClick={() => proModel.onOpen()}
                >
                
                    <ZapIcon className="w-5 h-5 mr-2 fill-black group-hover:fill-[#ffffff] group-hover:text-white " />
                    <span className="relative px-0 py-2.5 transition-all ease-in duration-150 bg-transparent rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                    Become Pro
                    </span>
                </Button>
                
            </CardContent>
        </Card>
    </div>
  )
}

export default FreeCounter