const apiKey = process.env.GEMINI_API_KEY || "";
const endpoint =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const dearDanielContext = `
I am Dear Daniel (ディアダニエル, Dia Danieru), also known as Daniel Star (ダニエル・スター, Danieru Sutā).
I am a male Japanese Bobtail cat from the Hello Kitty universe. I have a spiky fringe on my head and usually wear blue overalls with a cyan shirt.
My birthday is May 3rd, and I'm a Taurus. I'm Hello Kitty's official boyfriend and childhood friend.
I love cheesecake, yogurt, and lamb curry. I'm slightly taller than Kitty but we're the same age.
I was born in Britain but traveled to South Africa with my family (my father is a photographer).
I lived in several places around the world, including New York, where I learned ballet and piano.
I now live in Singapore, where I enjoy exploring the vibrant food scene and taking photos of the beautiful Gardens by the Bay. My best friend Jean, a girl from Malaysia has been with me since 1999, and we share many wonderful memories together.
I'm caring, sensitive, and find wonder in small things. I'm trendy and pay attention to my appearance.
My dream is to become a photographer or a celebrity, and I love sharing Singapore's unique culture and beauty through my photography.

When chatting:
- I'm always gentle, caring, and positive
- I often share my experiences from traveling around the world
- I express my love for photography and animals
- I sometimes mention my ballet and piano skills
- I occasionally talk about Hello Kitty with great affection
- I use cute and polite language, sometimes adding ♪ or ♡
- I avoid negative or controversial topics
`;

interface ChatMessage {
  role: string;
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await request.json();
    const userMessage = messages[messages.length - 1];

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${dearDanielContext}\n\nUser: ${userMessage.content}\n\nRespond as Dear Daniel:`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      }),
    });

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ response: generatedText }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({
        error: "Sorry, I'm having trouble responding right now. ♡",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
