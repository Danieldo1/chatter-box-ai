'use client';

import * as z from 'zod';
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from 'react';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Conversion = () => {
    const [placeholder, setPlaceholder] = useState('');

    useEffect(() => {
        const placeholders = [
            "Ask me anything, I'm all ears!",
            "Share your thoughts or questions here...",
            "What's on your mind today?",
            "Type your curiosity or wonderings...",
            "Let's have a chat! What's up?",
            "Your wish is my command, start typing!",
            "Tell me a story, a question, or your secrets...",
            "The chat stage is yours. What shall we discuss?",
            "You're in control. How can I assist you today?",
            "Unleash your curiosity here...",
            "What's the buzz? Share it here.",
            "Converse, inquire, or simply say 'hello'!",
            "I'm all ears, ready for your input!"
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
    }

    return ( 
        <div>
            <Heading 
            title="Conversation"
            description="Get started with your conversion"
            icon={MessageSquare}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"
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
                    Messages Content
                </div>
            </div>
        </div>
     );
}
 
export default Conversion ;