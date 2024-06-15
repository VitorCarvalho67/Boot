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
                    <Select :dataSelect="dataSelectTurno" @input="curso.turno = $event"/>
                </div>

                <div>
                    <label>Duração:</label>
                    <div>
                        <input type="number" v-model="curso.duracao_quantidade" required>
                        <Select :dataSelect="dataSelectDuracao" @input="curso.duracao_periodo = $event"/>
                    </div>
                </div>

                <div>
                    <Select :dataSelect="dataSelectCoordenador" @input="curso.coordenador = $event"/>
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
import Select from '../../components/Select.vue';

import { mixinAdmin } from '../../util/authMixins.js';
import { getCoordenadores, registerCurso } from '../../services/api/admin';

export default {
    name: 'RegisterCurso',
    components: {
        Header,
        Footer,
        Select
    },
    data() {
        return {
            curso: {
                name: '',
                turno: '',
                duracao_quantidade: '',
                duracao_periodo: '',
                coordenador: ''
            },
            dataSelectTurno: {
                title: "Selecione um turno", 
                description: "Turno",
                options: [
                    { value: 'MANHA', description: 'Manhã' },
                    { value: 'TARDE', description: 'Tarde' },
                    { value: 'NOITE', description: 'Noite' },
                    { value: 'INTEGRAL', description: 'Integral' }
                ],
            },
            dataSelectDuracao: {
                title: "Selecione um período", 
                description: "Período",
                options: [
                    { value: 'anos', description: 'Anos' },
                    { value: 'meses', description: 'Meses' },
                ],
            },
            dataSelectCoordenador: {
                title: "Selecione um coordenador", 
                description: "Coordenador",
                options: [],
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
                    this.admin.token
                );

                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                    await this.GetCoordenadores();

                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },
        async GetCoordenadores() {
            try {
                const response = await getCoordenadores(this.admin.token);
                this.coordenadores = response.data;

                this.dataSelectCoordenador.options = this.coordenadores.map(coordenador => ({
                    value: coordenador.name,
                    description: coordenador.name
                }));
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
@import "../../scss/pages/admin/_registerCurso.scss"
</style>