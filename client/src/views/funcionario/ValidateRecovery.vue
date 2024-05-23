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
                        <p>Recuperação de senha</p>
                    </li>
                </ul>
            </nav>
            <form @submit.prevent="submitForm">
                <h1>Termine sua recuperação</h1>
                <p>É necessário informar a senha temporária de recuperação enviada no email e criar um senha nova para logar na plataforma.</p>

                <div class="input-box email">
                    <div class="d1">
                        <p>{{ this.infoFuncionario.email }}</p>
                    </div>
                    <div class="d2">
                        <router-link to="/funcionario/init" class="editMail"></router-link>
                    </div>
                </div>

                <div class="input-box" :class="{ 'focused': focused.temporaryPasswordFocused }">
                    <label>Senha Temporária enviada em seu e-mail</label>
                    <input id="temporaryPassword" v-model="infoFuncionario.recoveryPass"
                        @focus="focused.temporaryPasswordFocused = true"
                        @blur="focused.temporaryPasswordFocused = false" required>
                </div>

                <div class="input-box password" :class="{ 'focused': focused.passwordFocused }">
                    <div class="d1">
                        <label for="newPassword">Nova Senha</label>
                        <input :type="inputType" id="newPassword" v-model="infoFuncionario.newPass" @input="checkPassword"
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
                        <input :type="inputTypeConfirm" id="confirmPassword" v-model="infoFuncionario.confirmNewPass"
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
                    <button v-show="allRequirements" type="submit">Recuperar</button>
                    <button v-show="!allRequirements" type="button">Recuperar</button>
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
import router from '../../router/index.js';
import { validateRecoveryMixin } from '../../util/mixins.js'
import { validateRecovery } from '../../services/api/funcionario';

export default {
    name: 'ValidateRecoveryFuncionario',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            infoFuncionario: {
                email: '',
                recoveryPass: '',
                newPass: '',
                confirmNewPass: ''
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await validateRecovery({
                    email: this.infoFuncionario.email,
                    recoveryPass: this.infoFuncionario.recoveryPass,
                    newPass: this.infoFuncionario.newPass
                });

                if (200 <= response.status && response.status < 300) {
                    router.push({ name: 'LoginFuncionario' });

                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [validateRecoveryMixin],
    created(){
        this.infoFuncionario.email = Cookies.get('email-recovery-funcionario');
    }
}
</script>

<style lang="scss" scoped>
    @import "../../scss/views/funcionario/ValidateRecovery.scss";
</style>