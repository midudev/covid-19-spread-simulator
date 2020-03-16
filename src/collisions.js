const { atan2, cos, sin, sqrt } = Math

export const calculateChangeDirection = ({ dx, dy }) => {
  const angle = atan2(dy, dx)
  const ax = cos(angle)
  const ay = sin(angle)
  return { ax, ay }
}

export const checkCollision = ({ dx, dy, diameter }) => {
  const distance = sqrt(dx * dx + dy * dy)
  return distance < diameter
}
