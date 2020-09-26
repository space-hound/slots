import SymbolTemplate from './symbol'

export default (column) => {
    const reelTemplates = column.map(symbol => {
        return SymbolTemplate(symbol)
    })

    const reelTemplate = reelTemplates.join('')

    return `
        <div class="reel">
            <div class="reel-inner">
                ${reelTemplate}
            </div>
        </div>
    `
}
