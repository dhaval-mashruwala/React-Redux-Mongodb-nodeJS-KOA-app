'use strict'

import mongoose from 'mongoose'

const development = 'mongodb://localhost/bigBoss-dev'

function connectDatabase(uri) {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('Database connection closed.'))
            .once('open', () => resolve(mongoose.connection[0]))

        mongoose.connect(uri)
    })
}


export default async () => {

    try {
        const info = await connectDatabase(development)
        console.log(`Connected to database - ${development}`)
    } catch (error) {
        console.error(`Unable to connect to database - ${error}`)
    }
}
