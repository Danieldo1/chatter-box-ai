'use client'

import { ZapIcon } from "lucide-react"
import { Button } from "./ui/button"
import axios from "axios"
import {useState} from "react"
import toast from "react-hot-toast"

interface SubscriptionButtonProps {
    isPro: boolean
}



const SubscriptionButton = ({isPro = false}: SubscriptionButtonProps) => {
const [loading, setLoading] = useState(false)

const onClick = async () => {
    
    try {
        setLoading(true)
        const response = await axios.get('/api/stripe')
        window.location.href = response.data.url
    } catch (error) {
        toast.error("Something went wrong, please try again later")
    } finally {
        setLoading(false)
    }

}

  return (
    <Button variant={isPro? 'default' : 'premium'}
    disabled={loading}
    onClick={onClick}
    >
        {!isPro && <ZapIcon className="w-5 h-5 mr-2 fill-black text-black group-hover:text-white group-hover:fill-white" /> }
        {isPro ? "Manage your plan" : "Become Pro"}
    </Button>
  )
}

export default SubscriptionButton