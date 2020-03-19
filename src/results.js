import {
  COLORS,
  RUN,
  TOTAL_TICKS,
  STATES,
  COUNTERS,
  resetRun
} from './options.js'

import {
  graphElement,
  replayElement
} from './dom.js'

let graphPoint = 0
const matchMedia = window.matchMedia('(min-width: 800px)')

let isDesktop = matchMedia.matches

const domElements = Object.fromEntries(
  Object.keys(COUNTERS).map(state => {
    const el = document.getElementById(state)
    if (el) {
      el.parentNode.style = `color: ${COLORS[state]}`
    }
    return [state, document.getElementById(state)]
  })
)

const updateGraph = () => {
  let y = 0
  const rects = Object.entries(RUN.results).map(([state, count]) => {
    const color = COLORS[state]
    if (count > 0) {
      const percentatge = count / 200 * 50
      const rect = `<rect height="${percentatge}" y="${y}" width="1" fill="${color}"></rect>`
      y += percentatge
      return rect
    }
    return ''
  }).join('')

  const newGraphPoint = `<g transform="translate(${graphPoint},0)">${rects}</g>`
  graphPoint++
  graphElement.insertAdjacentHTML('beforeend', newGraphPoint)
}

export const resetValues = (isDesktopNewValue = isDesktop) => {
  graphElement.innerHTML = ''
  replayElement.style.display = 'none'
  graphPoint = 0
  isDesktop = isDesktopNewValue
  resetRun()
}

export const updateCount = () => {
  if (RUN.tick < TOTAL_TICKS) {
    // calculate max concurrent infected
    if (RUN.results[STATES.infected] > RUN.results['max-concurrent-infected']) {
      RUN.results['max-concurrent-infected']++
    }

    Object.entries(domElements).forEach(([state, domElement]) => {
      if (domElement) {
        domElement.innerText = RUN.results[state]
      }
    })

    if (isDesktop) {
      RUN.tick % 2 === 0 && updateGraph()
    } else {
      RUN.tick % 4 === 0 && updateGraph()
    }
  }

  if (RUN.tick === TOTAL_TICKS) {
    replayElement.style.display = 'flex'
  } else {
    RUN.tick++
  }
}
