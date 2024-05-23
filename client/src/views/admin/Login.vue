<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <p>Admin</p>
                        </li>
                        <li>
                            <router-link to="/login">É Aluno?</router-link>
                        </li>
                    </ul>
                </nav>
                <form @submit.prevent="submitForm">
                    <div class="content">
                        <h1>Bem vindo, Admin!</h1>
                        <p>Entre com suas credencias de acesso do administrador</p>
                        <div class="input-box">
                            <label for="email">E-Mail</label>
                            <input type="email" id="email" v-model="userAdmin.email" required>
                        </div>
                        <div class="input-box" :class="{ 'focused': passwordFocused }">
                            <div class="d1">
                                <label for="password">Senha</label>
                                <input :type="inputType" id="password" v-model="userAdmin.password" required
                                    @focus="passwordFocused = true" @blur="passwordFocused = false">
                            </div>
                            <div class="d2">
                                <button type="button" @click="togglePasswordVisibility" :class="buttonClass"></button>
                            </div>
                        </div>
                    </div>
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
import img from '../../assets/imgs/imageAdmin.png';

import Cookies from 'js-cookie';
import router from '../../router/index.js';
import { loginAdmin } from '../../services/api/admin';

export default {
    name: 'LoginAdmin',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAdmin: {
                email: '',
                password: ''
            },
            emailFocused: false,
            passwordFocused: false,
            imagem: img,
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
                const response = await loginAdmin({
                    email: this.userAdmin.email,
                    password: this.userAdmin.password
                });

                if (response.status >= 200 && response.status < 300) {
                    Cookies.remove('token-admin');
                    Cookies.set('token-admin', `${response.data.token}`, { expires: 10 });

                    alert("Tudo certo! 😉");
                    router.push({path: "/admin"});
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
    @import "../../scss/pages/admin/_login.scss"
</style>