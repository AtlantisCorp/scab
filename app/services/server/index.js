const remote = require("@electron/remote")
const store = remote.getGlobal("store")

module.exports = class {
    constructor() {
        this.serverHost = store.get('serverHost')
        this.serverPort = store.get('serverPort')
        this.token = sessionStorage.getItem('token')

        if (!this.serverHost || !this.serverPort) {
            throw new Error('Invalid server host/port pair.')
        }
    }

    async sendNoToken(endpoint, method, body = {}) {
        return fetch('https://' + this.serverHost + ':' + this.serverPort + endpoint, {
            method: method,
            body: body
        })
    }

    async sendToken(endpoint, method, body = {}) {
        const headers = new Headers()
        headers.set('Authorization', 'Bearer ' + this.token)

        return fetch('https://' + this.serverHost + ':' + this.serverPort + endpoint, {
            method: method,
            body: body,
            headers: headers
        })
    }
}