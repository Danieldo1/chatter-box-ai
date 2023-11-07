'use client';

import * as z from 'zod';
import Heading from "@/components/Heading";
import {   VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { useProModal } from '@/hooks/UseProModal';



const VideoPage = () => {
    const proModal=useProModal()
    const [placeholder, setPlaceholder] = useState('');
    const [video, setVideo] = useState<string>();
    const router = useRouter();

    useEffect(() => {
        const placeholders = [
            "Share your video thoughts or questions...",
            "What's on your mind in videos?",
            "Type your video curiosity...",
            "Your video wishes, start typing!",
            "Tell me a video story or question...",
            "The stage is yours for videos.",
            "How can I assist your video journey?",
            "Unleash your video curiosity...",
            "Share the video buzz here!",
            "Let's talk videos!",
            "I'm all ears for your video input!"
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
            
       setVideo(undefined)

        const response = await axios.post('/api/video',values)

       setVideo(response.data[0])

        form.reset()

        } catch (error:any) {
            if(error?.response?.status === 403){
                proModal.onOpen()
            }
        } finally{
            router.refresh()
        }

    }

    return ( 
        <div>
            <Heading 
            title="Video Generation"
            description="Turn your prompt into video"
            icon={VideoIcon}
            iconColor="text-orange-700"
            bgColor="bg-orange-700/10"
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

                    {!video && !isLoading &&  (
                        <Empty label='No videos yet' />
                    )}

                  {video && (
                    <video controls 
                    className='w-full aspect-video rounded-lg mt-8 border bg-black'
                    >
                    <source src={video} />
                    </video>
                  )}
                </div>
            </div>
        </div>
     );
}
 
export default VideoPage ;