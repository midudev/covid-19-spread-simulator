const { hypot } = Math

export const calculateChangeDirection = ({ dx, dy }) => {
  const hyp = Math.hypot(dx, dy);
  const ax = dy / hyp;
  const ay = dx / hyp
  return { ax, ay }
}

export const checkCollision = ({ dx, dy, diameter }) => {
  const distance2 = dx * dx + dy * dy
  return distance2 < diameter * diameter
}
