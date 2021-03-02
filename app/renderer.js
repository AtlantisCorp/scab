const remote = require('@electron/remote')
const store = remote.getGlobal('store')

// Tries to reach the server.

const server = {
    host: store.get('serverHost'),
    port: store.get('serverPort')
}

if (!server.host || !server.port) {
    // We should load another page: 'pages/configure-server.html'.
    window.location.href = __dirname + '/pages/configure-server/index.html'
}