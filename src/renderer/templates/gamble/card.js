
export default (symbol, value) => {
    return `
        <div class="numbers-card" data-card="${value}">
            <div> ${symbol} </div>
        </div>
    `
}
