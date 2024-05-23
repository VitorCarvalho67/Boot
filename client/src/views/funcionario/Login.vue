<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <p>Funcionário</p>
                        </li>
                        <li>
                            <router-link to="/login">É Aluno?</router-link>
                        </li>
                    </ul>
                </nav>
                <form @submit.prevent="submitForm">
                    <div class="content">
                        <h1>Bem vindo, Profissional!</h1>
                        <p>Entre com suas credenciais de acesso do funcionário</p>
                        <div class="input-box focused">
                            <div class="d1">
                                <label for="email">E-Mail</label>
                                <p>{{ funcionario.email }}</p>
                            </div>
                            <router-link to="/funcionario/init" class="editMail"></router-link>
                        </div>
                        <div class="input-box" :class="{ 'focused': passwordFocused }">
                            <div class="d1">
                                <label for="password">Senha</label>
                                <input :type="inputType" id="password" v-model="funcionario.password" required
                                       @focus="passwordFocused = true" @blur="passwordFocused = false">
                            </div>
                            <div class="d2">
                                <button type="button" @click="togglePasswordVisibility" :class="buttonClass"></button>
                            </div>
                        </div>
                        <p><router-link to="/funcionario/recovery">Esqueceu a senha?</router-link></p>
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
import { loginFuncionario } from '../../services/api/funcionario';

export default {
    name: 'LoginFuncionario',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            funcionario: {
                email: '',
                password: ''
            },
            showPassword: false,
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
                const response = await loginFuncionario({
                    email: this.funcionario.email,
                    password: this.funcionario.password
                });

                if (200 <= response.status && response.status < 300) {
                    if(Cookies.get('token-funcionario')){
                        Cookies.remove('token-funcionario');
                    }
                    
                    document.cookie = `token-funcionario=${response.data.token}`;
                    
                    alert("Tudo certo! 😉");
                    router.push({name: "Funcionario"})
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },
        async getEmail() {
            if(Cookies.get('email-init-funcionario')){
                this.funcionario.email = Cookies.get('email-init-funcionario');
            }
            else {
                router.push({path: "/funcionario/init"});
            }
        }
    },
    async created() {
        await this.getEmail();
    }
}
</script>

<style lang="scss" scoped>
    @import "../../scss/views/funcionario/Login.scss";
</style>