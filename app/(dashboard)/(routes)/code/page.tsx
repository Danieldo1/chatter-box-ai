'use client';

import * as z from 'zod';
import Heading from "@/components/Heading";
import { CodeIcon,  } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessageParam } from "openai/resources/chat/completions"
import ReactMarkdown from 'react-markdown';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/UserAvatar';
import { BotAvatar } from '@/components/BotAvatar';


const Code = () => {
    const [placeholder, setPlaceholder] = useState('');
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const router = useRouter();

    useEffect(() => {
        const placeholders = [
            "Ask me any coding question, I'm all ears!",
            "Share your coding thoughts or questions here...",
            "What's on your coding mind today?",
            "Type your coding curiosity or wonderings...",
            "Let's have a code chat! What's up?",
            "Your code wishes are my command, start typing!",
            "Tell me a code story, a coding question, or your coding secrets...",
            "The code stage is yours. What coding topic shall we discuss?",
            "You're in control. How can I assist you with coding today?",
            "Unleash your coding curiosity here...",
            "What's the coding buzz? Share it here.",
            "Converse about code, inquire about programming, or simply say 'hello'!",
            "I'm all ears, ready for your coding input!"
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

        const response = await axios.post('/api/code', {
            messages: newMessages
        })

        setMessages((current)=>[
            ...current,
            userMessage,
            response.data
        ])

        form.reset()

        } catch (error:any) {
            //OPEN PRO MODEL
            console.log(error)
        } finally{
            router.refresh()
        }

    }

    return ( 
        <div>
            <Heading 
            title="Code Generation"
            description="Craft code based on detailed text."
            icon={CodeIcon}
            iconColor="text-green-700"
            bgColor="bg-green-700/10"
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
                            <ReactMarkdown 
                            components={{
                                pre:({node, ...props})=>(
                                    <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                                        <pre {...props} />
                                    </div>
                                ),
                                code:({node, ...props})=>(
                                    <code className='bg-black/10 p-1 rounded-lg' {...props} />
                                )
                            }}
                            className='text-sm overflow-hidden leading-7'
                            >{message.content || ''}
                            </ReactMarkdown>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Code ;