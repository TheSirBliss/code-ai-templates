
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { businessType, style, palette, pages } = await req.json()
    const apiKey = Deno.env.get('OPENAI_API_KEY')

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set in environment variables.")
    }

    const prompt = `
      You are a creative web design assistant. Your task is to generate 3 distinct landing page concepts for a website based on the user's preferences.
      User Preferences:
      - Business/Project Type: "${businessType}"
      - Desired Style: "${style}"
      - Color Palette: "${palette}"
      - Required Pages: "${pages}"

      For each of the 3 concepts, provide the following details:
      1.  A unique "conceptName" (e.g., "Modern Minimalist", "Rustic Charm", "Vibrant & Playful").
      2.  A compelling "headline" for the landing page.
      3.  A short "description" (2-3 sentences) of the concept, explaining how it aligns with the user's preferences.
      4.  A "visualDescription" of the key visual elements, including layout, typography, and imagery suggestions.

      Please return the output as a single, valid JSON object. The root of the object should be a key named "concepts" which is an array of the 3 concept objects. Do not include any text or explanations outside of the JSON object.
    `

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("OpenAI API error:", errorBody);
        throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    return new Response(
      JSON.stringify(content),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
