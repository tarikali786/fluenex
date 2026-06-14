import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useAutoScroll } from '../hooks/useAutoScroll'

const LEVELS = [
  { id: 'beginner',     label: 'Beginner',     target: 60,  icon: '🥉', color: '#cd7f32', desc: 'Build reading confidence'  },
  { id: 'intermediate', label: 'Intermediate', target: 120, icon: '🥈', color: '#c0c0c0', desc: 'Improve your pace'         },
  { id: 'advanced',     label: 'Advanced',     target: 180, icon: '🥇', color: '#ffd700', desc: 'Push your limits'          },
  { id: 'expert',       label: 'Expert',       target: 250, icon: '💎', color: '#b9f2ff', desc: 'Master speed reading'      },
]

const WPM_TEXT =
  "The ability to read quickly and effectively is one of the most valuable skills a person can develop in today's information-rich world. Every day, we are required to process enormous amounts of written material — emails, reports, articles, books, and messages. Those who can read faster without losing comprehension have a significant advantage in both their personal and professional lives. Speed reading is not about skimming or skipping words. It is about training your eyes and brain to process text more efficiently. With consistent practice, most people can double or even triple their natural reading speed while maintaining or improving their understanding of the material. The key is daily practice and patience."

const WORD_COUNT = WPM_TEXT.trim().split(/\s+/).length

