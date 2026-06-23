import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, PlayCircle, CheckCircle2, XCircle, ChevronRight } from 'lucide-react'
import { getTenseById } from '../data/grammarContent'

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h2 className="text-sm font-bold mb-2 px-1" style={{ color: 'var(--accent-light)' }}>{title}</h2>
      {children}
    </div>
  )
}

function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl border p-3.5 ${className}`}
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {children}
    </div>
  )
}

export default function GrammarDetail() {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const tense = getTenseById(topicId)

  if (!tense) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 text-center">
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>Topic not found</p>
        <button onClick={() => navigate('/grammar')} className="text-sm underline" style={{ color: '#a78bfa' }}>
          Back to Grammar
        </button>
      </div>
    )
  }

  function highlightWord(sentence, highlight) {
    const idx = sentence.toLowerCase().indexOf(highlight.toLowerCase())
    if (idx === -1) return <span>{sentence}</span>
    return (
      <span>
        {sentence.slice(0, idx)}
        <span className="font-bold" style={{ color: 'var(--accent-light)' }}>
          {sentence.slice(idx, idx + highlight.length)}
        </span>
        {sentence.slice(idx + highlight.length)}
      </span>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-4"
        style={{ background: 'var(--bg-t95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--surface)' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 mb-3 text-sm"
          style={{ color: 'var(--text2)' }}
        >
          <ArrowLeft size={17} />
          Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{tense.icon}</span>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{tense.title}</h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{tense.definition}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-6">
        {/* Formula */}
        <Section title="Formula">
          <Card>
            <div className="space-y-2">
              {Object.entries(tense.formula).map(([type, formula]) => (
                <div key={type} className="flex gap-2">
                  <span
                    className="text-[10px] font-bold uppercase w-10 flex-shrink-0 mt-0.5"
                    style={{
                      color: type === 'positive' ? '#10b981' : type === 'negative' ? '#ef4444' : '#f59e0b',
                    }}
                  >
                    {type === 'positive' ? '+' : type === 'negative' ? '−' : '?'}
                  </span>
                  <p className="text-sm" style={{ color: 'var(--text)' }}>{formula}</p>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Rules */}
        <Section title="When to Use">
          <Card>
            <div className="space-y-2.5">
              {tense.rules.map((rule, i) => (
                <div key={i} className="flex gap-2.5 text-sm">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-light)' }}>{i + 1}.</span>
                  <p style={{ color: 'var(--text2)' }}>{rule}</p>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Examples */}
        <Section title="Examples">
          <Card>
            <div className="space-y-2">
              {tense.examples.map((ex, i) => (
                <p key={i} className="text-sm" style={{ color: 'var(--text)' }}>
                  {highlightWord(ex.sentence, ex.highlight)}
                </p>
              ))}
            </div>
          </Card>
        </Section>

        {/* Signal Words */}
        <Section title="Signal Words">
          <div className="flex flex-wrap gap-2">
            {tense.signalWords.map(word => (
              <span
                key={word}
                className="text-xs px-2.5 py-1 rounded-full border"
                style={{ color: 'var(--accent-light)', borderColor: 'var(--accent-dim, rgba(124,58,237,0.2))', background: 'rgba(124,58,237,0.08)' }}
              >
                {word}
              </span>
            ))}
          </div>
        </Section>

        {/* Common Mistakes */}
        <Section title="Common Mistakes">
          <div className="space-y-2">
            {tense.mistakes.map((m, i) => (
              <Card key={i}>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2 text-sm">
                    <XCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#ef4444' }} />
                    <p style={{ color: '#ef4444' }}>{m.wrong}</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#10b981' }} />
                    <p style={{ color: '#10b981' }}>{m.correct}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Reading Practice */}
        <Section title="Reading Practice">
          <button
            onClick={() => navigate(`/grammar/${tense.id}/read`)}
            className="w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all active:scale-[0.98]"
            style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.2)' }}
          >
            <PlayCircle size={24} style={{ color: '#a78bfa' }} />
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{tense.passage.title}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>
                Read aloud to practice this tense
              </p>
            </div>
            <ChevronRight size={16} style={{ color: 'var(--text3)' }} />
          </button>
        </Section>
      </div>
    </div>
  )
}
