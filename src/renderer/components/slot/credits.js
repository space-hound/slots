const credits = () => {
    return $('#slot-control #control-balance h3')
}

export default {
    update (ammount) {
        credits().text(ammount)
    }
}
