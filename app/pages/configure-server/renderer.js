const $ = require('jquery')
const remote = require('@electron/remote')
const store = remote.getGlobal('store')

$(() => {
    $('#configureForm').on('submit', (e) => {
        e.preventDefault()
        
        const server = { 
            host: $('#serverHost').val(),
            port: $('#serverPort').val()
        }

        console.log('saving data = ', server)
        store.set('serverHost', server.host)
        store.set('serverPort', server.port)

        $('#onFormSuccess').toggleClass('d-none')

        window.setTimeout(() => { 
            window.location.href = __dirname + '/../../index.html'
        }, 2000)
    })
})

