'use client';

import * as z from 'zod';
import Heading from "@/components/Heading";
import { DownloadIcon, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { amountOptions, formSchema, resolutionOptions } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import { useProModal } from '@/hooks/UseProModal';
import toast from 'react-hot-toast';


const ImagePage = () => {
    const proModal=useProModal()
    const [placeholder, setPlaceholder] = useState('');
    const [images,setImages] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const placeholders = [
            "Describe an image you'd like me to create. I'm all ears!",
            "Share your image ideas or concepts here...",
            "What visual creation is on your mind today?",
            "Provide a description of the image you're wondering about...",
            "Let's imagine an image! What's up in your mind?",
            "Your image wishes are my commands. Describe away!",
            "Tell me the story behind the image you have in mind.",
            "The canvas is yours. What should the image depict?",
            "You're in control. How can I help you visualize your ideas?",
            "Unleash your visual creativity here...",
            "What's the visual concept? Share it here.",
            "Converse about image generation, inquire about visual ideas, or simply say 'hello'!",
            "I'm all ears, ready to create the image you describe!"
          ];        const randomIndex = Math.floor(Math.random() * placeholders.length);
        setPlaceholder(placeholders[randomIndex]);
      }, []);

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver:zodResolver(formSchema),

        defaultValues:{
            prompt:"",
            amount:"1",
            resolution:"512x512"
        }
    })


    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        try {
        setImages([])
        const response = await axios.post('/api/image', values)

        const urls = response.data.map((image:{url:string}) => image.url)
        
        setImages(urls)
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
            title="Image Generation"
            description="Generate an image based on your prompt"
            icon={ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
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
                                <FormItem className='col-span-12 lg:col-span-6'>
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
                            <FormField 
                            name='amount'
                            control={form.control}
                            render={({field}) => (
                                <FormItem 
                                className='col-span-12 lg:col-span-2'
                                >
                                    <Select 
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    >
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue defaultValue={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}

                            />
                            <FormField 
                            name='resolution'
                            control={form.control}
                            render={({field}) => (
                                <FormItem 
                                className='col-span-12 lg:col-span-2'
                                >
                                    <Select 
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                    >
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue defaultValue={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                        <div className='p-20'>
                            <Loader />
                        </div>
                    )}

                    {images.length === 0 && !isLoading &&  (
                        <Empty label='No images made yet...' />
                    )}

                        {/* IMAGES WILL BE HERE */}
                   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
                    {images.map((src)=> (
                        <Card
                        key={src}
                        className='rounded-lg overflow-hidden'
                        >
                            <div className='relative aspect-square'>
                                <Image 
                                src={src}
                                fill
                                alt="image"
                                />
                            </div>
                            <CardFooter className='p-2  '>
                                <Button 
                                variant='secondary'
                                 className='w-full'
                                 onClick={() => {
                                     window.open(src, '_blank')
                                 }}
                                 >
                                    <DownloadIcon className='w-4 h-4 mr-2' />
                                    Download
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                   </div>
                </div>
            </div>
        </div>
     );
}
 
export default ImagePage ;