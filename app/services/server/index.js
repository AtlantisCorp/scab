import { session } from "electron"

const remote = require("@electron/remote")
const store = remote.getGlobal("store")

export default class {
    constructor() {
        this.serverHost = store.get('serverHost')
        this.serverPort = store.get('serverPort')
        this.token = sessionStorage.getItem('token')

        if (!this.serverHost || !this.serverPort) {
            throw new Error('Invalid server host/port pair.')
        }
    }

    async sendNoToken(endpoint, method, body) {
        return fetch(this.serverHost + ':' + this.serverPort + endpoint, {
            method: method,
            body: body
        })
    }

    async sendToken(endpoint, method, body) {
        const headers = new Headers()
        headers.set('Authorization', 'Bearer ' + this.token)

        return fetch(this.serverHost + ':' + this.serverPort + endpoint, {
            method: method,
            body: body,
            headers: headers
        })
    }
}