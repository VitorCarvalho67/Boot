<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <p>Login</p>
                        </li>
                        <li>
                            <router-link to="/register">Cadastro</router-link>
                        </li>
                    </ul>
                </nav>
                <form @submit.prevent="submitForm">
                    <div class="content">
                        <h1>Bem vindo!</h1>
                        <p>Entre com suas credencias de acesso do aluno</p>
                        <div class="input-box" :class="{ 'focused': emailFocused }">
                            <label for="email">E-Mail</label>
                            <input type="email" id="email" v-model="userAluno.email" required
                                @focus="emailFocused = true" @blur="emailFocused = false">
                        </div>
                        <div class="input-box" :class="{ 'focused': passwordFocused }">
                            <div class="d1">
                                <label for="password">Senha</label>
                                <input :type="inputType" id="password" v-model="userAluno.password" required
                                    @focus="passwordFocused = true" @blur="passwordFocused = false">
                            </div>
                            <div class="d2">
                                <button type="button" @focus="passwordFocused = true" @blur="passwordFocused = false"
                                    @click="togglePasswordVisibility" :class="buttonClass"></button>
                            </div>
                        </div>
                    </div>
                    <p><router-link to="/recovery">Esqueceu a senha?</router-link></p>
                    <p><router-link to="/register">Ainda não possui conta?</router-link></p>
                    <div class="button-box">
                        <button type="submit">Entrar</button>
                    </div>
                </form>
            </div>
            <div class="box" id="box2">
                <img :src="imagem" alt="Img">
            </div>
        </main>
    </div>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import logo from '../../assets/imgs/imageMain.png';

import router from '../../router/index.js'
import Cookies from 'js-cookie';
import { loginAluno } from '../../services/api/aluno';
import { LoginMixins } from '../../util/mixins.js';

export default {
    name: 'Login',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAluno: {
                email: '',
                password: ''
            },
            emailFocused: false,
            passwordFocused: false,
            imagem: logo,
            showPassword: false,
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
                const response = await loginAluno({
                    email: this.userAluno.email,
                    password: this.userAluno.password
                });

                if (response.status >= 200 && response.status < 300) {
                    (Cookies.get('token')) ? Cookies.remove('token') : null;
                    (Cookies.get('email-aluno')) ? Cookies.remove('email-aluno') : null;
                    (Cookies.get('completed')) ? Cookies.remove('completed') : null;

                    this.login("token", `${response.data.token}`);
                    
                    Cookies.set("completed", (response.data.aluno.rm ? "true" : "false"));
                    Cookies.set('email-aluno', this.userAluno.email)

                    router.push({ path: '/aluno' });
                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [LoginMixins]
}
</script>
<style lang="scss" scoped>
@import "../../scss/pages/aluno/_login.scss";
</style>