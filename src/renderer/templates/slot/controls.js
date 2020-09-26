
export default (credits, bet) => {
    return `
        <div id="slot-control" class="w-100p">
            <div class="slot-row slot-control__wrapper">
                <div class="slot-col balance-col">
                    <div class="slot-row w-100p">
                        <div id="control-message" class="control-text">
                            <h3> Please Place Your Bet </h3>
                        </div>
                    </div>
                    <div class="slot-row w-100p">
                        <div id="control-balance" class="control-text">
                            <span> Balance: </span>
                            <h3>${credits}</h3>
                        </div>
                        <div id="control-exit" class="control-button">
                            <h3> Exit </h3>
                        </div>
                    </div>
                </div>
                <div class="slot-col bet-col">
                    <div id="control-bet" class="control-mixt">
                        <div class="bet-actions">
                            <div class="bet-up control-button" data-action="next">
                                <i class="fas fa-plus"></i>
                            </div>
                            <span> Bet </span>
                            <div class="bet-down control-button" data-action="prev">
                                <i class="fas fa-minus"></i>
                            </div>
                        </div>
                        <div class="bet-display control-text">
                            <h3>${bet}</h3>
                        </div>
                    </div>
                </div>
                <div class="slot-col gamble-col">
                    <div id="control-gamble" class="control-button">
                        <h3> Gamble </h3>
                    </div>
                    <div id="control-paytable" class="control-button">
                        <h3> Paytable </h3>
                    </div>
                </div>
                <div class="slot-col control-col">
                    <div id="control-play" class="control-button start">
                        <div class="play-start">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="play-stop">
                            <i class="fas fa-stop"></i>
                        </div>
                    </div>
                    <div id="control-auto" class="control-button start">
                        <div class="play-start">
                            <i class="fas fa-sync-alt"></i>
                        </div>
                        <div class="play-stop">
                            <i class="fas fa-hand-paper"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}
