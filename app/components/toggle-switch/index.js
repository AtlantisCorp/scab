const path = require('path')
const BaseComponent = require('../base')

module.exports = class extends BaseComponent {
    constructor() {
        super(path.resolve(__dirname, 'index.html'), true)
    }
}

customElements.define('scab-toggle-switch', module.exports)