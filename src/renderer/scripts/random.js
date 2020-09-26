import Chance from 'chance'
import { data } from './dictionary'

let CHANCE = new Chance()

export const random = (count) => {
    const array = []

    for (let i = 0; i < count; i++) {
        array.push(CHANCE.pickone(data().SYMBOLS, count))
    }

    return array
}
