const ServerService = require('../server')
const remote = require('@electron/remote')
const store = remote.getGlobal('store')

module.exports = class {
    constructor() {
        this.server = new ServerService()
    }

    async login(username, password) {
        const response = await this.server.sendNoToken('/api/v1/user/login', 'POST', {
            username: username,
            password: password
        })

        return response
    }

    setToken(token) {
        store.set('token', token)
        this.server = new ServerService()
    }

    logout() {
        store.delete('token')
        this.server = new ServerService()
    }

    async register(username, password) {
        return await this.server.sendNoToken('/api/v1/user/register', 'POST', {
            username: username,
            password: password
        })
    }

    async delete() {
        const response = await this.server.sendToken('/api/v1/user', 'DELETE')
        this.logout()
        return response
    }

    async infos() {
        return this.server.sendToken('/api/v1/user', 'GET')
    }
}