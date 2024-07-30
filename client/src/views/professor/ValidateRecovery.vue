<template>
    <Header />
    <main v-if="!success">
        <div class="box">
            <nav>
                <ul>
                    <li>
                        <router-link to="/professor/init">Login</router-link>
                    </li>
                    <li>
                        <p>Recuperação de senha</p>
                    </li>
                </ul>
            </nav>
            <form @submit.prevent="submitForm">
                <h1>Termine sua recuperação</h1>
                <p>É necessário informar a senha temporária de recuperação enviada no email e criar um senha nova para
                    logar na plataforma.</p>

                <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                <div class="input-box email">
                    <div class="d1">
                        <p>{{ this.infoProfessor.email }}</p>
                    </div>
                    <div class="d2">
                        <router-link to="/professor/init" class="editMail"></router-link>
                    </div>
                </div>

                <div class="input-box" :class="{ 'focused': focused.temporaryPasswordFocused }">
                    <label>Senha Temporária enviada em seu e-mail</label>
                    <input id="temporaryPassword" v-model="infoProfessor.recoveryPass"
                        @focus="focused.temporaryPasswordFocused = true"
                        @blur="focused.temporaryPasswordFocused = false" required>
                </div>

                <div class="input-box password" :class="{ 'focused': focused.passwordFocused }">
                    <div class="d1">
                        <label for="newPassword">Nova Senha</label>
                        <input :type="inputType" id="newPassword" v-model="infoProfessor.newPass"
                            @input="checkPasswords(infoProfessor.newPass, infoProfessor.confirmNewPass)"
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
                        <input :type="inputTypeConfirm" id="confirmPassword" v-model="infoProfessor.confirmNewPass"
                            @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                            @input="checkPasswords(infoProfessor.newPass, infoProfessor.confirmNewPass)" required>
                        <span class="alert" v-show="alerts.alertPass"> As senhas devem ser iguais</span>
                    </div>
                    <div class="d2">
                        <button type="button" @click="togglePasswordConfirmVisibility"
                            @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                            :class="buttonClassConfirm"></button>
                    </div>
                </div>
                <div class="button-box">
                    <button v-show="allRequirements" type="submit">Recuperar</button>
                    <button v-show="!allRequirements" type="button">Recuperar</button>
                </div>
            </form>
        </div>
    </main>
    <main v-else>
        <Sucess :dataSucess="dataSucess" />
    </main>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Sucess from '../../components/Sucess.vue';

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { validateRecoveryMixin } from '../../util/mixins.js';
import { validateRecovery } from '../../services/api/professor';

export default {
    name: 'ValidateRecoveryProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            infoProfessor: {
                email: '',
                recoveryPass: '',
                newPass: '',
                confirmNewPass: ''
            },
            errorMessage: '',
            success: false,
            errorMessage: '',
            dataSucess: {
                title: 'Senha recuperada com sucesso',
                description: 'Realize seu login e tenha acesso a plataforma como professor.',
                routerLink: '/professor/login',
                buttonName: 'login'
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await validateRecovery({
                    email: this.infoProfessor.email,
                    recoveryPass: this.infoProfessor.recoveryPass,
                    newPass: this.infoProfessor.newPass
                });

                if (200 <= response.status && response.status < 300) {
                    this.success = true;
                } else {
                    this.errorMessage = "Ops.. Algo deu errado. 😕\n" + response.message;
                }
            } catch (error) {
                this.errorMessage = "Ops.. Algo deu errado. 😕";
            }
        }
    },
    mixins: [validateRecoveryMixin],
    created() {
        this.infoProfessor.email = Cookies.get('email-recovery-professor');
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/professor/_validateRecovery.scss";
</style>