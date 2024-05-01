<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Faça seu login como professor:</h1>
                <p>Email:</p>
                <button type="submit">Continuar</button>
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