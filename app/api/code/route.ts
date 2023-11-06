import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator. You must answer in markdown code snippets.Use code comments for explanations."
}

export async function POST(req: Request) {
    
try {
    
    const {userId}= auth()
    const body = await req.json()
    const {messages} = body

    if(!userId){
        return new NextResponse('Unauthorized', { status: 401 })
    }

    if(!openai){
        return new NextResponse('Please set OPENAI_API_KEY', { status: 500 })
    }

    if(!messages){
        return new NextResponse('Please enter a prompt', { status: 400 })
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            instructionMessage,
            ...messages
        ]
    })
    return NextResponse.json(response.choices[0].message)
} catch (error) {
    console.log('[CODE_ERROR]',error)
    return new NextResponse('Internal Server Error', { status: 500 })
}

}