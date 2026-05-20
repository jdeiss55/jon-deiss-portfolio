import Anthropic from '@anthropic-ai/sdk';
import { ROLE_FIT_SYSTEM_PROMPT, MODEL } from '@/lib/prompts';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  try {
    const { jobDescription }: { jobDescription: string } = await request.json();

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      system: ROLE_FIT_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analyze the fit for this job description:\n\n${jobDescription}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      return Response.json({ error: 'Unexpected response type' }, { status: 500 });
    }

    const jsonText = content.text.replace(/```json\n?|\n?```/g, '').trim();

    try {
      const parsed = JSON.parse(jsonText);
      return Response.json(parsed);
    } catch {
      return Response.json({ error: 'Failed to parse response' }, { status: 500 });
    }
  } catch (error) {
    console.error('Analyze API error:', error);
    return Response.json({ error: 'Service temporarily unavailable. Please try again.' }, { status: 500 });
  }
}
