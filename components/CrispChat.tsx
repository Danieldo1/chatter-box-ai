'use client'

import { useEffect } from "react"
import {Crisp} from 'crisp-sdk-web'

const CrispChat = () => {
    useEffect(() => {
       Crisp.configure("74ab8ae4-0b33-470c-93bb-1420c9117728") 
    },[])
  return null
}

export default CrispChat