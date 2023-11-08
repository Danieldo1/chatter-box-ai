'use client';

import * as z from 'zod';
import Heading from "@/components/Heading";
import { Frown, MessageSquare } from "lucide-react";
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
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/UserAvatar';
import { BotAvatar } from '@/components/BotAvatar';
import { useProModal } from '@/hooks/UseProModal';
import toast from 'react-hot-toast';


const Person = () => {
    const proModal=useProModal()
    const [placeholder, setPlaceholder] = useState('');
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const router = useRouter();

    useEffect(() => {
        const placeholders = [
          "Ask me like I'm thrilled to listen...",
          "Share your thoughts... or not, it's your world.",
          "What's on your mind today, the extraordinary?",
          "Type your curiosity, because it's a real gem.",
          "Let's chat with the excitement of a snail.",
          "Your wish is my command... within reason, of course.",
          "Tell a story, ask, or share, if you absolutely must.",
          "The chat stage is yours. The mind-blowing topic?",
          "You're in control, but don't expect fireworks.",
          "Unleash your curiosity here, like it's a new age.",
          "What's the buzz? Share it; I'll try not to snooze.",
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
            
            
        const userMessage: ChatCompletionMessageParam = {
            role: "user",
            content: values.prompt
        }
        const newMessages = [...messages, userMessage]

        const response = await axios.post('/api/person', {
            messages: newMessages
        })

        setMessages((current)=>[
            ...current,
            userMessage,
            response.data
        ])

        form.reset()

        } catch (error:any) {
            
        if(error?.response?.status === 403){
            proModal.onOpen()
        } else {
            toast.error("Something went wrong, please try again later")
        }
        } finally{
            router.refresh()
        }

    }

    return ( 
        <div>
            <Heading 
            title="Mean Assistant"
            description="Don't expect me to be polite"
            icon={Frown}
            iconColor="text-yellow-500"
            bgColor="bg-yellow-500/10"
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

                    {messages.length === 0 && !isLoading &&  (
                        <Empty label='No messages yet' />
                    )}
                    <div className='flex flex-col-reverse gap-y-4'>
                        {messages.map((message) => (
                        <div key={message.content}
                        className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg',
                        message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                        )}                       
                         >
                            {message.role === 'user' ? <UserAvatar/> : <BotAvatar/>}
                            <p className='text-sm'>
                            {message.content}
                            </p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Person ;