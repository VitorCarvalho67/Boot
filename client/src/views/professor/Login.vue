<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <p>Professor</p>
                        </li>
                        <li>
                            <router-link to="/login">É Aluno?</router-link>
                        </li>
                    </ul>
                </nav>
                <form @submit.prevent="submitForm">
                    <div class="content">
                        <h1>Bem vindo, Professor!</h1>
                        <p>Entre com suas credencias de acesso do professor</p>
                        <div class="input-box focused">
                            <div class="d1">
                                <label for="email">E-Mail</label>
                                <p>{{ professor.email }}</p>
                            </div>
                            <router-link to="/professor/init" class="editMail"></router-link>
                        </div>
                        <div class="input-box" :class="{ 'focused': passwordFocused }">
                            <div class="d1">
                                <label for="password">Senha</label>
                                <input :type="inputType" id="password" v-model="professor.password" required
                                    @focus="passwordFocused = true" @blur="passwordFocused = false">
                            </div>
                            <div class="d2">
                                <button type="button" @click="togglePasswordVisibility" :class="buttonClass"></button>
                            </div>
                        </div>
                        <p><router-link to="/professor/recovery">Esqueceu a senha?</router-link></p>
                    </div>
                    <div class="button-box">
                        <button type="submit">Entrar</button>
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
import router from '../../router/index.js';
import { loginProfessor } from '../../services/api/professor';
import { LoginMixins } from '../../util/mixins.js';

export default {
    name: 'LoginProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            professor: {
                email: '',
                password: ''
            },
            showPassword: false,
            emailFocused: false,
            passwordFocused: false,
        }
    },
    computed: {
        inputType() {
            return this.showPassword ? 'text' : 'password';
        },
        buttonClass() {
            return this.showPassword ? 'hide' : 'show';
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async submitForm() {
            try {
                const response = await loginProfessor({
                    email: this.professor.email,
                    password: this.professor.password
                });

                if (200 <= response.status && response.status < 300) {
                    this.login("token-professor", `${response.data.token}`);
                    router.push({ path: "/professor" });

                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },
        async getEmail() {
            if (Cookies.get('email-init-professor')) {
                this.professor.email = Cookies.get('email-init-professor');
            }
            else {
                router.push({ path: "/professor/init" });
            }
        }
    },
    async created() {
        await this.getEmail();
    },
    mixins: [LoginMixins]
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/professor/_login.scss";
</style>