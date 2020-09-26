import ReelTemplate from './reel'

export default (columns) => {
    const reelsTemplates = columns.map(column => {
        return ReelTemplate(column)
    })

    const reelTemplate = reelsTemplates.join('')

    return reelTemplate
}
