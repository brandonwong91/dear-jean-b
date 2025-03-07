const apiKey = process.env.GEMINI_API_KEY || "";
const endpoint =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const productContext = `
Please provide a list of 8 most recent or incoming Hello Kitty collaboration products available in Singapore.
For each product, include:
- Product name
- Brand collaboration
- Brief description (20-30 words)
- Price in SGD
- Where to buy

Format the response as a JSON array of objects with these fields:
- name: string
- brand: string
- description: string
- price: string (including SGD)
- location: string
- timestamp: string (ISO format)
`;

export async function GET() {
  try {
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
                text: `${productContext}\n\nRespond with only the JSON array:`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      }),
    });

    const data = await response.json();
    console.log(data);
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response format from Gemini API");
    }

    let productsText = data.candidates[0].content.parts[0].text;
    // Remove markdown formatting if present
    productsText = productsText.replace(/^```json\s*|```\s*$/g, "").trim();

    const products = JSON.parse(productsText);

    if (!Array.isArray(products)) {
      throw new Error("Invalid products data format");
    }

    return new Response(JSON.stringify({ products }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in products route:", error);
    return new Response(
      JSON.stringify({
        error: "Sorry, I'm having trouble getting the products right now. ♡",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
