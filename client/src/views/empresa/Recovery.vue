<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <router-link to="/empresa/login">Login</router-link>
                        </li>
                        <li>
                            <p>Recuperação de senha</p>
                        </li>
                    </ul>
                </nav>
                <form @submit.prevent="submitForm">
                    <div class="content">
                        <h1>Recupere sua senha</h1>
                        <p>Enviaremos uma senha temporária no email cadastrado para garantir que você é o(a)
                            proprietário(a) da conta empresarial</p>
                        <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                        <div class="input-box" :class="{ 'focused': focus.cnpjFocused }">
                            <label for="cnpj">CNPJ:</label>
                            <input type="text" id="cnpj" v-model="empresa.cnpjExibido" required
                                @focus="focus.cnpjFocused = true" @blur="focus.cnpjFocused = false" @input="cnpj">
                        </div>
                        <div class="input-box" :class="{ 'focused': focus.emailFocused }">
                            <label for="email">Email:</label>
                            <input type="email" id="email" v-model="empresa.email" required
                                @focus="focus.emailFocused = true" @blur="focus.emailFocused = false">
                        </div>
                        <p><router-link to="/home">Outras opções</router-link></p>
                        <div class="button-box">
                            <button type="submit">Continuar</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { EmpresaMixin } from '../../util/mixins'
import { recoveryEmpresa } from '../../services/api/empresa';

export default {
    name: 'RecoveryEmpresa',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            empresa: {
                cnpj: '',
                email: '',
                cnpjExibido: ''
            },
            focus: {
                cnpjFocused: false,
                emailFocused: false
            },
            errorMessage: ''
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await recoveryEmpresa({
                    cnpj: this.empresa.cnpj,
                    email: this.empresa.email
                });

                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('email-recovery-empresa', `${this.empresa.email}`, { expires: 50 });
                    Cookies.set('cnpj-recovery-empresa', `${this.empresa.cnpj}`, { expires: 50 });
                    router.push({ name: 'ValidateRecoveryEmpresa' });
                } else {
                    this.errorMessage = "Ops.. Algo deu errado. 😕\n" + response.message;
                }
            } catch (error) {
                this.errorMessage = "Ops.. Algo deu errado. 😕";
            }
        }
    },
    mixins: [EmpresaMixin]
}
</script>


<style lang="scss" scoped>
@import "../../scss/pages/empresa/_recovery.scss";
</style>