import dataTemplate from './data'
import gamesTemplate from './menu'

export default (credits, games) => {
    return `
        <div id="menu" class="active">
            <div class="menu-header">
                ${dataTemplate(credits)}
            </div>

            <div class="menu-menu">
                ${gamesTemplate(games)}
            </div>
        </div>
    `
}
