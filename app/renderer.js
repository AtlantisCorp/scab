const remote = require('@electron/remote')
const store = remote.getGlobal('store')
const path = require('path')
const $ = require('jquery')
const UserService = require('./services/user')

require(path.resolve(__dirname, 'components', 'alert-error'))
require(path.resolve(__dirname, 'components', 'autocenter'))
require(path.resolve(__dirname, 'components', 'component-load-error'))
require(path.resolve(__dirname, 'components', 'dashboard'))
require(path.resolve(__dirname, 'components', 'dashboard-cols'))
require(path.resolve(__dirname, 'components', 'dashboard-menu'))
require(path.resolve(__dirname, 'components', 'dashboard-menu-item'))
require(path.resolve(__dirname, 'components', 'login'))
require(path.resolve(__dirname, 'components', 'register'))
require(path.resolve(__dirname, 'components', 'toggle-switch'))

class ScabMain extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
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

        const users = new UserService()
        const token = users.token()

        if (!token) {
            const scablogin = document.createElement('scab-login')
            $('scab-main').append(scablogin)
            return 
        }

        this.append(document.createElement('scab-dashboard-cols'))
    }
}

customElements.define('scab-main', ScabMain)