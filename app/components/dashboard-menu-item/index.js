const path = require('path')
const BaseComponent = require('../base')

module.exports = class extends BaseComponent {
    constructor() {
        super(path.resolve(__dirname, 'index.html'), true)

        this.liElement = this.shadowRoot.getElementById('item-li')
        this.iconElement = this.shadowRoot.getElementById('icon')
        this.titleElement = this.shadowRoot.getElementById('title')

        if (!this.liElement || !this.iconElement || !this.titleElement)
            throw new Error('Error while constructing scab-dashboard-menu-item.')
    }

    connectedCallback() {
        super.connectedCallback()
    }

    static get observedAttributes() {
        return ['icon', 'title', 'active']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'icon':
                this.iconElement.classList.remove(oldValue)
                this.iconElement.classList.add(newValue)
                break 
            case 'title':
                this.titleElement.textContent = newValue
                break 
            case 'active':
                if (newValue === 'true') 
                    this.liElement.classList.add('active')
                else 
                    this.liElement.classList.remove('active')
                break 
        }
    }

    get icon() {
        return this.getAttribute('icon')
    }

    set icon(value) {
        this.setAttribute('icon', value)
    }

    get title() {
        return this.getAttribute('title')
    }

    set title(value) {
        this.setAttribute('title', value)
    }

    get active() {
        return this.getAttribute('active')
    }

    set active(value) {
        this.setAttribute('active', value)
    }
}

customElements.define('scab-dashboard-menu-item', module.exports)