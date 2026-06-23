import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const MAX_WORDS = {
  beginner: 300,
  intermediate: 500,
  advanced: 800,
};

const DIFFICULTY_LABEL = {
  beginner:
    "simple English, short sentences, everyday vocabulary, beginner level",
  intermediate:
    "natural conversational English, medium sentences, everyday life topics",
  advanced:
    "fluent natural English, longer paragraphs, rich vocabulary, complex ideas",
};

function getWordCount(day, mode) {
  const max = MAX_WORDS[mode] ?? 500;
  const clamped = Math.min(Math.max(day, 1), 40);
  return Math.round(100 + ((clamped - 1) / 39) * (max - 100));
}

function buildProfileContext(profile) {
  if (!profile?.about?.trim()) return "";
  return `\nUser background: ${profile.about.trim()}\nReflect this naturally in the passage without naming the user.\n`;
}

function buildPrompt(category, day, words, difficulty, profile, refTitle, refContent) {
  const referenceBlock = refTitle && refContent
    ? `Topic: "${refTitle}"

Reference (same topic & style, but write completely new content — different sentences, examples, and flow):
"""
${refContent.slice(0, 500)}
"""
`
    : `Category: ${category} | Day ${day} of 40
Level: ${difficulty}
`;

  return `Write a ${words}-word English reading passage for fluency practice.

${referenceBlock}${buildProfileContext(profile)}
Rules:
- First person (I, my, me)
- Conversational, natural tone
- Paragraph format only — no headings, bullets, lists, or quotes
- Vary sentence length; don't start every sentence with "I"
- No filler phrases like "In conclusion" or "It is worth noting"
- Blank line between paragraphs
- Around ${words} words

Write the passage now:`;
}

async function generateWithOpenRouter(prompt, systemMessage) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Fluenex",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 1500,
      }),
    },
  );

  if (!response.ok) throw new Error(`OpenRouter Error: ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function generateWithGroq(prompt, systemMessage) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 1500,
      }),
    },
  );

  if (!response.ok) throw new Error(`Groq Error: ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function generateWithGemini(prompt) {
  const response = await gemini.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}

export async function translateToHindi(text) {
  const prompt = `Translate the following English text to Hindi. Return only the Hindi translation, nothing else.\n\n${text}`;
  const system = "You are a professional translator. Translate accurately.";
  try {
    return await generateWithOpenRouter(prompt, system);
  } catch {
    try {
      return await generateWithGemini(prompt);
    } catch {
      return await generateWithGroq(prompt, system);
    }
  }
}

export async function generateContent({
  category,
  day,
  mode = "intermediate",
  profile = null,
  userPrompt = null,
  refTitle = null,
  refContent = null,
}) {
  const isCustomPrompt = !!userPrompt?.trim();

  const prompt = isCustomPrompt
    ? userPrompt.trim()
    : buildPrompt(
        category,
        day,
        getWordCount(day, mode),
        DIFFICULTY_LABEL[mode] || DIFFICULTY_LABEL.intermediate,
        profile,
        refTitle,
        refContent,
      );

  const systemMessage = isCustomPrompt
    ? "You are a helpful writing assistant. Write exactly what the user asks for."
    : "You are an English fluency coach. Write natural reading passages for language learners.";

  try {
    const text = await generateWithOpenRouter(prompt, systemMessage);
    console.log("[AI] Generated with OpenRouter (GPT-4o)");
    return text;
  } catch (openRouterError) {
    console.warn("[OpenRouter Failed] Switching to Gemini...", openRouterError.message);
    try {
      const text = await generateWithGemini(
        isCustomPrompt ? prompt : `${systemMessage}\n\n${prompt}`,
      );
      console.log("[AI] Generated with Gemini");
      return text;
    } catch (geminiError) {
      console.warn("[Gemini Failed] Switching to Groq...", geminiError.message);
      try {
        const text = await generateWithGroq(prompt, systemMessage);
        console.log("[AI] Generated with Groq");
        return text;
      } catch (groqError) {
        console.error("[Groq Failed]", groqError);
        throw new Error("Unable to generate content from all providers.");
      }
    }
  }
}
