export const chainAnimations = (optionsArray) => {
    return optionsArray.reduce((promise, current) => {
        promise.then(() => {
            singleAnimate(current)
        })
    }, Promise.resolve())
}

export const lastAnimations = (optionsArray) => {
    return Promise.all(optionsArray.map(singleAnimate))
}

export const singleAnimate = (options) => {
    return new Promise(resolve => {
        anime({
            ...options,
            complete (animation) {
                resolve(animation)
            }
        })
    })
}
