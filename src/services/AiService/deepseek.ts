import OpenAI from 'openai';
import dotenv from 'dotenv';
import { env } from '../../config/env.js';

dotenv.config();

// Initialize the OpenAI client configured for the DeepSeek API
const openai = new OpenAI({
  apiKey: env.DEEPSEEK_API_KEY, 
  baseURL: 'https://api.deepseek.com',
});

// Function to get a response from the low-cost DeepSeek chat model in Bengali
export async function getOpenAIResponse(prompt: string): Promise<string> {
  try {
    // Call the DeepSeek API with a system role instructing it to always reply in Bengali
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat', 
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful assistant. You must always reply in the Bengali language (বাংলায় উত্তর দিন).' 
        },
        { 
          role: 'user', 
          content: prompt 
        }
      ],
    });

    // Return the generated content or a fallback message if empty
    return completion.choices[0]?.message?.content || "কোনো উত্তর পাওয়া যায়নি।";
  } catch (error) {
    // Log any errors encountered during the API call
    console.error('AI Error:', error);
    return "দুঃখিত, এই মুহূর্তে এআই সার্ভিসের সাথে সংযোগ স্থাপন করতে সমস্যা হচ্ছে।";
  }
}