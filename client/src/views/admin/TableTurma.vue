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
                    <p>Turmas</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row">
                            <div class="table-cell">Turmas Registradas</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="turma in turmas" :key="turma.id">
                            <div class="table-cell">
                                <p v-text="'Curso: ' + turma.curso.name"></p>
                                <p v-text="'Data de início: ' + turma.inicio"></p>
                                <p v-text="'Data de término: ' + turma.fim"></p>
                                <div class="alunos">
                                    <div class="aluno" v-for="(aluno, index) in  turma.lista_de_alunos" :key="index">
                                        {{aluno.name}}
                                    </div>
                                </div>
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
import { getFullTurmas } from '../../services/api/admin';

export default {
    name: 'TableTurmas',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            turmas: []
        }
    },
    methods: {
        async fetchTurmas() {
            const data = await getFullTurmas(this.admin.token);
            this.turmas = data.data;
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.fetchTurmas();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableTurma.scss";

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