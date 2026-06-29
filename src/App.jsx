import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WORLD, getLesson } from './data/gameData'
import { useGameState } from './state/useGameState'
import WorldMap from './components/WorldMap'
import LessonScreen from './components/LessonScreen'
import BossFight from './components/BossFight'

const pageMotion = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
  transition: { duration: 0.28, ease: 'easeInOut' },
}

export default function App() {
  const game = useGameState()
  const [view, setView] = useState({ screen: 'map', nodeId: null })

  const activeNode = view.nodeId ? WORLD.nodes.find((n) => n.id === view.nodeId) : null
  const activeLesson = activeNode?.lessonId ? getLesson(activeNode.lessonId) : null

  const openNode = (node) => {
    setView({ screen: node.type === 'boss' ? 'boss' : 'lesson', nodeId: node.id })
  }
  const backToMap = () => setView({ screen: 'map', nodeId: null })

  return (
    <div className="app">
      <div className="app__frame">
        <AnimatePresence mode="wait">
          {view.screen === 'map' && (
            <motion.div key="map" className="app__page" {...pageMotion}>
              <WorldMap
                xp={game.xp}
                streak={game.streak}
                getStatus={game.getStatus}
                onSelectNode={openNode}
                worldComplete={game.worldComplete}
              />
            </motion.div>
          )}

          {view.screen === 'lesson' && activeLesson && (
            <motion.div key="lesson" className="app__page" {...pageMotion}>
              <LessonScreen
                node={activeNode}
                lesson={activeLesson}
                xp={game.xp}
                streak={game.streak}
                onPass={game.passLesson}
                onFail={game.failLesson}
                onExit={backToMap}
              />
            </motion.div>
          )}

          {view.screen === 'boss' && activeNode && (
            <motion.div key="boss" className="app__page" {...pageMotion}>
              <BossFight
                node={activeNode}
                xp={game.xp}
                streak={game.streak}
                onWin={game.winBoss}
                onLose={game.loseBoss}
                onExit={backToMap}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button className="app__reset" onClick={game.reset} title="Reset all progress">
        ↺ Reset progress
      </button>
    </div>
  )
}
