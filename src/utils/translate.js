// Splits text into chunks under maxLength chars, respecting sentence boundaries
function chunkText(text, maxLength = 450) {
  const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text]
  const chunks = []
  let current = ''
  for (const sentence of sentences) {
    if ((current + sentence).length > maxLength) {
      if (current) chunks.push(current.trim())
      current = sentence
    } else {
      current += sentence
    }
  }
  if (current) chunks.push(current.trim())
  return chunks
}

async function translateChunk(text, from = 'en', to = 'hi') {
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
  )
  const data = await res.json()
  return data.responseData?.translatedText || text
}

export async function translateToHindi(text) {
  const paragraphs = text.split('\n').filter(p => p.trim())
  const translatedParagraphs = await Promise.all(
    paragraphs.map(async para => {
      const chunks = chunkText(para)
      const translatedChunks = await Promise.all(chunks.map(c => translateChunk(c)))
      return translatedChunks.join(' ')
    })
  )
  return translatedParagraphs.join('\n\n')
}
