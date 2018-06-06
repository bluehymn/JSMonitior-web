import EventEmitter from'events'

class Emitter extends EventEmitter{}

export const myEmitter = new Emitter()
