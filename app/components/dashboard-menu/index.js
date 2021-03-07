const path = require('path')
const BaseComponent = require('../base')

module.exports = class extends BaseComponent {
    constructor() {
        super(path.resolve(__dirname, 'index.html'), true)

        this.shadowRoot
            .querySelectorAll('scab-dashboard-menu-item')
            .forEach(element => {
                element.addEventListener('click', this.onItemClicked.bind(this))
            })
    }

    onItemClicked(e) {
        this.shadowRoot.querySelector('[active=true]').active = false
        e.target.active = 'true'

        switch (e.target.id) {
            case 'menu-dashboard':
                this.dispatchEvent(new CustomEvent('menuItemClicked', { 
                    detail: {
                        id: e.target.id,
                        component: 'scab-dashboard'
                    }
                 }))
                 break
            case 'menu-patients':
                this.dispatchEvent(new CustomEvent('menuItemClicked', {
                    detail: {
                        id: e.target.id,
                        component: 'scab-patients-list'
                    }
                }))
                break
        }
    }
}

customElements.define('scab-dashboard-menu', module.exports)