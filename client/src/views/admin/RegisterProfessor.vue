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
            </form>
        </div>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import { mixinAdmin } from '../../util/authMixins.js';
import { registerProfessor } from '../../services/api/admin';

export default {
    name: 'RegisterProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            token: '',
            professor: {
                name: '',
                tituloPrincipal: '',
                email: ''
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await registerProfessor(
                    {
                        name: this.professor.name,
                        tituloPrincipal: this.professor.tituloPrincipal,
                        email: this.professor.email
                    },
                    this.token
                );

                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.Authenticate();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_registerProfessor.scss";
</style>