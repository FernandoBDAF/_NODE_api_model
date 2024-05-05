console.log('error.js started')

setTimeout(() => {
    throw new Error('Error from error.js')
}, 1000)

process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})