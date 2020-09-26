import { translate } from 'scripts/dictionary'

const real = (symbol) => {
    return `
        <div class="symbol" data-row="${symbol.coords.row}" data-col="${symbol.coords.col}" data-symbol="${symbol.value}">
            <img src="${translate(symbol.value)}">
        </div>
    `
}

const dummy = (symbol) => {
    return `
        <div class="symbol">
            <img src="${translate(symbol.value)}">
        </div>
    `
}

export default (symbol) => {
    if (symbol.coords === null) {
        return dummy(symbol)
    }

    return real(symbol)
}
