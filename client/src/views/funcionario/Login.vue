<template>
    <Header />
    <div id="app">
        <main>
            <H1>Login de funcionario</H1>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="email">Email:</label>
                    <p> {{ this.funcionario.email }}</p> <router-link to="/funcionario/init">Editar</router-link>
                </div>
                <div>
                    <label for="password">Senha:</label>
                    <input type="password" id="password" v-model="funcionario.password" required>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </main>
    </div>
    <Footer />

</template>
<script>
import { loginFuncionario } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'

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
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await loginFuncionario({
                    email: this.funcionario.email,
                    password: this.funcionario.password
                });
                
                if (200 <= response.status && response.status < 300) {
                    if(Cookies.get('token')){
                        Cookies.remove('token');
                    }
                    
                    document.cookie = `token=${response.token}`;
                    
                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },

        async getEmail(){
            if(Cookies.get('emailFuncionario')){
                this.funcionario.email = Cookies.get('emailFuncionario');
            }
            else{
                router.push({path: "/funcionario/init"});
            }
        }
    },
    async created(){
        await this.getEmail();
    }
}
</script>