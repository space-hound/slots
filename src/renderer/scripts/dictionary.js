let IS_SET = false
let SYMBOLS = null
let IMAGES = null

export const set = (symbols, images) => {
    IS_SET = true
    SYMBOLS = symbols
    IMAGES = images
}

export const isSet = () => {
    return IS_SET
}

export const data = () => {
    return {
        SYMBOLS,
        IMAGES
    }
}

export const unset = () => {
    IS_SET = false
    SYMBOLS = null
    IMAGES = null
}

export const translate = (symbol) => {
    const index = parseInt(symbol)

    return `${IMAGES.path}${IMAGES.all[index]}${IMAGES.suffix}`
}
