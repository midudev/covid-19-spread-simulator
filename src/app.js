import {
  BALL_RADIUS,
  CANVAS_SIZE,
  DESKTOP_CANVAS_SIZE,
  STARTING_BALLS,
  RUN,
  STATIC_PEOPLE_PERCENTATGE,
  STATES
} from './options.js'

import {
  replayButton,
  deathFilter,
  stayHomeFilter
} from './dom.js'

import { Ball } from './Ball.js'

import {
  resetValues,
  updateCount
} from './results.js'

let balls = []
const matchMedia = window.matchMedia('(min-width: 800px)')

let isDesktop = matchMedia.matches

export const canvas = new window.p5(sketch => { // eslint-disable-line
  const startBalls = () => {
    let id = 0
    balls = []
    Object.keys(STARTING_BALLS).forEach(state => {
      Array.from({ length: STARTING_BALLS[state] }, () => {
        const hasMovement = RUN.filters.stayHome
          ? sketch.random(0, 100) < STATIC_PEOPLE_PERCENTATGE || state === STATES.infected
          : true

        balls[id] = new Ball({
          id,
          sketch,
          state,
          hasMovement,
          x: sketch.random(BALL_RADIUS, sketch.width - BALL_RADIUS),
          y: sketch.random(BALL_RADIUS, sketch.height - BALL_RADIUS)
        })
        id++
      })
    })
  }

  const createCanvas = () => {
    const { height, width } = isDesktop
      ? DESKTOP_CANVAS_SIZE
      : CANVAS_SIZE

    sketch.createCanvas(width, height)
  }

  sketch.setup = () => {
    createCanvas()
    startBalls()

    matchMedia.addListener(e => {
      isDesktop = e.matches
      createCanvas()
      startBalls()
      resetValues()
    })

    replayButton.onclick = () => {
      startBalls()
      resetValues()
    }

    deathFilter.onclick = () => {
      RUN.filters.death = !RUN.filters.death
      document.getElementById('death-count').classList.toggle('show', RUN.filters.death)
      startBalls()
      resetValues()
    }

    stayHomeFilter.onchange = () => {
      RUN.filters.stayHome = !RUN.filters.stayHome
      startBalls()
      resetValues()
    }
  }

  sketch.draw = () => {
    sketch.background('white')
    balls.forEach(ball => {
      ball.checkState()
      ball.checkCollisions({ others: balls })
      ball.move()
      ball.render()
    })
    updateCount()
  }
}, document.getElementById('canvas'))
