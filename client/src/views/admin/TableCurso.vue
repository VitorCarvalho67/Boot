<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <div class="path">
                    <p>Dashboard</p>
                    <img :src="anguloIcon" alt="">
                    <p>Tabelas</p>
                    <img :src="anguloIcon" alt="">
                    <p>Cursos</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row">
                            <div class="table-cell">Cursos Registrados</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="curso in cursos" :key="curso.id">
                            <div class="table-cell">
                                <p>{{ curso.name }}</p>
                                <p>Coordenador: {{ curso.coordenador }}</p>
                                <p>Turmas: {{ curso.quantidadeTurmas }}</p>
                                <p>Alunos: {{ curso.quantidadeAlunos }}</p>
                                <p>Duração: {{ curso.duracao }}</p>
                                <p>Turno: {{ turnos[curso.turno] }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>


<script>
import Header from '../../components/Header.vue';
import AsideDashboard from '../../components/admin/AsideDashboard.vue';
import anguloIcon from '../../assets/icons/angulo.png';

import { mixinAdmin } from '../../util/authMixins.js';
import { getFullCursos } from '../../services/api/admin';

export default {
    name: 'TableCursos',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            cursos: [],
            turnos: {
                MANHA: "Manhã",
                TARDE: "Tarde",
                NOITE: "Noite",
                INTEGRAL: "Integral"
            }
        }
    },
    methods: {
        async fetchCursos() {
            const data = await getFullCursos(this.admin.token);
            this.cursos = data.data;
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.fetchCursos();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableCurso.scss";

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