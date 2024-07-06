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
                        <router-link to="/login">Login</router-link>
                    </li>
                    <li>
                        <p>Cadastro</p>
                    </li>
                </ul>
            </nav>
            <form @submit.prevent="submitForm">
                <div class="content">
                    <h1>Registre-se</h1>
                    <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                    <div class="input-box" :class="{ 'focused': focused.nameFocused }">
                        <label for="name">Nome</label>

                        <input type="text" id="name" v-model="userAluno.name" @focus="focused.nameFocused = true"
                            @blur="focused.nameFocused = false" required>

                    </div>

                    <div class="input-box" :class="{ 'focused': focused.emailFocused }">
                        <label for="email">E-Mail</label>

                        <input type="email" id="email" v-model="userAluno.email" @input="checkEmail"
                            @focus="focused.emailFocused = true" @blur="focused.emailFocused = false" required>
                        <span class="alert" v-show="alerts.alertDominio">Seu email deve possuir domínio
                            etec.sp.gov.br</span>

                    </div>

                    <div class="input-box password" :class="{ 'focused': focused.passwordFocused }">
                        <div class="d1">
                            <label for="password">Senha</label>
                            <input :type="inputType" id="password" v-model="userAluno.password" @input="checkPassword"
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
                            <button type="button" @focus="focused.passwordFocused = true"
                                @blur="focused.passwordFocused = false" @click="togglePasswordVisibility"
                                :class="buttonClass"></button>
                        </div>
                    </div>

                    <div class="input-box password" :class="{ 'focused': focused.confirmFocused }">
                        <div class="d1">
                            <label for="confirmPassword">Confirmar senha</label>
                            <input :type="inputTypeConfirm" id="confirmPass" v-model="userAluno.confirmPassword"
                                @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                                @input="checkConfirmPassword" required>
                            <span v-show="alerts.alertPass" class="alert">
                                As senhas devem ser iguais
                            </span>
                        </div>
                        <div class="d2">
                            <button type="button" @focus="focused.confirmFocused = true"
                                @blur="focused.confirmFocused = false" @click="togglePasswordConfirmVisibility"
                                :class="buttonClassConfirm"></button>
                        </div>
                    </div>
                    <div class="button-box">
                        <button v-show="allRequirementsMet" type="submit">Registrar</button>
                        <button v-show="!allRequirementsMet" type="button">Registrar</button>
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
import { registerAluno } from '../../services/api/aluno';

export default {
    name: 'Register',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAluno: {
                name: '',
                email: '',
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
                alertPass: false
            },
            focused: {
                nameFocused: false,
                emailFocused: false,
                passwordFocused: false,
                confirmFocused: false
            },
            showPassword: false,
            showPasswordConfirm: false,
            imagem: logo,
            errorMessage: ''
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
            const email = this.userAluno.email;
            const password = this.userAluno.password;
            const passwordConfirm = this.userAluno.confirmPassword;

            return (
                (/[A-Z]/.test(password)) &&
                (/[a-z]/.test(password)) &&
                (/[0-9]/.test(password)) &&
                (/[*!@#$%&\./\\-_]/.test(password)) &&
                (password.length >= 8) &&
                (/@etec\.sp\.gov\.br$/.test(email)) &&
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
        checkEmail() {
            const email = this.userAluno.email;

            this.alerts.alertDominio = false;

            if (!(/@etec\.sp\.gov\.br$/.test(email))) {
                this.alerts.alertDominio = true;
            }
        },
        checkPassword() {
            const password = this.userAluno.password;

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
            const password = this.userAluno.password;
            const passwordConfirm = this.userAluno.confirmPassword;

            this.alerts.alertPass = false;

            if (!(password == passwordConfirm)) {
                this.alerts.alertPass = true;
            }
        },
        async submitForm() {
            try {
                const response = await registerAluno({
                    name: this.userAluno.name,
                    email: this.userAluno.email,
                    password: this.userAluno.password
                });

                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('email-registro-aluno', `${response.data.email}`, { expires: 10 });
                    router.push({ name: 'ValidateRegister' })
                } else {
                    this.errorMessage = "Ops.. Algo deu errado. 😕\n" + response.message;
                }
            } catch (error) {
                this.errorMessage = "Ops.. Algo deu errado. 😕";
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../scss/pages/aluno/_register.scss";
</style>