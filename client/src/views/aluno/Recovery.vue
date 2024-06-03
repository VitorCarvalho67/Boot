<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <router-link to="/login">Login</router-link>
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
                            proprietário(a) da conta</p>
                        <div class="input-box" :class="{ 'focused': focus.nameFocused }">
                            <label for="name">Nome Cadastrado</label>
                            <input type="text" id="name" v-model="userAluno.name" required
                                @focus="focus.nameFocused = true" @blur="focus.nameFocused = false">
                        </div>
                        <div class="input-box" :class="{ 'focused': focus.emailFocused }">
                            <label for="email">Email Cadastrado</label>
                            <input type="email" id="email" v-model="userAluno.email" required
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
import { recoveryAluno } from '../../services/api/aluno';

export default {
    name: 'RecoveryAluno',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAluno: {
                name: '',
                email: ''
            },
            focus: {
                nameFocused: false,
                emailFocused: false
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await recoveryAluno({
                    name: this.userAluno.name,
                    email: this.userAluno.email
                });

                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('email-recovery-aluno', `${this.userAluno.email}`, { expires: 10 });
                    router.push({ name: 'ValidateRecovery' });

                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../scss/pages/aluno/_recovery.scss";
</style>