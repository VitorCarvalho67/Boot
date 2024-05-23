<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de Curso</h1>

                <div>
                    <label for="name">Nome do curso:</label>
                    <input type="text" id="name" v-model="curso.name" required>
                </div>

                <div>
                    <label for="turno">Turno:</label>
                    <select id="turno" name="turno" v-model="curso.turno" required>
                        <option value="MANHA">Manhã</option>
                        <option value="TARDE">Tarde</option>
                        <option value="NOITE">Noite</option>
                        <option value="INTEGRAL">Integral</option>
                    </select>
                </div>

                <div>
                    <label>Duração:</label>
                    <div>
                        <input type="number" v-model="curso.duracao_quantidade" required>
                        <select id="duracao" name="duracao" v-model="curso.duracao_periodo" required>
                            <option value="anos">Anos</option>
                            <option value="meses">Meses</option>
                        </select>
                    </div>
                </div>

                <label for="coordenador">Coordenador:</label>
                <select id="coordenador" v-model="curso.coordenador" required>
                    <option value="" disabled>Selecione um coordenador</option>
                    <option v-for="coordenador in coordenadores" :key="coordenador.name" :value="coordenador.name">{{
                        coordenador.name }}</option>
                </select>
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
import { getCoordenadores, registerCurso } from '../../services/api/admin';

export default {
    name: 'RegisterCurso',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            token: '',
            curso: {
                name: '',
                turno: '',
                duracao_quantidade: '',
                duracao_periodo: '',
                coordenador: ''
            },
            coordenadores: [],
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await registerCurso(
                    {
                        cursoName: this.curso.name,
                        turno: this.curso.turno,
                        duracao: (this.curso.duracao_quantidade + " " + this.curso.duracao_periodo),
                        coordenador: this.curso.coordenador
                    },
                    this.token
                );

                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },
        async GetCoordenadores() {
            try {
                const response = await getCoordenadores(this.token);
                this.coordenadores = response.data;
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.GetCoordenadores();
    }
}

</script>

<style lang="scss" scoped>
    @import "../../scss/views/admin/RegisterCurso.scss"
</style>