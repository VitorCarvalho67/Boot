import Cookies from 'js-cookie';

export const validateRecoveryMixin = {
    data(){
        return{
            alerts:{
                alertUppercase: false,
                alertLowercase: false,
                alertNumber: false,
                alertSpecial: false,
                alertLenght: false,
                alertPass: false
            },
            focused: {
                passwordFocused: false,
                confirmFocused: false,
                temporaryPasswordFocused: false
            },
            showPassword: false,
            showPasswordConfirm: false,
        }
    },
    computed: {
        allRequirements() {
            return (
                !this.alerts.alertUppercase &&
                !this.alerts.alertLowercase &&
                !this.alerts.alertNumber &&
                !this.alerts.alertSpecial &&
                !this.alerts.alertLenght &&
                !this.alerts.alertPass
            );
        },
        inputType() {
            return this.showPassword ? 'text' : 'password';
        },
        buttonClass() {
            return this.showPassword ? 'hide' : 'show';
        },
        inputTypeConfirm() {
            return this.showPasswordConfirm ? 'text' : 'password';
        },
        buttonClassConfirm() {
            return this.showPasswordConfirm ? 'hide' : 'show';
        },
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        togglePasswordConfirmVisibility() {
            this.showPasswordConfirm = !this.showPasswordConfirm;
        },    
         checkPasswords(password, passwordConfirm) {  
            this.alerts.alertUppercase = false;
            this.alerts.alertLowercase = false;
            this.alerts.alertNumber = false;
            this.alerts.alertSpecial = false;
            this.alerts.alertLenght = false;
    
            if (!(/[A-Z]/.test(password))) this.alerts.alertUppercase = true;
            else if (!(/[a-z]/.test(password))) this.alerts.alertLowercase = true;
            else if (!(/[0-9]/.test(password))) this.alerts.alertNumber = true;
            else if (!(/[*!@#$%&\./\\-_]/.test(password))) this.alerts.alertSpecial = true;
            else if (!(password.length >= 8)) this.alerts.alertLenght = true;
    
            this.alerts.alertPass = false;
    
            if (!(password == passwordConfirm)) {
                this.alerts.alertPass = true;
            }
        }
    }
}

export const EmpresaMixin = {
    methods: {
        cnpj(event) {
            if (event.inputType === 'deleteContentBackward') {
                const cursorPosition = event.target.selectionStart;
                const previousChar = event.target.value.charAt(cursorPosition - 1);
                if (previousChar === '.' || previousChar === '/' || previousChar === '-') {
                    event.preventDefault();
                    this.empresa.cnpjExibido = this.empresa.cnpjExibido.slice(0, cursorPosition - 1) + this.empresa.cnpjExibido.slice(cursorPosition);
                    return;
                }
                this.empresa.cnpj = this.empresa.cnpj.slice(0, cursorPosition - 1) + this.empresa.cnpj.slice(cursorPosition); 
            } else{
                const cnpj = event.target.value.replace(/\D/g, '');
        
                const cnpjFormatado = cnpj.slice(0, 14);
        
                let cnpjFormatadoExibicao = '';
                for (let i = 0; i < cnpjFormatado.length; i++) {
                    cnpjFormatadoExibicao += cnpjFormatado.charAt(i);
                    if (i === 1 || i === 4) {
                        cnpjFormatadoExibicao += '.';
                    } else if (i === 7) {
                        cnpjFormatadoExibicao += '/';
                    } else if (i === 11) {
                        cnpjFormatadoExibicao += '-';
                    }
                }
        
                event.target.value = cnpjFormatadoExibicao;
        
                this.empresa.cnpj = cnpjFormatado;
                this.empresa.cnpjExibido = cnpjFormatadoExibicao;
            }
            if (typeof this.cnpjValidate === 'function') {
                this.cnpjValidate();
            }
        }
    }
}

export const LoginMixins = {
    methods: {
        login(token, valor) {
            const tokens = ['token', 'token-professor', 'token-admin', 'token-funcionario', 'token-empresa'];
            const  entidades = ['aluno', 'professor', 'admin', 'funcionario', 'empresa'];
            
            Cookies.set(`${token}`, `${valor}`);
            Cookies.set("entidade", entidades[tokens.indexOf(token)]);
        
            tokens.forEach(tokenCookie => {
                if (tokenCookie !== token) {
                Cookies.remove(tokenCookie);
                }
            });
        }
    }
}