const path = require('path')
const Base = require('../base')
const UserService = require('../../services/user')
const AlertErrorComponent = require('../alert-error')

class ScabLogin extends Base {
    constructor() {
        super(path.resolve(__dirname, 'login.html'))
        this.userService = new UserService()
    }

    connectedCallback() {
        super.connectedCallback()

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

            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                    return 
                }

                const token = response.json().token 

                if (!token) {
                    console.log('Null token.')
                    return 
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