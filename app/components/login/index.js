const path = require('path')
const Base = require('../base')
const UserService = require('../../services/user')

require('../alert-error')
require('../register')

class ScabLogin extends Base {
    constructor() {
        super(path.resolve(__dirname, 'login.html'))
        this.userService = new UserService()
    }

    connectedCallback() {
        super.connectedCallback()

        document.getElementById('show-register').addEventListener('click', (e) => {
            e.preventDefault()

            const registerComponent = document.createElement('scab-register')
            this.parentElement.appendChild(registerComponent)
            this.parentElement.removeChild(this)
        })

        this.getElementsByTagName('form').item(0).addEventListener('submit', (e) => {
            e.preventDefault()

            document
                .getElementById('loading-spinner')
                .classList
                .toggle('d-none')

            const payload = {
                username: $('#username').val(),
                password: $('#password').val()
            }

            this.userService.login(payload.username, payload.password)

            .then(async (response) => {
                if (response.status !== 200) {
                    const error = await response.text()
                    throw new Error(error)
                }

                const body = await response.json()
                const token = body.token 

                if (!token) {
                    throw new Error('Null token.') 
                }

                this.userService.setToken(token)
                window.location.reload()
            })

            .catch((error) => {
                console.log('error = ', error)
                document.querySelector('scab-alert-error').content = error
            })

            .finally(() => {
                document
                    .getElementById('loading-spinner')
                    .classList
                    .toggle('d-none')
            })
        })
    }
}

customElements.define('scab-login', ScabLogin)