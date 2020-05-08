const { hypot } = Math

export const calculateChangeDirection = ({ dx, dy }) => {
  const hyp = hypot(dx, dy)
  const ax = dx / hyp
  const ay = dy / hyp
  return { ax, ay }
}

export const checkCollision = ({ dx, dy, diameter }) => {
  const distance2 = dx * dx + dy * dy
  return distance2 < diameter * diameter
}
