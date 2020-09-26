import ReelTemplate from './reel'

export default (columns) => {
    const reelsTemplates = columns.map(column => {
        return ReelTemplate(column)
    })

    const reelTemplate = reelsTemplates.join('')

    return `
        <div id="slot-display" style="margin: 0 auto;">
            <div class="line-marks left">
                <div class="mark-row">
                    <div class="mark"><span>4</span></div>
                    <div class="mark"><span>2</span></div>
                </div>
                <div class="mark-row">
                    <div class="mark"><span>1</span></div>
                </div>
                <div class="mark-row">
                    <div class="mark"><span>3</span></div>
                    <div class="mark"><span>5</span></div>
                </div>
            </div>
            <div class="display">
                ${reelTemplate}
            </div>
            <div class="line-marks right">
                <!-- <div class="mark-row mark-control">
                    <div class="mark-control"><span>0</span></div>
                </div> -->
                <div class="mark-row">
                    <div class="mark"><span>4</span></div>
                    <div class="mark"><span>2</span></div>
                </div>
                <div class="mark-row">
                    <div class="mark"><span>1</span></div>
                </div>
                <div class="mark-row">
                    <div class="mark"><span>3</span></div>
                    <div class="mark"><span>5</span></div>
                </div>
            </div>
        </div>
    `
}
