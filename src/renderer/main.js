import 'scripts/initial'
import 'styles/style.scss'

import store from 'store';
import menu from './menu'
import sessionReady from 'actions/session_ready'
import gameStart from 'actions/game_start'

$(function () {
    sessionReady(
        menu.onSessionReady
    )

    $('#app').on('click', '#menu .menu-menu__game', menu.onGameClick)

    gameStart(
        menu.onGameStart,
        menu.onGameExit
    )

    $(window).on("resize", ( event ) => {

        if(!store.hasGame) return;

        const rows = store.gameOpt.rows
        const cols = store.gameOpt.cols

        const w = $('#slot-display .reel').first().find('.symbol').first().outerWidth()
        const h = $('#slot-display .reel').first().find('.symbol').first().outerHeight()

        store.displaySize.width.symbol = w
        store.displaySize.height.symbol = h

        const displayBorder = parseFloat($('#slot-display').css('border-width'))
        const reelBorder = parseFloat($('#slot-display .reel').css('border-width'))
        const lineMarks = $("#slot-display .line-marks").outerWidth();
        const lineBorder = parseFloat($("#slot-display .line-marks").css('border-width'))

        $('#slot-display').css('width', ( w * cols + displayBorder * 2 + lineMarks * 2 + lineBorder * 2  ) + 'px')

        $('#slot-display').css('height', ( h * rows + displayBorder * 2 ) + 'px')

        $('#slot-display .reel').css('width', ( w + reelBorder * 2 ) + 'px')

        $('#slot-display .reel').css('height', ( h * rows + reelBorder * 2 ) + 'px')

        store.displaySize = {
            width: {
                display: $('#slot-display').outerWidth(),
                reel: $('#slot-display .reel').first().outerWidth(),
                symbol: $('#slot-display .reel').first().find('.symbol').first().outerWidth()
            },

            height: {
                display: $('#slot-display').outerHeight(),
                reel: $('#slot-display .reel').first().outerHeight(),
                symbol: $('#slot-display .reel').first().find('.symbol').first().outerHeight()
            }
        }

    })
})
