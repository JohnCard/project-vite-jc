const reduceText = (char) => {
    const reducedChar = char.length >= 100 ? `${char.slice(0,100)}...` : char
    return reducedChar
}

export default {reduceText}