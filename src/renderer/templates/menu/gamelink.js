export default (name, key, image) => {
    return `
        <div class="menu-menu__game" data-key="${key}">
            <div class="game-image">
                <img src="${image}" alt="">
            </div>
            <div class="game-name">
                <h3>${name}</h3>
            </div>
        </div>
    `
}
