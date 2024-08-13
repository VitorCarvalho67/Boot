<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <div class="path">
                    <p>Dashboard</p>
                    <img :src="anguloIcon" alt="">
                    <p>Formulários</p>
                    <img :src="anguloIcon" alt="">
                    <p>Registro de cursos</p>
                </div>
                <div class="register">
                    <form @submit.prevent="submitForm">
                        <h1>Registro de Curso</h1>
                        <p>Preencha os dados abaixo para registrar um novo curso. Certifique-se de fornecer informações
                            corretas sobre o nome, turno, duração e coordenador do curso.</p>


                        <div class="input-box">
                            <label for="name">Nome do curso:</label>
                            <input type="text" id="name" v-model="curso.name" required>
                        </div>

                        <div class="select-box">
                            <Select :dataSelect="dataSelectTurno" @input="curso.turno = $event" />
                        </div>

                        <div class="input-box">
                            <label for="">Quantidade de meses ou anos:</label>
                            <input type="number" v-model="curso.duracao_quantidade" required>
                        </div>

                        <div class="select-box">
                            <Select :dataSelect="dataSelectDuracao" @input="curso.duracao_periodo = $event" />
                        </div>

                        <div class="select-box">
                            <Select :dataSelect="dataSelectCoordenador" @input="curso.coordenador = $event" />
                        </div>

                        <div class="button-box">
                            <button type="submit">Registrar</button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    </div>
    <Footer />

</template>

<script>
import Header from '../../components/admin/Header.vue';
import Footer from '../../components/Footer.vue';
import Select from '../../components/Select.vue';
import AsideDashboard from '../../components/admin/AsideDashboard.vue';
import anguloIcon from '../../assets/icons/angulo.png';

import { mixinAdmin } from '../../util/authMixins.js';
import { getCoordenadores, registerCurso } from '../../services/api/admin';

export default {
    name: 'RegisterCurso',
    components: {
        Header,
        Footer,
        AsideDashboard,
        Select
    },
    data() {
        return {
            anguloIcon,
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
@import "../../scss/pages/admin/_registerCurso.scss";

#app {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px);

    main {
        display: flex;
        overflow: hidden;

        .content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            height: 100%;

            @media (max-width: 1000px) {
                width: calc(100% - 100px);
            }
        }
    }
}
</style>