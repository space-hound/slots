
export default (win) => {
    return `
        <div id="gamble-numbers__controls">
            <div class="number-control__wrapper">
                <div class="gamble-row">
                    <div class="number-won number-text">
                        <span>YOU HAVE NOW</span>
                        <div>${win}</div>
                    </div>
                    <div class="number-win number-text">
                        <span>YOU CAN HAVE</span>
                        <div>${win * 2}</div>
                    </div>
                </div>
                <div class="gamble-row">
                    <div class="number-smaller number-button">
                        <div>Smaller</div>
                    </div>
                    <div class="number-collect number-button">
                        <div>Collect</div>
                    </div>
                    <div class="number-bigger number-button">
                        <div>Bigger</div>
                    </div>
                </div>
            </div>
        </div>
    `
}
