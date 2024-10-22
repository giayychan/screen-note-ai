import { aiTextGeneration } from '@/services/huggingFace';
import { NextResponse } from 'next/server';

type PostRequestBody = {
  word: string;
  context: string;
};

export async function POST(request: Request) {
  try {
    const data: PostRequestBody = await request.json();
    const { word, context } = data;

    if (!word) {
      return NextResponse.json(
        { error: 'Missing word in request body.' },
        { status: 400 }
      );
    }

    if (!context) {
      return NextResponse.json(
        { error: 'Missing context in request body.' },
        { status: 400 }
      );
    }

    const prompt = `Given the word "${word}" and the context: "${context}", provide the following:\nPart of Speech (e.g., adjective, noun, verb, etc.) \nDefinition of the word.\nMeaning in Context: Explain what the word specifically means in this situation.\nExample: Provide an example sentence using the word in a similar context.\nMake the response informative and detailed.`;

    const result = await aiTextGeneration(prompt);

    if (!result?.generated_text) {
      return NextResponse.json(
        { error: 'No suitable definition found.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { definition: result.generated_text },
      { status: 200 }
    );
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
}
