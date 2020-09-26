import displayTemplate from './display'
import controlTemplate from './controls'

export default (credits, bet, columns) => {
    return `
        <div id="slot">
            <div class="slot-col h-100p" style="width: 100%;">
                ${displayTemplate(columns)}
                ${controlTemplate(credits, bet)}
            </div>
        </div>
    `
}
