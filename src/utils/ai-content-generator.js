import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const MAX_WORDS = {
  beginner: 300,
  intermediate: 500,
  advanced: 800,
};

const DIFFICULTY_RULES = {
  beginner: {
    label: "Beginner (A1–A2)",
    rules: `- Use only simple, common everyday words (go, eat, like, happy, big, small)
- Short sentences, max 8–12 words each
- Simple grammar: present tense, past tense, basic connectors (and, but, so, because)
- No idioms, phrasal verbs, or complex vocabulary
- Write like talking to a 10-year-old learning English`,
  },
  intermediate: {
    label: "Intermediate (B1–B2)",
    rules: `- Use everyday vocabulary with some less common words (appreciate, convenient, opportunity)
- Mix short and medium sentences, 10–18 words
- Use varied tenses, conditionals, and connectors (however, although, meanwhile)
- A few phrasal verbs and common idioms are okay
- Natural conversational tone, not too formal or too simple`,
  },
  advanced: {
    label: "Advanced (C1–C2)",
    rules: `- Use rich, expressive vocabulary (inevitably, counterintuitive, profound, nuance)
- Longer, complex sentences with subordinate clauses, 15–25 words
- Use advanced grammar: mixed conditionals, passive voice, inversions
- Include idioms, phrasal verbs, and sophisticated expressions
- Write in a polished, articulate, near-native style`,
  },
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
  const level = DIFFICULTY_RULES[difficulty] || DIFFICULTY_RULES.intermediate;

  const referenceBlock = refTitle && refContent
    ? `Topic: "${refTitle}"

Reference (same topic & style, but write completely new content — different sentences, examples, and flow):
"""
${refContent.slice(0, 500)}
"""
`
    : `Category: ${category} | Day ${day} of 40
`;

  return `Write a ${words}-word English reading passage for fluency practice.
Level: ${level.label}

${referenceBlock}${buildProfileContext(profile)}
Language level rules (STRICTLY follow):
${level.rules}

Format rules:
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
    model: "gemini-2.0-flash-lite",
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

export async function generateGrammarPassage({ tenseTitle, tenseDefinition, mode = "intermediate", refContent = "" }) {
  const level = DIFFICULTY_RULES[mode] || DIFFICULTY_RULES.intermediate;
  const words = MAX_WORDS[mode] ?? 500;

  const prompt = `Write a ${words}-word English reading passage for grammar practice.

Tense: ${tenseTitle}
Definition: ${tenseDefinition}
Level: ${level.label}

${refContent ? `Reference passage (write completely new content with different sentences and story, but same tense focus):\n"""\n${refContent.slice(0, 500)}\n"""\n` : ""}
IMPORTANT rules:
- Use the "${tenseTitle}" tense in almost EVERY sentence (at least 80% of sentences)
- First person (I, my, me)
- Conversational, natural tone — like someone telling a real story
- Paragraph format only — no headings, bullets, lists, or quotes
- Vary sentence length; don't start every sentence with "I"
- No filler phrases like "In conclusion" or "It is worth noting"
- Blank line between paragraphs
- Around ${words} words

Language level rules (STRICTLY follow):
${level.rules}

Write the passage now:`;

  const systemMessage = "You are an English grammar coach. Write natural reading passages that heavily practice a specific tense so learners absorb the pattern through reading.";

  try {
    const text = await generateWithOpenRouter(prompt, systemMessage);
    console.log("[AI] Grammar passage generated with OpenRouter");
    return text;
  } catch {
    try {
      const text = await generateWithGemini(`${systemMessage}\n\n${prompt}`);
      console.log("[AI] Grammar passage generated with Gemini");
      return text;
    } catch {
      try {
        const text = await generateWithGroq(prompt, systemMessage);
        console.log("[AI] Grammar passage generated with Groq");
        return text;
      } catch (e) {
        console.error("[All providers failed]", e);
        throw new Error("Unable to generate grammar passage.");
      }
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
        mode,
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
