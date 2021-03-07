const path = require('path')
const BaseComponent = require('../base')

module.exports = class extends BaseComponent {
    constructor() {
        super(path.resolve(__dirname, 'index.html'), true)
    }

    connectedCallback() {
        super.connectedCallback()

        if (!this.hasAttribute('title')) 
            this.setAttribute('title', 'Tableau de bord')
    }

    processTopBar(topBar) {
        console.log('Processed TopBar.')
    }
}

customElements.define('scab-dashboard', module.exports)