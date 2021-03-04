const fs = require('fs')

module.exports = class extends HTMLElement {
    constructor(template, isShadow = false) {
        super()
        
        this.template = template
        this.isShadow = isShadow

        const file = fs.readFileSync(template)
        const doc = (new DOMParser()).parseFromString(file, 'text/html')
        const element = doc.getElementsByTagName('template').item(0)
        
        if (!element) {
            throw new Error('scab-base: no template tag found in template file.');
        }

        this.templateContent = element.content
    }

    connectedCallback() {
        if (this.isShadow) {
            this.attachShadow({ mode: 'open' })
                .appendChild(this.templateContent.cloneNode(true))
        } else {
            this.appendChild(this.templateContent.cloneNode(true))
        }
    }
}