const useGenerateColor = () => {
  const generateBackgroundColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  const backgroundColor = generateBackgroundColor()

  const generateTextColor = () => {
    const r = parseInt(backgroundColor.substr(1, 2), 16)
    const g = parseInt(backgroundColor.substr(3, 2), 16)
    const b = parseInt(backgroundColor.substr(5, 2), 16)

    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

    const textColor = luminance > 0.5 ? '#000000' : '#ffffff'

    if (luminance > 0.9) {
      return '#000000'
    } else if (luminance < 0.1) {
      return '#ffffff'
    } else {
      return textColor
    }
  }

  return {
    backgroundColor: generateBackgroundColor(),
    textColor: generateTextColor(),
  }
}

export const generateBackgroundColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export const generateColors = () => {
  const backgroundColor = generateBackgroundColor()

  const r = parseInt(backgroundColor.substr(1, 2), 16)
  const g = parseInt(backgroundColor.substr(3, 2), 16)
  const b = parseInt(backgroundColor.substr(5, 2), 16)

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  const textColor = luminance > 0.5 ? '#000000' : '#ffffff'

  if (luminance > 0.9) {
    return { backgroundColor, textColor: '#000000' }
  } else if (luminance < 0.1) {
    return { backgroundColor, textColor: '#ffffff' }
  } else {
    return { backgroundColor, textColor }
  }
}

export default useGenerateColor
