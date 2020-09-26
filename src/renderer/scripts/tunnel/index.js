import Vue from 'vue'
import types from './types'
import emit from './emit'
import { listen, remove, removeBut } from './listen'

const EventBus = new Vue()

export default {
    types,
    emit,
    listen,
    remove,
    removeBut,
    EventBus
}
