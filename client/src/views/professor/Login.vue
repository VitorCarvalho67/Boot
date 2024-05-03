<template>
    <Header />
    <div id="app">
        <main>
            <H1>Login de professor</H1>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="email">Email:</label>
                    <p> {{ this.professor.email }}</p> <router-link to="/professor/init">Editar</router-link>
                </div>
                <div>
                    <label for="password">Senha:</label>
                    <input type="password" id="password" v-model="professor.password" required>
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
import { loginProfessor } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'

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
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await loginProfessor({
                    email: this.professor.email,
                    password: this.professor.password
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
            if(Cookies.get('emailProfessor')){
                this.professor.email = Cookies.get('emailProfessor');
            }
            else{
                router.push({path: "/professor/init"});
            }
        }
    },
    async created(){
        await this.getEmail();
    }
}
</script>