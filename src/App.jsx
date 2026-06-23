import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import AppLayout from './layouts/AppLayout'

import Home from './pages/Home'
import ReadingChallenge from './pages/ReadingChallenge'
import ChallengeDetail from './pages/ChallengeDetail'
import ReaderScreen from './pages/ReaderScreen'
import CustomReader from './pages/CustomReader'
import Vocabulary from './pages/Vocabulary'
import WPMChallenge from './pages/WPMChallenge'
import Settings from './pages/Settings'
import GrammarHome from './pages/GrammarHome'
import GrammarDetail from './pages/GrammarDetail'
import GrammarReader from './pages/GrammarReader'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/challenge" element={<ReadingChallenge />} />
            <Route path="/challenge/:categoryId" element={<ChallengeDetail />} />
            <Route path="/challenge/:categoryId/day/:day" element={<ReaderScreen />} />
            <Route path="/grammar" element={<GrammarHome />} />
            <Route path="/grammar/:topicId" element={<GrammarDetail />} />
            <Route path="/grammar/:topicId/read" element={<GrammarReader />} />
            <Route path="/custom" element={<CustomReader />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/wpm" element={<WPMChallenge />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
