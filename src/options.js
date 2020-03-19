const DEFAULT_FILTERS = {
  death: false,
  stayHome: false
}

export const CANVAS_SIZE = {
  height: 880,
  width: 360
}

export const DESKTOP_CANVAS_SIZE = {
  height: 400,
  width: 800
}

export const BALL_RADIUS = 5
export const COLORS = {
  death: '#c50000',
  recovered: '#D88DBC',
  infected: '#5ABA4A',
  well: '#63C8F2'
}

export const STATES = {
  infected: 'infected',
  well: 'well',
  recovered: 'recovered',
  death: 'death'
}

export const COUNTERS = {
  ...STATES,
  'max-concurrent-infected': 'max-concurrent-infected'
}

export const STARTING_BALLS = {
  [STATES.infected]: 1,
  [STATES.well]: 199,
  [STATES.recovered]: 0,
  [STATES.death]: 0,
  'max-concurrent-infected': 0
}

export const RUN = {
  filters: { ...DEFAULT_FILTERS },
  results: { ...STARTING_BALLS },
  tick: 0
}

export const MORTALITY_PERCENTATGE = 5
export const SPEED = 1
export const TOTAL_TICKS = 1600
export const TICKS_TO_RECOVER = 500
export const STATIC_PEOPLE_PERCENTATGE = 25

export const resetRun = () => {
  RUN.results = { ...STARTING_BALLS }
  RUN.tick = 0
}
