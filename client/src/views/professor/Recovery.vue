<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <router-link to="/professor/login">Login</router-link>
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
                            proprietário(a) da conta de professor</p>
                        <div class="input-box" :class="{ 'focused': focus.nameFocused }">
                            <label for="name">Nome do professor</label>
                            <input type="text" id="name" v-model="userProfessor.name" required
                                @focus="focus.nameFocused = true" @blur="focus.nameFocused = false">
                        </div>
                        <div class="input-box" :class="{ 'focused': focus.emailFocused }">
                            <label for="email">Email do professor</label>
                            <input type="email" id="email" v-model="userProfessor.email" required
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
import { recoveryProfessor } from '../../services/api/professor';

export default {
    name: 'RecoveryProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userProfessor: {
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
                const response = await recoveryProfessor({
                    name: this.userProfessor.name,
                    email: this.userProfessor.email
                });

                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('email-recovery-professor', `${this.userProfessor.email}`, { expires: 10 });
                    router.push({ name: 'ValidateRecoveryProfessor' });

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
@import "../../scss/pages/professor/_recovery.scss";
</style>