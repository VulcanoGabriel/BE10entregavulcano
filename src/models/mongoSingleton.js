import mongoose from "mongoose";

export default class MongoSingleton {

    static #instance

    constructor() {
        mongoose.connect(process.env.MONGOURL, { dbName: process.env.MONGODB})
            .then(() => console.log('Base de datos OK'))
            .catch(e => console.error(e))
    }

    static getInstance() {

        if(this.#instance) {
            console.log('Conectados a instancia...')
            
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.log('Instancia creada con exito...')

        return this.#instance
    }

}