// ── WPM Reader (full-screen auto-scroll) ────────────────────────────────────
function WPMReader({ readingMode, onFinish }) {
  const { containerRef, contentRef, isPaused, progress, isFinished, toggle } =
    useAutoScroll(readingMode)

  // Auto-finish when scroll completes
  useEffect(() => {
    if (isFinished) onFinish()
  }, [isFinished, onFinish])

  return (
    <div className="fixed inset-0" style={{ background: '#0a0a0f' }}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-20" style={{ background: '#1a1a28' }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${Math.round(progress * 100)}%`, background: '#7c3aed' }}
        />
      </div>

      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-10 pb-6 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0) 100%)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#ef4444', animation: 'pulse 1s infinite' }} />
          <p className="text-sm pointer-events-none" style={{ color: '#8b8ba8' }}>Reading…</p>
        </div>
        <button
          className="pointer-events-auto px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
          style={{ background: '#7c3aed' }}
          onClick={onFinish}
        >
          Done
        </button>
      </div>

      {/* Tap to pause/resume */}
      <div className="absolute inset-0 z-0" onClick={toggle} />

      {/* Scrolling text */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <div
          ref={contentRef}
          className="mx-auto px-6"
          style={{
            maxWidth: '680px',
            paddingTop: '95vh',
            paddingBottom: '90vh',
            willChange: 'transform',
            fontSize: '20px',
            lineHeight: '1.9',
            color: '#f1f1f5',
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          <p>{WPM_TEXT}</p>
        </div>
      </div>

      {/* Paused indicator */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div
            className="px-7 py-4 rounded-2xl"
            style={{ background: 'rgba(14,14,20,0.92)', backdropFilter: 'blur(24px)', border: '1px solid #252535' }}
          >
            <p className="font-semibold text-base" style={{ color: '#f1f1f5' }}>⏸ Paused</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main WPMChallenge ────────────────────────────────────────────────────────
export default function WPMChallenge() {
  const navigate = useNavigate()
  const { settings, achievements, addAchievement } = useApp()

  const [phase, setPhase] = useState('select')
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [countdown, setCountdown] = useState(3)
  const [startTime, setStartTime] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [isNewBest, setIsNewBest] = useState(false)
  const timerRef = useRef(null)

  function getBest(levelId) {
    return achievements.find(a => a.id === levelId)?.wpm || null
  }

  function beginCountdown(level) {
    setSelectedLevel(level)
    setCountdown(3)
    setPhase('countdown')
  }

  useEffect(() => {
    if (phase !== 'countdown') return
    if (countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000)
    } else {
      setPhase('reading')
      setStartTime(Date.now())
    }
    return () => clearTimeout(timerRef.current)
  }, [phase, countdown])

  function finishReading() {
    if (phase !== 'reading') return
    const minutesElapsed = (Date.now() - startTime) / 1000 / 60
    const calculatedWpm = Math.round(WORD_COUNT / minutesElapsed)
    setWpm(calculatedWpm)
    setPhase('result')
    if (selectedLevel) {
      const prevBest = getBest(selectedLevel.id)
      setIsNewBest(!prevBest || calculatedWpm > prevBest)
      addAchievement({ id: selectedLevel.id, label: `${selectedLevel.label} Reader`, icon: selectedLevel.icon, wpm: calculatedWpm })
    }
  }

  function reset() {
    setPhase('select')
    setSelectedLevel(null)
    setWpm(0)
    setIsNewBest(false)
  }

  const passed = selectedLevel && wpm >= selectedLevel.target

  // Full-screen reading phase — rendered outside normal layout
  if (phase === 'reading') {
    return <WPMReader readingMode={settings.readingMode} onFinish={finishReading} />
  }

  return (
    <div className="px-4 pt-14 pb-6 max-w-lg mx-auto">

      {/* Level selection */}
      {phase === 'select' && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>WPM Challenge</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>Test and improve your reading speed</p>
          </div>

          {achievements.length > 0 && (
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
              {LEVELS.map(level => {
                const best = getBest(level.id)
                if (!best) return null
                return (
                  <div key={level.id} className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border"
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                    <span className="text-lg">{level.icon}</span>
                    <span className="text-xs font-bold tabular-nums" style={{ color: level.color }}>{best}</span>
                    <span className="text-xs" style={{ color: 'var(--text3)' }}>WPM</span>
                  </div>
                )
              })}
            </div>
          )}

          <div className="space-y-3">
            {LEVELS.map(level => {
              const best = getBest(level.id)
              return (
                <button
                  key={level.id}
                  onClick={() => beginCountdown(level)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all active:scale-[0.98]"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${level.color}18` }}>
                    {level.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{level.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{level.desc}</p>
                    {best && <p className="text-xs mt-1 font-medium" style={{ color: '#10b981' }}>Best: {best} WPM</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold" style={{ color: level.color }}>{level.target}</p>
                    <p className="text-xs" style={{ color: 'var(--text3)' }}>target</p>
                  </div>
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* Countdown */}
      {phase === 'countdown' && (
        <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100svh - 8rem)' }}>
          <p className="text-base mb-6" style={{ color: 'var(--text2)' }}>Get ready to read...</p>
          <div className="text-9xl font-bold tabular-nums" style={{ color: '#a78bfa' }}>
            {countdown > 0 ? countdown : 'Go!'}
          </div>
        </div>
      )}

      {/* Result */}
      {phase === 'result' && (
        <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100svh - 8rem)' }}>
          <div className="text-7xl mb-4">{selectedLevel?.icon}</div>

          {isNewBest && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
              <Trophy size={13} style={{ color: '#10b981' }} />
              <span className="text-xs font-semibold" style={{ color: '#10b981' }}>New Personal Best!</span>
            </div>
          )}

          <div className="text-6xl font-bold mb-1 tabular-nums" style={{ color: '#a78bfa' }}>{wpm}</div>
          <p className="text-base font-semibold mb-1" style={{ color: 'var(--text)' }}>Words Per Minute</p>
          <p className="text-sm mb-1" style={{ color: 'var(--text2)' }}>Target: {selectedLevel?.target} WPM</p>
          <p className="text-sm font-semibold mb-10" style={{ color: passed ? '#10b981' : '#f59e0b' }}>
            {passed ? '🎉 Challenge Passed!' : '💪 Keep practicing!'}
          </p>

          <div className="w-full max-w-xs mb-10">
            <div className="h-2 rounded-full mb-1.5" style={{ background: 'var(--surface)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((wpm / (selectedLevel?.target || 1)) * 100, 100)}%`,
                  background: passed ? '#10b981' : '#f59e0b',
                }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-xs" style={{ color: 'var(--text3)' }}>0</span>
              <span className="text-xs" style={{ color: 'var(--text3)' }}>{selectedLevel?.target} WPM</span>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <button onClick={reset} className="flex-1 py-3.5 rounded-2xl font-medium border"
              style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text2)' }}>
              Try Again
            </button>
            <button onClick={() => navigate('/')} className="flex-1 py-3.5 rounded-2xl font-semibold text-white"
              style={{ background: '#7c3aed' }}>
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
