const BaseComponent = require('../base')
const path = require('path')

class AlertErrorComponent extends BaseComponent {
    constructor() {
        super(path.resolve(__dirname, 'alert-error.html'))
    }

    connectedCallback() {
        super.connectedCallback()

        this.contentElement = this.querySelector('div')
        this.displayOriginalValue = this.style.display
        this.style.display = 'none'

        if (!this.hasAttribute('content')) {
            this.setAttribute('content', 'no content')
        }

        if (!this.hasAttribute('timeout')) {
            this.setAttribute('timeout', 2000)
        }
    }

    static get observedAttributes() {
        return ['content']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.contentElement.innerHTML = newValue
        this.style.display = this.displayOriginalValue

        setTimeout(() => { this.style.display = 'none' }, this.timeout)
    }

    get content() {
        return this.getAttribute('content')
    }

    set content(newvalue) {
        this.setAttribute('content', newvalue)
    }

    get timeout() {
        return this.getAttribute('timeout')
    }

    set timeout(newvalue) {
        this.setAttribute('timeout', newvalue)
    }
}

customElements.define('scab-alert-error', AlertErrorComponent)