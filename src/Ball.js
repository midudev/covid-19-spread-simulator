import {
  BALL_RADIUS,
  COLORS,
  MORTALITY_PERCENTATGE,
  TICKS_TO_RECOVER,
  TICKS_TO_INCUBATE,
  RUN,
  STATES,
  ACCELERATION_WHEN_RECOVERED
} from './options.js'
import { checkCollision, calculateChangeDirection } from './collisions.js'

const diameter = BALL_RADIUS * 2

export class Ball {
  constructor ({
    x, y, id, state, sketch, hasMovement,
    has_app_installed: hasAppInstalled, maxMovementSpeed
  }) {
    this.x = x
    this.y = y
    this.maxMovementSpeed = maxMovementSpeed
    this.vx = sketch.random(-1, 1) * this.maxMovementSpeed
    this.vy = sketch.random(-1, 1) * this.maxMovementSpeed
    this.sketch = sketch
    this.id = id
    this.state = state
    this.timeInfected = 0
    this.timeIncubating = 0
    this.hasMovement = hasMovement
    this.hasCollision = true
    this.survivor = false
    this.hasAppInstalled = hasAppInstalled
  }

  checkState () {
    if (this.state === STATES.infected) {
      if (RUN.filters.death && !this.survivor && this.timeInfected >= TICKS_TO_RECOVER / 2) {
        this.survivor = this.sketch.random(100) >= MORTALITY_PERCENTATGE
        if (!this.survivor) {
          this.hasMovement = false
          this.state = STATES.death
          RUN.results[STATES.infected]--
          RUN.results[STATES.death]++
          return
        }
      }
      if (this.hasAppInstalled) {
        this.hasMovement = false
      }

      if (this.timeInfected >= TICKS_TO_RECOVER) {
        this.state = STATES.recovered
        RUN.results[STATES.infected]--
        RUN.results[STATES.recovered]++
        this.hasMovement = true
        this.accelerateBackToHealthyLevel()
      } else {
        this.timeInfected++
      }
    }
    if (this.state === STATES.incubating) {
      if (this.timeIncubating >= TICKS_TO_INCUBATE) {
        this.state = STATES.infected
        RUN.results[STATES.infected]++
        RUN.results[STATES.incubating]--
        this.hasMovement = false
      } else {
        this.timeIncubating++
      }
    }
  }

  accelerateBackToHealthyLevel () {
    if (this.vx > 0) {
      this.vx = Math.min(this.maxMovementSpeed, this.vx * ACCELERATION_WHEN_RECOVERED)
    } else if (this.vx === 0) {
      this.vx = this.sketch.random(-1, 1) * this.maxMovementSpeed
    } else {
      this.vx = Math.max(-this.maxMovementSpeed, this.vx * ACCELERATION_WHEN_RECOVERED)
    }
    if (this.vy > 0) {
      this.vy = Math.min(this.maxMovementSpeed, this.vy * ACCELERATION_WHEN_RECOVERED)
    } else if (this.vy === 0) {
      this.vy = this.sketch.random(-1, 1) * this.maxMovementSpeed
    } else {
      this.vy = Math.max(-this.maxMovementSpeed, this.vy * ACCELERATION_WHEN_RECOVERED)
    }
  }

  checkCollisions ({ others }) {
    if (this.state === STATES.death) return

    for (let i = this.id + 1; i < others.length; i++) {
      const otherBall = others[i]
      const { state: otherBallState, x: otherBallX, y: otherBallY } = otherBall
      if (otherBallState === STATES.death) continue

      const dx = otherBallX - this.x
      const dy = otherBallY - this.y

      if (checkCollision({ dx, dy, diameter: BALL_RADIUS * 2 })) {
        const { ax, ay } = calculateChangeDirection({ dx, dy })

        this.vx -= ax
        this.vy -= ay
        otherBall.vx = ax
        otherBall.vy = ay

        // both has same state, so nothing to do
        if (this.state === otherBallState) return
        // if any is recovered, then nothing happens
        if (this.state === STATES.recovered || otherBallState === STATES.recovered) return
        // then, if some is infected, then we make both infected
        if (this.state === STATES.infected || otherBallState === STATES.infected) {
          if (this.state === STATES.well) {
            this.state = STATES.incubating
            RUN.results[STATES.incubating]++
            RUN.results[STATES.well]--

            if (this.isAwareToBeInfected(otherBall)) {
              // Make the person who was healthy aware of his condition by stopping her movements
              this.hasMovement = false
            }
          }
          if (otherBallState === STATES.well) {
            otherBall.state = STATES.incubating
            RUN.results[STATES.incubating]++
            RUN.results[STATES.well]--
            if (this.isAwareToBeInfected(otherBall)) {
              // Make the person who was healthy aware of his condition by stopping her movements
              otherBall.hasMovement = false
            }
          }
        }
      }
    }
  }

  isAwareToBeInfected (otherBall) {
    return this.hasAppInstalled && otherBall.hasAppInstalled
  }

  move () {
    if (!this.hasMovement) return

    this.x += this.vx
    this.y += this.vy

    // check horizontal walls
    if (
      (this.x + BALL_RADIUS > this.sketch.width && this.vx > 0) ||
      (this.x - BALL_RADIUS < 0 && this.vx < 0)) {
      this.vx *= -1
    }

    // check vertical walls
    if (
      (this.y + BALL_RADIUS > this.sketch.height && this.vy > 0) ||
      (this.y - BALL_RADIUS < 0 && this.vy < 0)) {
      this.vy *= -1
    }
  }

  render () {
    const color = COLORS[this.state]
    this.sketch.noStroke()
    this.sketch.fill(color)
    this.sketch.ellipse(this.x, this.y, diameter, diameter)
    if (this.hasAppInstalled) {
      this.sketch.fill(COLORS.app_installed)
      this.sketch.ellipse(this.x, this.y, 4, 4)
    }
  }
}
