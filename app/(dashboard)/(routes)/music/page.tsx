'use client';

import * as z from 'zod';
import Heading from "@/components/Heading";
import {  Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessageParam } from "openai/resources/chat/completions"

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { useProModal } from '@/hooks/UseProModal';
import toast from 'react-hot-toast';



const MusicPage = () => {
    const proModal=useProModal()
    const [placeholder, setPlaceholder] = useState('');
    const [music, setMusic] = useState<string>();
    const router = useRouter();

    useEffect(() => {
        const placeholders = [
            "Ask me anything about music!",
            "Share your music thoughts or questions...",
            "What's on your mind in music?",
            "Type your music curiosity...",
            "Let's chat about music!",
            "Your musical wishes, start typing!",
            "Tell me a music story or question...",
            "The stage is yours for music.",
            "How can I assist your music journey?",
            "Unleash your musical curiosity...",
            "Share the music buzz here!",
            "Let's talk music!",
            "I'm all ears for your music input!"
          ];        const randomIndex = Math.floor(Math.random() * placeholders.length);
        setPlaceholder(placeholders[randomIndex]);
      }, []);

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver:zodResolver(formSchema),

        defaultValues:{
            prompt:""
        }
    })


    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        console.log(values)

        try {
            
       setMusic(undefined)

        const response = await axios.post('/api/music',values)

       setMusic(response.data.audio)

        form.reset()

        } catch (error:any) {
            if(error?.response?.status === 403){
                proModal.onOpen()
            }else {
                toast.error("Something went wrong, please try again later")
            }
        } finally{
            router.refresh()
        }

    }

    return ( 
        <div>
            <Heading 
            title="Music Generation"
            description="Turn your prompt into music"
            icon={Music}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
            />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                        className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                        >
                            <FormField 
                            name='prompt'
                            render={({field}) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input 
                                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent '
                                        disabled={isLoading}
                                        placeholder={placeholder}
                                        {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full'
                            disabled={isLoading}
                            >
                                Send
                            </Button>
                        </form>
                    </Form>
                </div>


                <div className='space-y-4 mt-4 '>

                    {isLoading && (
                        <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )}

                    {!music && !isLoading &&  (
                        <Empty label='No tunes yet' />
                    )}

                  {music && (
                    <audio controls 
                    className='w-full mt-8'
                    >
                    <source src={music} />
                    </audio>
                  )}
                </div>
            </div>
        </div>
     );
}
 
export default MusicPage ;