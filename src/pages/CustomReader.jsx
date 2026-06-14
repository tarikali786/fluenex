import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copy, Trash2, PlayCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/categories'

const AI_PROMPTS = {
  'daily-speaking': `Generate a 300-word English reading passage for daily speaking practice.\n\nRequirements:\n- Natural conversational English\n- Easy to read aloud\n- Builds fluency and confidence\n- Paragraph format only\n- No headings or bullet points`,
  'job-interview': `Generate a 300-word English reading passage about professional job interview language.\n\nRequirements:\n- Professional vocabulary and scenarios\n- Interview responses and conversations\n- Confident and formal tone\n- Paragraph format only\n- No headings or bullet points`,
  'travel-english': `Generate a 300-word English reading passage about traveling and using English abroad.\n\nRequirements:\n- Travel scenarios and common dialogues\n- Practical phrases for airports, hotels, and restaurants\n- Friendly and useful tone\n- Paragraph format only\n- No headings or bullet points`,
  'office-communication': `Generate a 300-word English reading passage about workplace communication.\n\nRequirements:\n- Professional office English\n- Email, meeting, and collaboration language\n- Formal but natural tone\n- Paragraph format only\n- No headings or bullet points`,
  'technology-english': `Generate a 300-word English reading passage about technology topics.\n\nRequirements:\n- Technology vocabulary and concepts\n- Clear explanations for modern readers\n- Engaging and informative\n- Paragraph format only\n- No headings or bullet points`,
  custom: `Generate a 300-word English reading passage.\n\nRequirements:\n- Natural and engaging\n- Good sentence variety\n- Easy to read aloud\n- Paragraph format only\n- No headings or bullet points`,
}

const allCategories = [
  ...CATEGORIES,
  { id: 'custom', name: 'Custom', icon: '✨', color: '#7c3aed' },
]

export default function CustomReader() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const [selectedCategory, setSelectedCategory] = useState('daily-speaking')
  const [content, setContent] = useState('')

  function copyPrompt() {
    const prompt = AI_PROMPTS[selectedCategory] || AI_PROMPTS.custom
    navigator.clipboard
      .writeText(prompt)
      .then(() => showToast('Prompt copied! Paste it into ChatGPT or Claude.'))
      .catch(() => showToast('Copy failed — please copy manually.', 'error'))
  }

  function startReading() {
    if (!content.trim()) {
      showToast('Please paste some content first.', 'error')
      return
    }
    navigate('/challenge/custom/day/0', {
      state: { content: content.trim(), title: 'Custom Reading', isCustom: true },
    })
  }

  return (
    <div className="px-4 pt-14 pb-4 max-w-lg mx-auto flex flex-col" style={{ minHeight: 'calc(100svh - 4.5rem)' }}>
      <div className="mb-5">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Custom Reader</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>Paste any English content and start reading</p>
      </div>

      {/* Category selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
        {allCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
            style={{
              background: selectedCategory === cat.id ? `${cat.color}18` : 'var(--card)',
              borderColor: selectedCategory === cat.id ? `${cat.color}55` : 'var(--border)',
              color: selectedCategory === cat.id ? cat.color : 'var(--text2)',
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Copy AI prompt */}
      <button
        onClick={copyPrompt}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border text-sm font-medium mb-3 transition-all active:scale-[0.98]"
        style={{ background: 'var(--card)', borderColor: 'var(--border)', color: '#a78bfa' }}
      >
        <Copy size={15} />
        Copy AI Prompt
      </button>

      {/* Textarea */}
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Paste your reading content here..."
        className="flex-1 w-full rounded-2xl border p-4 text-sm resize-none focus:outline-none transition-colors"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          color: 'var(--text)',
          caretColor: '#a78bfa',
          minHeight: '200px',
        }}
        onFocus={e => (e.target.style.borderColor = '#7c3aed55')}
        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
      />

      {/* Actions */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => setContent('')}
          disabled={!content}
          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-30"
          style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text2)' }}
        >
          <Trash2 size={14} />
          Clear
        </button>
        <button
          onClick={startReading}
          disabled={!content.trim()}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-30"
          style={{ background: '#7c3aed', color: 'white' }}
        >
          <PlayCircle size={16} />
          Start Reading
        </button>
      </div>
    </div>
  )
}
