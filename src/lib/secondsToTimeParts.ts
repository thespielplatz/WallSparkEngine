export default (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secondsLeft = Math.floor(seconds % 60)

  return {
    hours,
    minutes,
    seconds: secondsLeft,
  }
}
