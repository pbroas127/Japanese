import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { getNode, getLesson } from './data/gameData'
import { useGameState } from './state/useGameState'
import TopHUD from './components/TopHUD'
import BottomNav from './components/BottomNav'
import WorldMap from './components/WorldMap'
import LearnScreen from './components/LearnScreen'
import PracticeScreen from './components/PracticeScreen'
import ProgressPage from './components/ProgressPage'
import SettingsPage from './components/SettingsPage'
import LessonScreen from './components/LessonScreen'
import BossFight from './components/BossFight'
import StreakPage from './components/StreakPage'
import MapEditor from './components/MapEditor'

const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.24, ease: 'easeInOut' },
}

export default function App() {
  const game = useGameState()
  const [tab, setTab] = useState('map')
  const [overlay, setOverlay] = useState(null) // { type:'lesson'|'boss', nodeId }
  const [editing, setEditing] = useState(false)

  const openNode = (node) => setOverlay({ type: node.type === 'boss' ? 'boss' : 'lesson', nodeId: node.id })
  const closeOverlay = () => setOverlay(null)

  const overlayNode = overlay ? getNode(overlay.nodeId) : null
  const overlayLesson = overlayNode?.lessonId ? getLesson(overlayNode.lessonId) : null

  return (
    <MotionConfig reducedMotion={game.settings.reducedMotion ? 'always' : 'never'}>
      <div className="app">
        <div className="app__frame">
          {/* ── Full-screen lesson / boss overlays ── */}
          <AnimatePresence>
            {overlay?.type === 'lesson' && overlayLesson && (
              <motion.div key="lesson" className="app__overlay" {...pageMotion}>
                <LessonScreen
                  node={overlayNode}
                  lesson={overlayLesson}
                  xp={game.xp}
                  streak={game.streak}
                  petals={game.petals}
                  stagesDone={game.getProgress(overlayNode.id).stagesDone}
                  streakActiveToday={game.streakActiveToday}
                  onStage={game.completeStage}
                  onReview={game.recordReview}
                  onPass={game.passLesson}
                  onFail={game.failLesson}
                  onExit={closeOverlay}
                />
              </motion.div>
            )}
            {overlay?.type === 'boss' && overlayNode && (
              <motion.div key="boss" className="app__overlay" {...pageMotion}>
                <BossFight
                  node={overlayNode}
                  xp={game.xp}
                  streak={game.streak}
                  petals={game.petals}
                  onWin={game.winBoss}
                  onLose={game.loseBoss}
                  onExit={closeOverlay}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Main shell: HUD + tab content + nav ── */}
          {!overlay && (
            <div className="shell">
              <TopHUD
                xp={game.xp}
                streak={game.streak}
                petals={game.petals}
                onOpenProfile={() => setTab('progress')}
                onOpenSettings={() => setTab('settings')}
                onOpenStreak={() => setTab('streak')}
              />

              <main className="shell__content">
                <AnimatePresence mode="wait">
                  <motion.div key={tab} className="shell__page" {...pageMotion}>
                    {tab === 'map' && (
                      <WorldMap
                        getStatus={game.getStatus}
                        getProgress={game.getProgress}
                        onSelectNode={openNode}
                        worldComplete={game.worldComplete}
                        streak={game.streak}
                        flash={game.flash}
                        onClearFlash={game.clearFlash}
                      />
                    )}
                    {tab === 'learn' && <LearnScreen getStatus={game.getStatus} onSelectNode={openNode} />}
                    {tab === 'practice' && (
                      <PracticeScreen
                        masteredChars={game.stats.kana}
                        srs={game.srs}
                        vocabUnlocked={game.vocabUnlocked}
                        onReview={game.recordReview}
                      />
                    )}
                    {tab === 'progress' && <ProgressPage game={game} />}
                    {tab === 'settings' && <SettingsPage game={game} />}
                    {tab === 'streak' && <StreakPage game={game} onClose={() => setTab('map')} />}
                  </motion.div>
                </AnimatePresence>
              </main>

              <BottomNav active={tab} onChange={setTab} />

              {tab === 'map' && (
                <button className="edit-fab" onClick={() => setEditing(true)}>
                  Edit Layout
                </button>
              )}
            </div>
          )}

          {editing && <MapEditor onExit={() => setEditing(false)} />}
        </div>
      </div>
    </MotionConfig>
  )
}
