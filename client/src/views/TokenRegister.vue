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
import Cookies from 'js-cookie';
import { registerAluno } from '../services/api.js';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
    name: 'TokenRegister',
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
                const data = await registerAluno({
                    email: emailCookies,
                    token: this.userAluno.token
                });

                alert('Aluno registrado com sucesso');
            } catch (error) {
                alert('Erro ao registrar aluno');
            }

        }
    }
}
</script>