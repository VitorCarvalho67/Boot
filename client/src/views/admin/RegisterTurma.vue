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
import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { getCursos, registerTurma } from '../../services/api';
import { authMixin } from '../../util/mixinAdmin.js';

export default {
    name: 'RegisterTurma',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            token: '',
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
                const data = await registerTurma(
                    {
                        inicio: this.turma.inicio,
                        fim: this.turma.fim,
                        cursoName: this.turma.curso
                    }, 
                    this.token
                );
                alert("CERTINHO 🙏")
            } catch (error) {
                alert('Erro ao registrar curso ' + error);
            }
        },

        async GetCursos() {
            try {
                this.cursos = await getCursos(this.token);
            } catch (error) {
                console.log(error);
            }
        }
    },
    mixins: [authMixin],
    async created() {
        this.authenticate();
        await this.GetCursos();
    }
}

</script>

<style lang="scss" scoped></style>