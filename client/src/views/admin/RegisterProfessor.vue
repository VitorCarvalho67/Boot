<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de professor</h1>
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="professor.name" required>
                </div>
                <div>
                    <label for="titulo">Título principal:</label>
                    <input type="text" id="name" v-model="professor.tituloPrincipal" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="professor.email" @input="checkData" required>
                </div>
                <br>

                <button type="submit">Registrar</button>
                <br>

            </form>
        </div>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { authAdmin } from '../../services/api';
import { registerProfessor } from '../../services/api';

export default {
    name: 'RegisterProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            professor: {
                name: '',
                tituloPrincipal: '',
                email: ''
            }
        }
    },
    methods: {
        async submitForm() {
            const token = Cookies.get('token');
            if (token){
                try {
                    const data = await registerProfessor({
                        name: this.professor.name,
                        tituloPrincipal: this.professor.tituloPrincipal,
                        email: this.professor.email
                    }, token);
                    alert("tudo certo 😂")
                } catch (error) {
                    alert('Erro ao registrar professor');
                }
            } else{
                alert("Cookie de token não encontrado")
            }
        },

        async Authenticate() {
            const token = Cookies.get('token');
            if (token == undefined) {
                router.push({ path: '/admin/login' });
            } else {
                try {
                    const auth = await authAdmin(token);

                    if (auth !== "Usuário autenticado com sucesso.") {
                        router.push({ path: "/admin/login" })
                    }
                } catch (error) {
                    alert(error);
                }
            }
        }
    },
    async created() {
        await this.Authenticate();
    }
}

</script>

<style lang="scss" scoped></style>