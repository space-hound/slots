import CardsTemplate from './cards'
import ControlTemplate from './control'

export default (cards, hold) => {
    return `
        <div id="gamble">
            <div id="gamble-numbers">
                ${CardsTemplate(cards)}
                ${ControlTemplate(hold)}
            </div>
        </div>
    `
}
