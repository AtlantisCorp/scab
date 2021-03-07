const path = require('path')
const BaseComponent = require('../base')

module.exports = class extends BaseComponent {
    constructor() {
        super(path.resolve(__dirname, 'index.html'), true)

        this.shadowRoot
            .querySelector('scab-dashboard-menu')
            .addEventListener('menuItemClicked', this.onMenuItemClicked.bind(this))

        this.shadowRoot
            .querySelector('scab-dashboard-menu')
            .dispatchEvent(new CustomEvent('menuItemClicked', {
                detail: { id: "null", component: "scab-dashboard" }
            }))
    }

    onMenuItemClicked(e) {
        const id = e.detail.id 
        let component = e.detail.component 
        console.log('Loading Component: ' + component)

        if (!customElements.get(component)) {
            console.error('Component ' + component + ' is not defined. Fallback to an error component...')
            component = 'scab-component-load-error'
        }

        const element = document.createElement(component)

        if (!element) 
            throw new Error('Cannot load component ' + component)

        const content = this.shadowRoot.getElementById('content')
        content.innerHTML = ''
        content.append(element)

        const topbar = this.shadowRoot.getElementById('topbar')
        topbar.title = element.title

        if (element.processTopBar)
            element.processTopBar(topbar)
    }
}

customElements.define('scab-dashboard-cols', module.exports)