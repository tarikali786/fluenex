import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Trash2, PlayCircle, Volume2, Pause, Square, Languages, StopCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { generateContent, translateToHindi } from '../utils/ai-content-generator'
import useTTS from '../hooks/useTTS'

export default function CustomReader() {
  const navigate = useNavigate()
  const { showToast, settings, userProfile } = useApp()
  const { speak, pause, resume, stop, speaking, paused, supported: ttsSupported, gender: ttsGender, toggleGender } = useTTS()
  const [content, setContent] = useState('')
  const [ttsRate, setTtsRate] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [userPrompt, setUserPrompt] = useState('')
  const [hindiContent, setHindiContent] = useState('')
  const [showHindi, setShowHindi] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  async function handleGenerate() {
    setIsGenerating(true)
    try {
      const text = await generateContent({
        category: 'general english',
        day: 1,
        mode: settings.readingMode,
        profile: userProfile,
        userPrompt: userPrompt.trim() || null,
      })
      setContent(text)
      setHindiContent('')
      setShowHindi(false)
    } catch {
      showToast('Generation failed. Try again.', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleTranslate() {
    if (!content.trim()) return
    if (showHindi) { setShowHindi(false); return }
    if (hindiContent) { setShowHindi(true); return }
    setIsTranslating(true)
    try {
      const hindi = await translateToHindi(content)
      setHindiContent(hindi)
      setShowHindi(true)
    } catch {
      showToast('Translation failed. Try again.', 'error')
    } finally {
      setIsTranslating(false)
    }
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
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Custom Reader</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>Paste any English content and start reading</p>
        </div>

        {content.trim() && (
          <div className="flex items-center gap-2 mt-1">
            {/* Translate to Hindi */}
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              title={showHindi ? 'Show English' : 'Translate to Hindi'}
              className="flex items-center justify-center w-9 h-9 rounded-xl border transition-all active:scale-95 disabled:opacity-50"
              style={{
                background: showHindi ? 'rgba(16,185,129,0.15)' : 'var(--card)',
                borderColor: showHindi ? '#10b98155' : 'var(--border)',
                color: showHindi ? '#10b981' : 'var(--text2)',
              }}
            >
              {isTranslating
                ? <Sparkles size={15} className="animate-pulse" />
                : <Languages size={15} />}
            </button>

            {/* Speak */}
            {ttsSupported && (
              <button
                onClick={() => speaking ? stop() : speak(content, ttsRate)}
                title={speaking ? 'Stop' : 'Listen'}
                className="flex items-center justify-center w-9 h-9 rounded-xl border transition-all active:scale-95"
                style={{
                  background: speaking ? 'rgba(124,58,237,0.15)' : 'var(--card)',
                  borderColor: speaking ? '#7c3aed55' : 'var(--border)',
                  color: speaking ? '#a78bfa' : 'var(--text2)',
                }}
              >
                {speaking ? <StopCircle size={15} /> : <Volume2 size={15} />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Custom prompt input */}
      <div
        className="flex items-center gap-2 w-full rounded-2xl border px-4 py-3 mb-3"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <Sparkles size={14} style={{ color: '#52526a', flexShrink: 0 }} />
        <input
          type="text"
          value={userPrompt}
          onChange={e => setUserPrompt(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !isGenerating && handleGenerate()}
          placeholder="e.g. Write about morning gym routine…"
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: 'var(--text)', caretColor: '#7c3aed' }}
        />
        {userPrompt && (
          <button onClick={() => setUserPrompt('')} style={{ color: '#52526a' }}>✕</button>
        )}
      </div>

      {/* Generate with AI */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold mb-3 transition-all active:scale-[0.98] disabled:opacity-70"
        style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', color: '#a78bfa' }}
      >
        <Sparkles size={15} className={isGenerating ? 'animate-pulse' : ''} />
        {isGenerating ? 'Generating…' : 'Generate with AI'}
      </button>

      {/* Textarea */}
      <textarea
        value={showHindi ? hindiContent : content}
        onChange={e => showHindi ? setHindiContent(e.target.value) : setContent(e.target.value)}
        placeholder="Generate with AI above, or paste your own content here…"
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

      {/* TTS Controls */}
      {ttsSupported && content.trim() && (
        <div
          className="flex items-center gap-3 rounded-2xl border px-4 py-3 mt-3"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <Volume2 size={15} style={{ color: '#a78bfa', flexShrink: 0 }} />
            <button
              onClick={() => { toggleGender(); if (speaking) { stop(); setTimeout(() => speak(content, ttsRate), 80) } }}
              className="text-xs font-bold px-1.5 py-0.5 rounded-lg border"
              style={{ color: '#8b8ba8', borderColor: 'var(--border)', background: 'rgba(255,255,255,0.04)' }}
              title={`Voice: ${ttsGender}`}
            >
              {ttsGender === 'female' ? '♀' : '♂'}
            </button>

          {!speaking ? (
            <button
              onClick={() => speak(content, ttsRate)}
              className="flex items-center gap-1.5 text-sm font-medium"
              style={{ color: '#a78bfa' }}
            >
              Listen
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={paused ? resume : pause}
                className="flex items-center gap-1 text-sm font-medium"
                style={{ color: '#a78bfa' }}
              >
                {paused ? <PlayCircle size={15} /> : <Pause size={15} />}
                {paused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={stop}
                className="flex items-center gap-1 text-sm font-medium"
                style={{ color: '#ef4444' }}
              >
                <Square size={13} />
                Stop
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {[0.75, 1, 1.25, 1.5].map(r => (
              <button
                key={r}
                onClick={() => { setTtsRate(r); if (speaking) { stop(); setTimeout(() => speak(content, r), 100) } }}
                className="text-xs px-2 py-0.5 rounded-lg border transition-all"
                style={{
                  borderColor: ttsRate === r ? '#7c3aed55' : 'var(--border)',
                  background: ttsRate === r ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: ttsRate === r ? '#a78bfa' : 'var(--text2)',
                }}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => { stop(); setContent(''); setHindiContent(''); setShowHindi(false) }}
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
