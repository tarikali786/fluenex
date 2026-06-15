import { useState, useEffect, useRef } from 'react'

function pickVoice(voices, gender) {
  const en = voices.filter(v => v.lang.startsWith('en'))
  if (!en.length) return null

  const name = (v) => v.name.toLowerCase()

  if (gender === 'female') {
    return (
      en.find(v => name(v).includes('female')) ||
      en.find(v => /zira|samantha|victoria|karen|moira|tessa|fiona|aria|jenny|sonia|susan|linda|emily|lisa/.test(name(v))) ||
      en.find(v => !name(v).includes('male') && !name(v).includes('david') && !name(v).includes('mark') && !name(v).includes('james') && !name(v).includes('daniel') && !name(v).includes('george') && !name(v).includes('rishi')) ||
      en[0]
    )
  } else {
    return (
      en.find(v => name(v).includes('male') && !name(v).includes('female')) ||
      en.find(v => /david|mark|james|daniel|george|rishi|alex|tom|oliver/.test(name(v))) ||
      en[0]
    )
  }
}

export default function useTTS() {
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)
  const [gender, setGender] = useState('female')
  const [voices, setVoices] = useState([])
  const [supported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window)
  const utteranceRef = useRef(null)

  useEffect(() => {
    if (!supported) return
    function loadVoices() {
      const v = window.speechSynthesis.getVoices()
      if (v.length) setVoices(v)
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => { window.speechSynthesis.cancel() }
  }, [supported])

  function speak(text, rate = 1) {
    if (!supported || !text.trim()) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.lang = 'en-US'

    const voice = pickVoice(voices, gender)
    if (voice) utterance.voice = voice

    utterance.onstart = () => { setSpeaking(true); setPaused(false) }
    utterance.onend = () => { setSpeaking(false); setPaused(false) }
    utterance.onerror = () => { setSpeaking(false); setPaused(false) }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  function pause() {
    if (!supported) return
    window.speechSynthesis.pause()
    setPaused(true)
  }

  function resume() {
    if (!supported) return
    window.speechSynthesis.resume()
    setPaused(false)
  }

  function stop() {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
    setPaused(false)
  }

  function toggleGender() {
    setGender(g => g === 'female' ? 'male' : 'female')
  }

  return { speak, pause, resume, stop, speaking, paused, supported, gender, toggleGender }
}
