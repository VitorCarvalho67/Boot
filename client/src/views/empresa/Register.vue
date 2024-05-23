<template>
    <Header />
    <main>
        <div class="box" id="box1">
            <img :src="imagem" alt="Img">
        </div>
        <div class="box" id="box2">
            <nav>
                <ul>
                    <li>
                        <router-link to="/empresa/login">Login</router-link>
                    </li>
                    <li>
                        <p>Cadastro</p>
                    </li>
                </ul>
            </nav>
            <form @submit.prevent="submitForm">
                <div class="content">
                    <h1>Registre-se</h1>
                    <div class="input-box" :class="{ 'focused': focused.nameFocused }">
                        <label for="name">Nome</label>

                        <input type="text" id="name" v-model="empresa.name" @focus="focused.nameFocused = true"
                            @blur="focused.nameFocused = false" required>
                    </div>
                    
                    <div class="input-box" :class="{ 'focused': focused.emailFocused }">
                        <label for="email">E-Mail</label>

                        <input type="email" id="email" v-model="empresa.email"
                            @focus="focused.emailFocused = true" @blur="focused.emailFocused = false" required>
                    </div>

                    <div class="input-box" :class="{ 'focused': focused.cnpjFocused }">
                        <label for="email">CNPJ</label>

                        <input type="text" id="email" v-model="empresa.cnpjExibido" @input="cnpj"
                            @focus="focused.cnpjFocused = true" @blur="focused.cnpjFocused = false" required>
                    
                            <span class="alert" v-show="alerts.alertCNPJ">
                                Insira um CNPJ válido
                            </span>
                    </div>

                    <div class="input-box password" :class="{ 'focused': focused.passwordFocused }">
                        <div class="d1">
                            <label for="password">Senha</label>
                            <input :type="inputType" id="password" v-model="empresa.password" @input="checkPassword"
                                @focus="focused.passwordFocused = true" @blur="focused.passwordFocused = false"
                                required>
                            <span class="alert" v-show="alerts.alertUppercase">
                                A senha deve conter ao menos uma letra maiúscula(A-Z)
                            </span>
                            <span class="alert" v-show="alerts.alertLowercase">
                                A senha deve conter ao menos uma letra minúscula(a-z)
                            </span>
                            <span class="alert" v-show="alerts.alertNumber">
                                A senha deve conter ao menos um número (0-9)
                            </span>
                            <span class="alert" v-show="alerts.alertSpecial">
                                A senha deve conter ao menos um caractere especial (*, !, @, #, $, %, &, /, -, .)
                            </span>
                            <span class="alert" v-show="alerts.alertLenght">
                                A senha deve conter ao menos 8 caracteres
                            </span>
                        </div>
                        <div class="d2">
                            <button type="button" @focus="focused.passwordFocused = true" @blur="focused.passwordFocused = false"
                                @click="togglePasswordVisibility" :class="buttonClass"></button>
                        </div>
                    </div>

                    <div class="input-box password" :class="{ 'focused': focused.confirmFocused }">
                        <div class="d1">
                            <label for="confirmPassword">Confirmar senha</label>
                            <input :type="inputTypeConfirm" id="confirmPass" v-model="empresa.confirmPassword"
                                @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                                @input="checkConfirmPassword" required>
                            <span v-show="alerts.alertPass" class="alert">
                                As senhas devem ser iguais
                            </span>
                        </div>
                        <div class="d2">
                            <button type="button" @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                                @click="togglePasswordConfirmVisibility" :class="buttonClassConfirm"></button>
                        </div>
                    </div>
                    <div class="button-box">
                        <button v-show="allRequirementsMet" type="submit">Registrar</button>
                        <button v-show="!allRequirementsMet" type="button" @click="cnpjValidate">Registrar</button>
                    </div>
                </div>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>

import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import logo from '../../assets/imgs/imageMain.png';

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { registerEmpresa } from '../../services/api/empresa';
import { EmpresaMixin } from '../../util/mixins';

export default {
    name: 'Register',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            empresa: {
                name: '',
                email: '',
                cnpj: '',
                cnpjExibido: '',
                password: '',
                confirmPassword: ''
            },
            alerts: {
                alertUppercase: false,
                alertLowercase: false,
                alertNumber: false,
                alertSpecial: false,
                alertLenght: false,
                alertDominio: false,
                alertPass: false,
                alertCNPJ: false
            },
            focused: {
                nameFocused: false,
                emailFocused: false,
                cnpjFocused: false,
                passwordFocused: false,
                confirmFocused: false
            },
            showPassword: false,
            showPasswordConfirm: false,
            imagem: logo
        }
    },
    computed: {
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
        allRequirementsMet() {
            const email = this.empresa.email;
            const password = this.empresa.password;
            const passwordConfirm = this.empresa.confirmPassword;

            return (
                (/[A-Z]/.test(password)) &&
                (/[a-z]/.test(password)) &&
                (/[0-9]/.test(password)) &&
                (/[*!@#$%&\./\\-_]/.test(password)) &&
                (password.length >= 8) &&
                (this.empresa.cnpj.length == 14) &&
                (password == passwordConfirm)
            );
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        togglePasswordConfirmVisibility() {
            this.showPasswordConfirm = !this.showPasswordConfirm;
        },
        checkPassword() {
            const password = this.empresa.password;

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

            this.checkConfirmPassword();
        },
        checkConfirmPassword() {
            const password = this.empresa.password;
            const passwordConfirm = this.empresa.confirmPassword;

            this.alerts.alertPass = false;

            if (!(password == passwordConfirm)) {
                this.alerts.alertPass = true;
            }
        },
        cnpjValidate(){
            this.alerts.alertCNPJ = false;

            if (this.empresa.cnpj.length != 14 && this.empresa.cnpjExibido.length > 0){
                this.alerts.alertCNPJ = true;
            }
        },
        async submitForm() {
            try {
                const response = await registerEmpresa({
                    name: this.empresa.name,
                    email: this.empresa.email,
                    cnpj: this.empresa.cnpj,
                    password: this.empresa.password
                });

                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('cnpj-registro-empresa', `${response.data.cnpj}`, { expires: 10 });
                    router.push({ name: 'ValidateEmpresa' })

                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [EmpresaMixin]
}
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/empresa/_register.scss";
</style>