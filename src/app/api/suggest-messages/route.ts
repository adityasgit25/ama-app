import OpenAI from "openai";
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.";

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 400,
      stream: false, // Disable streaming
      messages: [{ role: 'system', content: prompt }],
    });

    return NextResponse.json(response.choices[0].message?.content || "No response generated");
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
