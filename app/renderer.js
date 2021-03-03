const remote = require('@electron/remote')
const store = remote.getGlobal('store')
const path = require('path')
const $ = require('jquery')

require(path.resolve(__dirname, 'components', 'login'))

$(() => {
    // Finds the server host/port

    const server = {
        host: store.get('serverHost'),
        port: store.get('serverPort')
    }

    if (!server.host || !server.port) {
        // We should load another page: 'pages/configure-server.html'.
        window.location.href = __dirname + '/pages/configure-server/index.html'
    }

    // Now register the user if not found in current session.

    const token = sessionStorage.getItem('user-token')

    if (!token) {
        const scablogin = document.createElement('scab-login')
        $('main').append(scablogin)
    }
})