<template>
    <Header />
    <main>
        <div class="box" id="box1">
            <form @submit.prevent="submitForm">
                <h1>Entre como professor</h1>
                <p class="p">Para acessar sua área exclusiva de professor na plataforma, por favor, insira seu e-mail
                    cadastrado e siga para a próxima página</p>
                <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                <div class="input-box" :class="{ 'focused': emailFocused }">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model="professor.email" required @focus="emailFocused = true"
                        @blur="emailFocused = false">
                </div>
                <p><router-link to="/recovery">Acesse como</router-link></p>
                <div class="button-box">
                    <button type="submit">Continuar</button>
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
import { initProfessor } from '../../services/api/professor';

export default {
    name: 'InitProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            professor: {
                email: ''
            },
            emailFocused: false,
            errorMessage: ''
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await initProfessor(this.professor.email);

                if (200 <= response.status && response.status < 300) {
                    if (Cookies.get('email-init-professor')) {
                        Cookies.remove('email-init-professor');
                    }

                    Cookies.set('email-init-professor', `${this.professor.email}`, { expires: 10 });

                    if (!response.data.professor.validated) {
                        router.push({ name: 'ValidateProfessor' });
                    } else {
                        router.push({ name: 'LoginProfessor' });
                    }
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
@import "../../scss/pages/professor/_init.scss";
</style>