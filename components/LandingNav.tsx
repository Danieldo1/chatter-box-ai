'use client'
import {Montserrat} from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import {  PencilLine } from 'lucide-react'

const font = Montserrat({weight: '600' ,subsets: ['latin'] })

const LandingNav = () => {
    const {isSignedIn} = useAuth()

  return (
    <nav className='p-4 bg-transparent flex items-center justify-between'>
        <Link href='/' className='flex items-center'>
            <div className='relative w-8 h-8 mr-4'>
                <Image 
                src="/logo.png"
                fill
                alt="logo"
                />
            </div>
            <h1 className={cn('text-2xl font-bold text-white', font.className)}>ChatterBox</h1>
        </Link>

        <div className='flex items-center space-x-2'>
            <Link href={isSignedIn? '/dashboard' : '/sign-up'} 
            >
                <Button
                variant='outline'
                className='rounded-full'
                >

                <PencilLine className='w-5 h-5 mr-1'/>
                {isSignedIn ? "Dashboard" : "Get Started"}
                </Button>
            </Link>
        </div>
    </nav>
  )
}

export default LandingNav