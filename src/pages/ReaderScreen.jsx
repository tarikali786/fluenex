import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, CheckCircle, RefreshCw, Languages, Volume2, StopCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getDayContent } from '../data/challengeContent'
import { useAutoScroll } from '../hooks/useAutoScroll'
import useTTS from '../hooks/useTTS'
import SelectionToolbar from '../components/SelectionToolbar'
import { generateContent } from '../utils/ai-content-generator'
import { translateToHindi } from '../utils/translate'
import { getItem, setItem } from '../utils/storage'

const FONT_STYLES = {
  small:         { fontSize: '17px', lineHeight: '1.85' },
  medium:        { fontSize: '20px', lineHeight: '1.9' },
  large:         { fontSize: '23px', lineHeight: '1.95' },
  'extra-large': { fontSize: '27px', lineHeight: '2' },
}

export default function ReaderScreen() {
  const { categoryId, day } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { settings, markDayComplete, saveWord, showToast, userProfile } = useApp()

  const dayNum = parseInt(day, 10)
  const isCustom = location.state?.isCustom === true

  const dayData = !isCustom ? getDayContent(categoryId, dayNum) : null
  const title = isCustom
    ? (location.state?.title || 'Reading')
    : (dayData?.title || `Day ${dayNum}`)

  // ── AI content state ─────────────────────────────────────────────────────
  const [aiContent, setAiContent] = useState(() => {
    if (isCustom) return ''
    return getItem(`ai_content_${categoryId}_day_${dayNum}`) || ''
  })
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState(null)
  const [isRegenerating, setIsRegenerating] = useState(false)

  // ── Hindi translation state ───────────────────────────────────────────────
  const [hindiContent, setHindiContent] = useState('')
  const [isTranslated, setIsTranslated] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [hasTranslation, setHasTranslation] = useState(false)
  const hindiCacheKey = `ai_hindi_${categoryId}_day_${dayNum}`

  const cacheKey = `ai_content_${categoryId}_day_${dayNum}`

  const content = isCustom
    ? (location.state?.content || '')
    : (aiContent || dayData?.content || '')


  function handleRegenerate() {
    if (isRegenerating) return
    setIsRegenerating(true)
    setIsTranslated(false)
    setHindiContent('')
    setHasTranslation(false)
    generateContent({
      category: categoryId,
      day: dayNum,
      mode: settings.readingMode,
      profile: userProfile,
      refTitle: dayData?.title || null,
      refContent: dayData?.content || null,
    })
      .then(text => { setItem(cacheKey, text); setAiContent(text) })
      .catch(() => showToast('Failed to regenerate. Try again.'))
      .finally(() => setIsRegenerating(false))
  }

  async function handleTranslate() {
    if (isTranslating) return
    const cached = getItem(hindiCacheKey)
    if (cached) {
      setHindiContent(cached)
      setHasTranslation(true)
      setIsTranslated(true)
      return
    }
    setIsTranslating(true)
    try {
      const hindi = await translateToHindi(content)
      setItem(hindiCacheKey, hindi)
      setHindiContent(hindi)
      setHasTranslation(true)
      setIsTranslated(true)
    } catch {
      showToast('Translation failed. Try again.')
    } finally {
      setIsTranslating(false)
    }
  }

  function handleUndo() { setIsTranslated(false) }
  function handleRedo() { if (hasTranslation) setIsTranslated(true) }

  useEffect(() => {
    if (isTranslated) pause()
  }, [isTranslated])

  // ── Overlay (pause/resume tap feedback) ──────────────────────────────────
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayText, setOverlayText] = useState('')
  const overlayTimer = useRef(null)

  // ── TTS ──────────────────────────────────────────────────────────────────
  const { speak, stop: stopTTS, speaking: ttsSpeaking, supported: ttsSupported, gender: ttsGender, toggleGender } = useTTS()

  // ── Auto-scroll engine ───────────────────────────────────────────────────
  const { containerRef, contentRef, isPaused, progress, isFinished, toggle, pause, resume } =
    useAutoScroll(settings.readingMode)

  // ── Selection / toolbar state ────────────────────────────────────────────
  const [selectedWord, setSelectedWord] = useState('')
  const [hindiMeaning, setHindiMeaning] = useState('')
  const [isFetchingMeaning, setIsFetchingMeaning] = useState(false)
  // Track whether scroll was running before the toolbar opened
  const scrollingBeforeSelect = useRef(false)

  const fs = FONT_STYLES[settings.fontSize] || FONT_STYLES.medium

  // ── Tap to pause/resume ──────────────────────────────────────────────────
  function handleScreenTap(e) {
    if (e.target.closest('button')) return
    if (selectedWord) return          // toolbar is open — don't toggle scroll
    const nextText = isPaused ? '▶ Resumed' : '⏸ Paused'
    toggle()
    setOverlayText(nextText)
    setOverlayVisible(true)
    clearTimeout(overlayTimer.current)
    overlayTimer.current = setTimeout(() => setOverlayVisible(false), 1200)
  }

  // ── Text selection detection ─────────────────────────────────────────────
  useEffect(() => {
    function onSelectionEnd() {
      const sel = window.getSelection()
      const text = sel?.toString().trim()
      if (!text || text.length === 0 || text.length > 80) return

      // Pause scroll so the selection doesn't drift
      scrollingBeforeSelect.current = !isPaused
      pause()

      setSelectedWord(text)
      setHindiMeaning('')
      fetchHindi(text)
    }

    document.addEventListener('mouseup', onSelectionEnd)
    document.addEventListener('touchend', onSelectionEnd)
    return () => {
      document.removeEventListener('mouseup', onSelectionEnd)
      document.removeEventListener('touchend', onSelectionEnd)
    }
  }, [isPaused, pause])

  async function fetchHindi(word) {
    setIsFetchingMeaning(true)
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|hi`
      )
      const data = await res.json()
      const translated = data.responseData?.translatedText || ''
      // Ignore if the API returns the same word (no translation found)
      setHindiMeaning(translated.toLowerCase() !== word.toLowerCase() ? translated : '')
    } catch {
      setHindiMeaning('')
    } finally {
      setIsFetchingMeaning(false)
    }
  }

  function dismissToolbar() {
    window.getSelection()?.removeAllRanges()
    setSelectedWord('')
    setHindiMeaning('')
    setIsFetchingMeaning(false)
    // Resume only if scroll was running before user selected text
    if (scrollingBeforeSelect.current) resume()
  }

  function handleSpeak() {
    if (!selectedWord || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(selectedWord)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  function handleSave() {
    if (!selectedWord) return
    saveWord(selectedWord, isCustom ? 'Custom' : categoryId, hindiMeaning)
    dismissToolbar()
  }

  // ── Mark day complete ────────────────────────────────────────────────────
  useEffect(() => {
    if (isFinished && !isCustom) markDayComplete(categoryId, dayNum)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished])

  useEffect(() => {
    return () => {
      clearTimeout(overlayTimer.current)
      stopTTS()
    }
  }, [])

  // ── No content fallback ──────────────────────────────────────────────────
  if (!content) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ background: '#0a0a0f' }}
      >
        <p className="text-lg font-semibold mb-2" style={{ color: '#f1f1f5' }}>
          Content not available
        </p>
        <p className="text-sm mb-6" style={{ color: '#8b8ba8' }}>
          Complete previous days to unlock this content.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-2xl font-semibold text-white"
          style={{ background: '#7c3aed' }}
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0"
      style={{ background: '#0a0a0f' }}
      onClick={handleScreenTap}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-20" style={{ background: '#1a1a28' }}>
        <div
          className="h-full"
          style={{
            width: `${Math.round(progress * 100)}%`,
            background: '#7c3aed',
            transition: 'width 0.3s linear',
          }}
        />
      </div>

      {/* Top gradient + header */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-4 pt-10 pb-6 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0) 100%)',
        }}
      >
        <button
          className="pointer-events-auto p-2 -ml-2 rounded-xl"
          style={{ color: '#8b8ba8' }}
          onClick={e => { e.stopPropagation(); navigate(-1) }}
        >
          <ArrowLeft size={20} />
        </button>
        <p className="text-sm font-medium truncate flex-1 pointer-events-none" style={{ color: '#52526a' }}>
          {isCustom ? title : `Day ${dayNum} — ${title}`}
        </p>
        <button
          className="pointer-events-auto p-2 rounded-xl"
          style={{ color: isTranslating ? '#7c3aed' : isTranslated ? '#a78bfa' : '#8b8ba8' }}
          onClick={e => { e.stopPropagation(); handleTranslate() }}
          title="Translate to Hindi"
          disabled={isTranslating}
        >
          <Languages size={18} className={isTranslating ? 'animate-pulse' : ''} />
        </button>
        {ttsSupported && (
          <>
            <button
              className="pointer-events-auto px-2 py-1 rounded-lg text-xs font-bold transition-all"
              style={{ color: '#8b8ba8', background: 'rgba(255,255,255,0.05)', border: '1px solid #252535' }}
              onClick={e => { e.stopPropagation(); toggleGender(); if (ttsSpeaking) { stopTTS(); setTimeout(() => speak(isTranslated ? hindiContent : content), 80) } }}
              title={`Voice: ${ttsGender}`}
            >
              {ttsGender === 'female' ? '♀' : '♂'}
            </button>
            <button
              className="pointer-events-auto p-2 rounded-xl"
              style={{ color: ttsSpeaking ? '#a78bfa' : '#8b8ba8' }}
              onClick={e => { e.stopPropagation(); ttsSpeaking ? stopTTS() : speak(isTranslated ? hindiContent : content) }}
              title={ttsSpeaking ? 'Stop speaking' : 'Listen'}
            >
              {ttsSpeaking ? <StopCircle size={18} /> : <Volume2 size={18} />}
            </button>
          </>
        )}
        {!isCustom && (
          <button
            className="pointer-events-auto p-2 -mr-2 rounded-xl"
            style={{ color: isRegenerating ? '#7c3aed' : '#8b8ba8' }}
            onClick={e => { e.stopPropagation(); handleRegenerate() }}
            title="Regenerate content"
            disabled={isRegenerating}
          >
            <RefreshCw size={18} className={isRegenerating ? 'animate-spin' : ''} />
          </button>
        )}
      </div>

      {/* Hindi content — manual scroll overlay */}
      {isTranslated && (
        <div
          className="absolute inset-0 overflow-y-auto z-10"
          style={{ background: '#0a0a0f' }}
          onClick={e => e.stopPropagation()}
        >
          <div
            className="mx-auto px-6"
            style={{
              maxWidth: '680px',
              paddingTop: '90px',
              paddingBottom: '100px',
              ...fs,
              color: '#f1f1f5',
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              lineHeight: '2.1',
            }}
          >
            {hindiContent.split('\n').map((para, i) =>
              para.trim() ? (
                <p key={i} style={{ marginBottom: '1.6em' }}>
                  {para.trim()}
                </p>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Undo / Redo bar */}
      {(isTranslated || hasTranslation) && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl"
          style={{
            background: 'rgba(14,14,20,0.92)',
            backdropFilter: 'blur(24px)',
            border: '1px solid #252535',
          }}
        >
          <button
            onClick={e => { e.stopPropagation(); handleUndo() }}
            disabled={!isTranslated}
            className="px-3 py-1 rounded-xl text-sm font-medium"
            style={{ color: isTranslated ? '#f1f1f5' : '#52526a' }}
          >
            ← English
          </button>
          <div style={{ width: '1px', height: '16px', background: '#252535' }} />
          <button
            onClick={e => { e.stopPropagation(); handleRedo() }}
            disabled={isTranslated || !hasTranslation}
            className="px-3 py-1 rounded-xl text-sm font-medium"
            style={{ color: !isTranslated && hasTranslation ? '#f1f1f5' : '#52526a' }}
          >
            हिंदी →
          </button>
        </div>
      )}

      {/* Scrolling content — overflow hidden, moved via translateY */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <div
          ref={contentRef}
          className="mx-auto px-6"
          style={{
            maxWidth: '680px',
            paddingTop: '95vh',
            paddingBottom: '100vh',
            willChange: 'transform',
            ...fs,
            color: '#f1f1f5',
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {content.split('\n').map((para, i) =>
            para.trim() ? (
              <p key={i} style={{ marginBottom: '1.6em' }}>
                {para.trim()}
              </p>
            ) : null
          )}
        </div>
      </div>

      {/* Pause/resume tap overlay */}
      {overlayVisible && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div
            className="px-7 py-4 rounded-2xl"
            style={{
              background: 'rgba(14,14,20,0.92)',
              backdropFilter: 'blur(24px)',
              border: '1px solid #252535',
            }}
          >
            <p className="font-semibold text-base" style={{ color: '#f1f1f5' }}>
              {overlayText}
            </p>
          </div>
        </div>
      )}

      {/* Selection toolbar */}
      {selectedWord && (
        <SelectionToolbar
          word={selectedWord}
          hindiMeaning={hindiMeaning}
          isFetching={isFetchingMeaning}
          onSpeak={handleSpeak}
          onSave={handleSave}
          onDismiss={dismissToolbar}
        />
      )}

      {/* Finished overlay */}
      {isFinished && (
        <div
          className="absolute inset-0 z-40 flex items-end justify-center pb-10 px-5"
          style={{ background: 'rgba(10,10,15,0.88)', backdropFilter: 'blur(12px)' }}
          onClick={e => e.stopPropagation()}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 text-center border"
            style={{ background: '#111118', borderColor: '#252535' }}
          >
            <CheckCircle size={44} className="mx-auto mb-3" style={{ color: '#10b981' }} />
            <h2 className="text-xl font-bold mb-1" style={{ color: '#f1f1f5' }}>
              {isCustom ? 'Reading Complete!' : 'Day Complete!'}
            </h2>
            <p className="text-sm mb-6" style={{ color: '#8b8ba8' }}>
              {isCustom ? 'Great practice session.' : `You finished Day ${dayNum}: ${title}`}
            </p>
            <button
              className="w-full py-3.5 rounded-2xl font-semibold text-white"
              style={{ background: '#7c3aed' }}
              onClick={() => navigate(-1)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
