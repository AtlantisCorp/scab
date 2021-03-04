const path = require('path')
const Base = require('../base')

class ScabLogin extends Base {
    constructor() {
        super(path.resolve(__dirname, 'login.html'))
    }

    connectedCallback() {
        super.connectedCallback()

        this.getElementsByTagName('form').item(0).addEventListener('submit', (e) => {
            e.preventDefault()

            console.log('username = ', $('#username').val())
            console.log('password = ', $('#password').val())

            
        })
    }
}

customElements.define('scab-login', ScabLogin)