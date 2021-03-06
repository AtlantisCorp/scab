const path = require('path')
const BaseComponent = require('../base')

class ScabRegisterComponent extends BaseComponent {
    constructor() {
        super(path.resolve(__dirname, 'register.html'))
    }
}

customElements.define('scab-register', ScabRegisterComponent)