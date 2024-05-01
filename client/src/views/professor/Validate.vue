<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <H1>Token de acesso:</H1>
                <p>Informe a senha temporária enviada para o seu email</p>
                <p>Senha temporária:</p>
                <input type="text" id="temporaryPassord" v-model="professor.temporaryPassord" required>
                <p>Nova Senha:</p>
                <input type="text" id="temporaryPassord" v-model="professor.newPassord" required>
                <button type="submit">Verificar</button>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import { validateProfessor } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'

export default {
    name: 'ValidateProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            professor: {
                temporaryPassord: '',
                newPassord: ''
            }
        }
    },
    methods: {
        async submitForm() {
            const emailCookies = Cookies.get('email');
            try {
                await validateProfessor({
                    email: emailCookies,
                    temporaryPassord: this.professor.temporaryPassord,
                    newPassord: this.professor.newPassord
                });

                Cookies.remove('email');
                alert('Professor logado com sucesso');
                
                router.push({ name: 'Login' })
            } catch (error) {
                alert('Erro ao loogar como professor');
            }

        }
    }
}
</script>