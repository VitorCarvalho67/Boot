<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de Turma</h1>
                <label>Ínicio:</label>
                <div>
                    <input type="date" name="" id="" v-model="turma.inicio" @input="checkDateValidity">
                </div>

                <label>Fim:</label>
                <div>
                    <input type="date" name="" id="" v-model="turma.fim" @input="checkDateValidity">
                </div>

                <select id="curso" v-model="turma.curso" required>
                    <option value="" disabled>Selecione um curso</option>
                    <option v-for="curso in cursos" :key="curso.name" :value="curso.name">{{ curso.name }}</option>
                </select>

                <button type="submit" v-show="!invalidDate">Registrar val</button>
                <button type="button" v-show="invalidDate">Registrar inv</button>

            </form>
        </div>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import { mixinAdmin } from '../../util/authMixins.js';
import { registerTurma, getCursos } from '../../services/api/admin';

export default {
    name: 'RegisterTurma',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            turma: {
                inicio: '',
                fim: '',
                curso: '',
            },
            invalidDate: true,
            cursos: [],
        }
    },
    methods: {
        checkDateValidity() {
            const startDate = new Date(this.turma.inicio);
            const endDate = new Date(this.turma.fim);
            if (endDate <= startDate) {
                this.invalidDate = true;
            } else {
                this.invalidDate = false;
            }
        },
        async submitForm() {
            try {
                const response = await registerTurma(
                    {
                        inicio: this.turma.inicio,
                        fim: this.turma.fim,
                        cursoName: this.turma.curso
                    },
                    this.admin.token
                );

                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },

        async GetCursos() {
            try {
                const response = await getCursos(this.admin.token);
                this.cursos = response.data
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.GetCursos();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_registerTurma.scss";
</style>