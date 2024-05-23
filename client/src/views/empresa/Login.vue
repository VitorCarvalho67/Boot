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
                            <router-link to="/empresa/register">Cadastro</router-link>
                        </li>
                    </ul>
                </nav>
                <form @submit.prevent="submitForm">
                    <div class="content">
                        <h1>Bem vindo!</h1>
                        <p>Entre com suas credencias de acesso empresarial</p>
                        <div class="input-box" :class="{ 'focused': cnpjFocused }">
                            <label for="cnpj">CNPJ</label>
                            <input type="text" id="cnpj" v-model="empresa.cnpjExibido" required
                                @focus="cnpjFocused = true" @blur="cnpjFocused = false" @input="cnpj">
                        </div>
                        <div class="input-box" :class="{ 'focused': passwordFocused }">
                            <div class="d1">
                                <label for="password">Senha</label>
                                <input :type="inputType" id="password" v-model="empresa.password" required
                                    @focus="passwordFocused = true" @blur="passwordFocused = false">
                            </div>
                            <div class="d2">
                                <button type="button" @focus="passwordFocused = true" @blur="passwordFocused = false"
                                    @click="togglePasswordVisibility" :class="buttonClass"></button>
                            </div>
                        </div>
                    </div>
                    <p><router-link to="/empresa/recovery">Esqueceu a senha?</router-link></p>
                    <p><router-link to="/empresa/register">Ainda não possui conta empresarial?</router-link></p>
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
import img from '../../assets/imgs/imageMain.png';

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { EmpresaMixin } from '../../util/mixins'
import { loginEmpresa } from '../../services/api/empresa';

export default {
    name: 'LoginEmpresa',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            empresa: {
                cnpj: '',
                password: '',
                cnpjExibido: ''
            },
            cnpjFocused: false,
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
                const response = await loginEmpresa({
                    cnpj: this.empresa.cnpj,
                    password: this.empresa.password
                });

                if (response.status >= 200 && response.status < 300) {
                    if (Cookies.get('token-empresa')) {
                        Cookies.remove('token-empresa');
                    }
                    document.cookie = `token-empresa=${response.data.token}`;
                    alert("Tudo certo! 😉");
                    router.push({ path: "/empresa" });
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [EmpresaMixin]
}
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/empresa/_login.scss";
</style>