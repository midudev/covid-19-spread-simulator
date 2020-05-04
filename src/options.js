const DEFAULT_FILTERS = {
  death: false,
  stayHome: false
}

export const CANVAS_SIZE = {
  height: 780,
  width: 360
}

export const DESKTOP_CANVAS_SIZE = {
  height: 400,
  width: 765
}

export const BALL_RADIUS = 5
export const COLORS = {
  death: '#bc4408',
  recovered: '#0880bc',
  incubating: '#f5d11b',
  infected: '#c898a2',
  well: '#adbc08',
  app_installed: '#000000'
}

export const STATES = {
  infected: 'infected',
  incubating: 'incubating',
  well: 'well',
  recovered: 'recovered',
  death: 'death'
}

export const PREVENTION_APP_STATES = {
  installed: 'installed',
  not_installed: 'not_installed'
}

export const COUNTERS = {
  ...STATES,
  'max-concurrent-infected': 'max-concurrent-infected'
}

export const STARTING_BALLS = {
  [STATES.infected]: 1,
  [STATES.well]: 0,
  [STATES.recovered]: 0,
  [STATES.death]: 0,
  [STATES.incubating]: 0,
  'max-concurrent-infected': 0
}

export const RUN = {
  filters: { ...DEFAULT_FILTERS },
  results: { ...STARTING_BALLS },
  tick: 0
}

export const MORTALITY_PERCENTATGE = 5
export const TOTAL_TICKS = 1600
export const TICKS_TO_RECOVER = 500
export const TICKS_TO_INCUBATE = 100
export const SPEED_FROM_UI_MULTIPLIER = 100
export const STATIC_PEOPLE_PERCENTATGE = 25

export const resetRun = () => {
  RUN.results = { ...STARTING_BALLS }
  RUN.tick = 0
}
