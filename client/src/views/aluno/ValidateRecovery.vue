<template>
    <Header />
    <main v-if="!success">
        <div class="box">
            <nav>
                <ul>
                    <li>
                        <router-link to="/init">Login</router-link>
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
                        <p>{{ this.infoAluno.email }}</p>
                    </div>
                    <div class="d2">
                        <router-link to="/init" class="editMail"></router-link>
                    </div>
                </div>

                <div class="input-box" :class="{ 'focused': focused.temporaryPasswordFocused }">
                    <label>Senha Temporária enviada em seu e-mail</label>
                    <input id="temporaryPassword" v-model="infoAluno.recoveryPass"
                        @focus="focused.temporaryPasswordFocused = true"
                        @blur="focused.temporaryPasswordFocused = false" required>
                </div>

                <div class="input-box password" :class="{ 'focused': focused.passwordFocused }">
                    <div class="d1">
                        <label for="newPassword">Nova Senha</label>
                        <input :type="inputType" id="newPassword" v-model="infoAluno.newPass"
                            @input="checkPasswords(infoAluno.newPass, infoAluno.confirmNewPass)"
                            @focus="focused.passwordFocused = true" @blur="focused.passwordFocused = false" required>
                        <span class="alert" v-show="this.alerts.alertUppercase">
                            A senha deve conter ao menos uma letra maiúscula(A-Z)
                        </span>
                        <span class="alert" v-show="this.alerts.alertLowercase">
                            A senha deve conter ao menos uma letra minúscula(a-z)
                        </span>
                        <span class="alert" v-show="this.alerts.alertNumber">
                            A senha deve conter ao menos um número (0-9)
                        </span>
                        <span class="alert" v-show="this.alerts.alertSpecial">
                            A senha deve conter ao menos um caractere especial (*, !, @, #, $, %, &, /, -, .)
                        </span>
                        <span class="alert" v-show="this.alerts.alertLenght">
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
                        <input :type="inputTypeConfirm" id="confirmPassword" v-model="infoAluno.confirmNewPass"
                            @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                            @input="checkPasswords(infoAluno.newPass, infoAluno.confirmNewPass)" required>
                        <span class="alert" v-show="this.alerts.alertPass"> As senhas devem ser iguais</span>
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
import { validateRecovery } from '../../services/api/aluno';
import { validateRecoveryMixin } from '../../util/mixins.js';

export default {
    name: 'ValidateRecovery',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            infoAluno: {
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
                description: 'Realize seu login e tenha acesso a plataforma como aluno.',
                routerLink: '/login',
                buttonName: 'login'
            }
        }
    },
    methods: {
        async submitForm() {
            if (this.infoAluno.newPass === this.infoAluno.confirmNewPass) {
                try {
                    const response = await validateRecovery({
                        email: this.infoAluno.email,
                        recoveryPassword: this.infoAluno.recoveryPass,
                        newPass: this.infoAluno.newPass
                    });

                    if (200 <= response.status && response.status < 300) {
                        this.success = true;
                    } else {
                        this.errorMessage = "Ops.. Algo deu errado. 😕\n" + response.message;
                    }
                } catch (error) {
                    this.errorMessage = "Ops.. Algo deu errado. 😕";
                }
            } else {
                this.errorMessage = "As senhas devem ser iguais!";
            }
        }
    },
    mixins: [validateRecoveryMixin],
    created() {
        this.infoAluno.email = Cookies.get('email-recovery-aluno');
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/aluno/_validateRecovery.scss";
</style>