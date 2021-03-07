const path = require('path')
const BaseComponent = require('../base')
const UserService = require('../../services/user')

class ScabRegisterComponent extends BaseComponent {
    constructor() {
        super(path.resolve(__dirname, 'register.html'), true)
        this.users = new UserService()
    }

    connectedCallback() {
        super.connectedCallback()

        this.form = {}
        this.form.username = this.shadowRoot.getElementById('username')
        this.form.password = this.shadowRoot.getElementById('password')
        this.form.repassword = this.shadowRoot.getElementById('repassword')

        this.feedback = {}
        this.feedback.username = this.shadowRoot.getElementById('username-feedback')
        this.feedback.password = this.shadowRoot.getElementById('password-feedback')
        this.feedback.repassword = this.shadowRoot.getElementById('repassword-feedback')

        this.alerts = {}
        this.alerts.error = this.shadowRoot.querySelector('scab-alert-error')
        this.alerts.success = this.shadowRoot.querySelector('scab-alert-success')

        this.buttons = {}
        this.buttons.submit = this.shadowRoot.getElementById('button-submit')
        this.buttons.cancel = this.shadowRoot.getElementById('button-cancel')

        this.buttons.cancel.addEventListener('click', (e) => {
            e.preventDefault()

            const loginComponent = document.createElement('scab-login')
            this.parentElement.appendChild(loginComponent)
            this.parentElement.removeChild(this)
        })
        
        this.shadowRoot
            .getElementById('register-form')
            .addEventListener('submit', (e) => {
                e.preventDefault()

                this.form.username.classList.remove('is-valid', 'is-invalid')
                this.form.password.classList.remove('is-valid', 'is-invalid')
                this.form.repassword.classList.remove('is-valid', 'is-invalid')
                this.feedback.username.classList.remove('invalid-feedback', 'valid-feedback')
                this.feedback.username.classList.add('d-none')
                this.feedback.password.classList.remove('invalid-feedback', 'valid-feedback')
                this.feedback.password.classList.add('d-none')
                this.feedback.repassword.classList.remove('invalid-feedback', 'valid-feedback')
                this.feedback.repassword.classList.add('d-none')

                const username = this.form.username.value
                const password = this.form.password.value
                const repassword = this.form.repassword.value
                let validated = true 

                if (!username || !username.length) {
                    this.form.username.classList.add('is-invalid')
                    this.feedback.username.classList.add('invalid-feedback')
                    this.feedback.username.classList.remove('d-none')
                    this.feedback.username.textContent = 'Un nom d\'utilisateur est requis.'
                    validated = false
                }

                if (!password || !password.length) {
                    this.form.password.classList.add('is-invalid')
                    this.feedback.password.classList.add('invalid-feedback')
                    this.feedback.password.classList.remove('d-none')
                    this.feedback.password.textContent = 'Un mot de passe est requis.'
                    validated = false
                }

                if (!validated)
                    return 
                
                if (password !== repassword) {
                    this.form.repassword.classList.add('is-invalid')
                    this.feedback.repassword.classList.add('invalid-feedback')
                    this.feedback.repassword.classList.remove('d-none')
                    this.feedback.repassword.textContent = 'Le mot de passe est différent de celui écrit au dessus.'
                    validated = false
                }

                if (!validated) 
                    return 

                this.users.register(username, password)
                .then(async response => {
                    if (response.ok) {
                        this.alerts.success.content = 'Création du compte avec succès ! Redirection en cours.'
                        
                        window.setTimeout(() => {
                            const loginComponent = document.createElement('scab-login')
                            this.parentElement.appendChild(loginComponent)
                            this.parentElement.removeChild(this)
                        }, 500)
                    }

                    else
                        throw new Error(await response.text())
                })
                .catch(reason => {
                    this.alerts.error.content = reason 
                })
            })
    }
}

customElements.define('scab-register', ScabRegisterComponent)