<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <H1>Token de acesso:</H1>
                <p>Informe o token enviado para o email informado: {{ email }}</p>
                <p>Caso não tenha recebino o email</p> <button>Retornar para a página anterior</button>
                <input type="text" id="token" v-model="userAluno.token" required>
                <button type="submit">Verificar</button>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import { registerAluno } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'

export default {
    name: 'ValidateRegister',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAluno: {
                token: ''
            }
        }
    },
    methods: {
        async submitForm() {
            const emailCookies = Cookies.get('email');
            try {
                const response = await registerAluno({
                    email: emailCookies,
                    token: this.userAluno.token
                });

                if (200 <= response.status && response.status < 300) {
                    Cookies.remove('email');
                    router.push({ name: 'Login' });

                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    }
}
</script>