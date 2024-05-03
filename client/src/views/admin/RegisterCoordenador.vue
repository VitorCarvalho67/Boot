<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de Coordenador</h1>

                <label for="professor">Professor a se tornar coordenador:</label>
                <select id="professor" v-model="coordenador.name" required>
                    <option value="" disabled>Selecione um professor</option>
                    <option v-for="professor in professores" :key="professor.name" :value="professor.name">{{ professor.name }}</option>
                </select>

                <button type="submit">Registrar</button>

            </form>
        </div>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js';
import { authMixin } from '../../util/mixinAdmin.js';
import { getProfessores, registerCoordenador } from '../../services/api';

export default {
    name: 'RegisterCoordenador',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            token: '',
            coordenador: {
                name: '',
            },
            professores: [],
        }
    },
    methods: {
        async submitForm() {
            try {
                const data = await registerCoordenador(this.coordenador.name, this.token);
                alert("CERTINHO 🙏")
            } catch (error) {
                alert('Erro ao registrar coordenador ' + error);
            }
        },
        async GetProfessores() {
            try {
                this.professores = await getProfessores(this.token);
            } catch (error) {
                console.error('Erro ao recuperar a lista de professores:', error);
            }
        }
    },
    mixins: [authMixin],
    async created() {
        this.authenticate();
        await this.GetProfessores();
    }
}

</script>

<style lang="scss" scoped></style>