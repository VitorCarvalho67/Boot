<template>
    <Header />
    <main>
        <div class="box">
            <nav>
                <ul>
                    <li>
                        <router-link to="/funcionario/init">Login</router-link>
                    </li>
                    <li>
                        <p>Validação</p>
                    </li>
                </ul>
            </nav>
            <form @submit.prevent="submitForm">
                <h1>Valide seu cadastro</h1>
                <p>É necessário informar a senha temporária enviada no email e criar um senha nova para logar na plataforma.</p>

                <div class="input-box email">
                    <div class="d1">
                        <p>{{ this.funcionario.email }}</p>
                    </div>
                    <div class="d2">
                        <router-link to="/funcionario/init" class="editMail"></router-link>
                    </div>
                </div>

                <div class="input-box" :class="{ 'focused': focused.temporaryPasswordFocused }">
                    <label>Senha Temporária enviada em seu e-mail</label>
                    <input id="temporaryPassword" v-model="funcionario.temporaryPassword"
                        @focus="focused.temporaryPasswordFocused = true"
                        @blur="focused.temporaryPasswordFocused = false" required>
                </div>
                
                <div class="input-box password" :class="{ 'focused': focused.passwordFocused }">
                    <div class="d1">
                        <label for="newPassword">Nova Senha</label>
                        <input :type="inputType" id="newPassword" v-model="funcionario.newPassword" @input="checkPassword"
                            @focus="focused.passwordFocused = true" @blur="focused.passwordFocused = false" required>
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
                        <button type="button" @click="togglePasswordVisibility" :class="buttonClass"
                            @focus="focused.passwordFocused = true" @blur="focused.passwordFocused = false"></button>
                    </div>
                </div>

                <div class="input-box password" :class="{ 'focused': focused.confirmFocused }">
                    <div class="d1">
                        <label for="confirmPassword">Confirmar Senha</label>
                        <input :type="inputTypeConfirm" id="confirmPassword" v-model="funcionario.confirmPassword"
                            @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                            @input="checkConfirmPassword" required>
                        <span class="alert" v-show="alerts.alertPass"> As senhas devem ser iguais</span>
                    </div>
                    <div class="d2">
                        <button type="button" @click="togglePasswordConfirmVisibility"
                            @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                            :class="buttonClassConfirm"></button>
                    </div>
                </div>
                <div class="button-box">
                    <button v-show="allRequirements" type="submit">Validar</button>
                    <button v-show="!allRequirements" type="button">Validar</button>
                </div>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { validateFuncionario } from '../../services/api/funcionario';

export default {
    name: 'ValidateFuncionario',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            funcionario: {
                email: '',
                temporaryPassword: '',
                newPassword: ''
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
        checkPassword() {
            const password = this.funcionario.newPassword;

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
            const password = this.funcionario.newPassword;
            const passwordConfirm = this.funcionario.confirmPassword;

            this.alerts.alertPass = false;

            if (!(password == passwordConfirm)) {
                this.alerts.alertPass = true;
            }
        },
        async submitForm() {
            try {
                const response = await validateFuncionario({
                    email: this.funcionario.email,
                    temporaryPassword: this.funcionario.temporaryPassword,
                    newPassword: this.funcionario.newPassword
                });

                if (200 <= response.status && response.status < 300) {
                    Cookies.remove('email-funcionario');
                    
                    router.push({ path: '/funcionario/login' });
                    
                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }

        },

        async getEmail(){
            if(Cookies.get('email-init-funcionario')){
                this.funcionario.email = Cookies.get('email-init-funcionario');
            }
            else{
                router.push({path: "/funcionario/init"});
            }
        }
    },
    async created(){
        await this.getEmail();
    }
}
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/funcionario/_validate.scss";
</style>