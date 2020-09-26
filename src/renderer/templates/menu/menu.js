import GameLinkTemplate from './gamelink'

export default (games) => {
    const gameLinksTemplates = games.map(game => {
        return GameLinkTemplate(game.name, game.key, game.image)
    })

    return gameLinksTemplates.join(' ')
}
