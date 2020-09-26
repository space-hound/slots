import Menu from 'templates/menu'

export default {

    build (credits, games) {
        $('#app').append(Menu(credits, games))
    },

    toggle (state) {
        if (state) {
            $('#menu').addClass('active')
        } else {
            $('#menu').removeClass('active')
        }
    },

    setCredits (credits) {
        $('#menu .menu-info h3').text(credits)
    }
}
