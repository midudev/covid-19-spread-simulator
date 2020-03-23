DEFAULT_FILTERS = {
  death: false,
  stayHome: false
}

export CANVAS_SIZE = {
  height: 880,
  width: 360
}

export DESKTOP_CANVAS_SIZE = {
  height: 400,
  width: 800
}

export BALL_RADIUS = 5
export COLORS = {
  death: '#c50000',
  recovered: '#D88DBC',
  infected: '#5ABA4A',
  well: '#63C8F2'
}

export STATES = {
  infected: 'infected',
  well: 'well',
  recovered: 'recovered',
  death: 'death'
}

export COUNTERS = {
  ...STATES,
  'max-concurrent-infected': 'max-concurrent-infected'
}

export STARTING_BALLS = {
  [STATES.infected]: 1,
  [STATES.well]: 199,
  [STATES.recovered]: 0,
  [STATES.death]: 0,
  'max-concurrent-infected': 0
}

export RUN = {
  filters: { ...DEFAULT_FILTERS },
  results: { ...STARTING_BALLS },
  tick: 0
}

export MORTALITY_PERCENTATGE = 5
export SPEED = 1
export TOTAL_TICKS = 1600
export TICKS_TO_RECOVER = 500
export STATIC_PEOPLE_PERCENTATGE = 25

export resetRun = () => {
  RUN.results = { ...STARTING_BALLS }
  RUN.tick = 0
}
