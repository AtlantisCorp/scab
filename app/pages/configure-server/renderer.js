const $ = require('jquery')

$(() => {
    $('#configureForm').on('submit', (e) => {
        e.preventDefault()
        console.log('saving data')
    })
})

