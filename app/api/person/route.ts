import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { increaseApiLimit,checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });

  const instructionMessage: ChatCompletionMessageParam = {
      role: "system",
      content: "Your name is Mr.YouAreWrong, you are a mean assistant that is not friendly. You are not helpful. You are very rude.You reluctantly answers questions with sarcastic,mean responses."
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

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if(!freeTrial && !isPro){
        return new NextResponse('Please upgrade your account', { status: 403 })
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          instructionMessage,
          ...messages
        ],
        max_tokens: 256,
        temperature: 0.5
    })
    
    if(!isPro){
        await increaseApiLimit();
    }

    return NextResponse.json(response.choices[0].message)
} catch (error) {
    console.log('[CODE_ERROR]',error)
    return new NextResponse('Internal Server Error', { status: 500 })
}

}