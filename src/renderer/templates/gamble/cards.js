import CardTemplate from './card'

export default (cards) => {
    const cardsTemplates = cards.map(card => {
        return CardTemplate(card.symbol, card.value)
    })

    const cardsTemplate = cardsTemplates.join('')

    return `
        <div id="gamble-numbers__display">
            <div class="numbers-display__wrapper">
                ${cardsTemplate}
            </div>
        </div>
    `
}
