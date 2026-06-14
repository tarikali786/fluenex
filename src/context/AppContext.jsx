import { createContext, useContext, useState, useEffect } from 'react'
import { getItem, setItem, clearAll } from '../utils/storage'

const AppContext = createContext(null)

const DEFAULT_SETTINGS = {
  theme: 'dark',
  fontSize: 'medium',
  readingMode: 'intermediate',
}

const DEFAULT_PROGRESS = {
  currentCategory: 'daily-speaking',
  currentDay: 1,
  completedDays: {},  // { 'daily-speaking': [1, 2, 3], ... }
}

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(() =>
    getItem('settings', DEFAULT_SETTINGS)
  )
  const [progress, setProgress] = useState(() =>
    getItem('progress', DEFAULT_PROGRESS)
  )
  const [vocabulary, setVocabulary] = useState(() =>
    getItem('vocabulary', [])
  )
  const [achievements, setAchievements] = useState(() =>
    getItem('achievements', [])
  )
  const [toast, setToast] = useState(null)

  useEffect(() => { setItem('settings', settings) }, [settings])
  useEffect(() => { setItem('progress', progress) }, [progress])
  useEffect(() => { setItem('vocabulary', vocabulary) }, [vocabulary])
  useEffect(() => { setItem('achievements', achievements) }, [achievements])

  function updateSetting(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  function setActiveCategory(categoryId) {
    setProgress(prev => ({ ...prev, currentCategory: categoryId, currentDay: getCurrentDay(categoryId, prev) }))
  }

  function getCurrentDay(categoryId, prog = progress) {
    const completed = prog.completedDays[categoryId] || []
    if (completed.length === 0) return 1
    return Math.min(completed.length + 1, 40)
  }

  function markDayComplete(categoryId, day) {
    setProgress(prev => {
      const completed = prev.completedDays[categoryId] || []
      if (completed.includes(day)) return prev
      const updated = [...completed, day].sort((a, b) => a - b)
      return {
        ...prev,
        currentCategory: categoryId,
        currentDay: Math.min(day + 1, 40),
        completedDays: { ...prev.completedDays, [categoryId]: updated },
      }
    })
  }

  function isDayComplete(categoryId, day) {
    return (progress.completedDays[categoryId] || []).includes(day)
  }

  function getCategoryProgress(categoryId) {
    const completed = (progress.completedDays[categoryId] || []).length
    return { completed, total: 40, percentage: Math.round((completed / 40) * 100) }
  }

  function saveWord(word, category) {
    const entry = { word, category, date: new Date().toISOString(), id: Date.now() }
    setVocabulary(prev => {
      if (prev.some(v => v.word.toLowerCase() === word.toLowerCase())) return prev
      return [entry, ...prev]
    })
    showToast('Word saved to vocabulary!')
  }

  function deleteWord(id) {
    setVocabulary(prev => prev.filter(v => v.id !== id))
  }

  function clearVocabulary() {
    setVocabulary([])
  }

  function addAchievement(achievement) {
    setAchievements(prev => {
      const existing = prev.find(a => a.id === achievement.id)
      if (existing) {
        // Only update if the new WPM is a personal best
        if (!achievement.wpm || (existing.wpm && achievement.wpm <= existing.wpm)) return prev
        return prev.map(a =>
          a.id === achievement.id
            ? { ...a, ...achievement, date: new Date().toISOString() }
            : a
        )
      }
      return [{ ...achievement, date: new Date().toISOString() }, ...prev]
    })
  }

  function resetAllData() {
    clearAll()
    setSettings(DEFAULT_SETTINGS)
    setProgress(DEFAULT_PROGRESS)
    setVocabulary([])
    setAchievements([])
    showToast('All data has been reset.')
  }

  function showToast(message, type = 'success') {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <AppContext.Provider value={{
      settings,
      progress,
      vocabulary,
      achievements,
      toast,
      updateSetting,
      setActiveCategory,
      getCurrentDay,
      markDayComplete,
      isDayComplete,
      getCategoryProgress,
      saveWord,
      deleteWord,
      clearVocabulary,
      addAchievement,
      resetAllData,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
