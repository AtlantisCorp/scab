
const fs = require('fs')
const path = require('path')

const Base = require('../base')

class ScabLogin extends Base {
    constructor() {
        super()
    }

    connectedCallback() {
        const template = fs.readFileSync(path.resolve(__dirname, 'login.html'))
        const doc = (new DOMParser()).parseFromString(template, 'text/html')
        const element = doc.getElementsByTagName('template').item(0)

        if (!element) {
            throw new Error('No template found for element "ScabLogin"')
        }

        const content = element.content
        this.appendChild(content.cloneNode(true))

        this.getElementsByTagName('form').item(0).addEventListener('submit', (e) => {
            e.preventDefault()

            console.log('username = ', $('#username').val())
            console.log('password = ', $('#password').val())
        })
    }


}

customElements.define('scab-login', ScabLogin)