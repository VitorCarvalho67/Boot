<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <router-link to="/funcionario/login">Login</router-link>
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
                            proprietário(a) da conta de funcionário</p>
                        <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                        <div class="input-box" :class="{ 'focused': focus.nameFocused }">
                            <label for="name">Nome:</label>
                            <input type="text" id="name" v-model="userFuncionario.name" required
                                @focus="focus.nameFocused = true" @blur="focus.nameFocused = false">
                        </div>
                        <div class="input-box" :class="{ 'focused': focus.emailFocused }">
                            <label for="email">Email:</label>
                            <input type="email" id="email" v-model="userFuncionario.email" required
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
import { recoveryFuncionario } from '../../services/api/funcionario';

export default {
    name: 'RecoveryFuncionario',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userFuncionario: {
                name: '',
                email: ''
            },
            focus: {
                nameFocused: false,
                emailFocused: false
            },
            errorMessage: ''
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await recoveryFuncionario({
                    name: this.userFuncionario.name,
                    email: this.userFuncionario.email
                });

                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('email-recovery-funcionario', `${this.userFuncionario.email}`, { expires: 10 });
                    router.push({ name: 'ValidateRecoveryFuncionario' });
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
@import "../../scss/pages/funcionario/_recovery.scss";
</style>