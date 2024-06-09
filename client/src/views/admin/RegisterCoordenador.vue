<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de Coordenador</h1>

                <label for="professor">Professor a se tornar coordenador:</label>
                <select id="professor" v-model="coordenador.name" required>
                    <option value="" disabled>Selecione um professor</option>
                    <option v-for="professor in professores" :key="professor.name" :value="professor.name">{{
                        professor.name }}</option>
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

import { mixinAdmin } from '../../util/authMixins.js';
import { getProfessores, registerCoordenador } from '../../services/api/admin';

export default {
    name: 'RegisterCoordenador',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            coordenador: {
                name: '',
            },
            professores: [],
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await registerCoordenador(this.coordenador.name, this.admin.token);

                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                    await this.GetProfessores();
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },
        async GetProfessores() {
            try {
                const response = await getProfessores(this.admin.token);
                this.professores = response.data
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.GetProfessores();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_registerCoordenador.scss"
</style>