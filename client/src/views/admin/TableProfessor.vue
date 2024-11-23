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
                    <p>Professores</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row table-row1">
                            <div class="table-cell">Professores Registrados</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="professor in professores" :key="professor.id">
                            <div class="table-cell">
                                <!-- <p v-text="professor.id"></p> -->
                                <p v-text="'Nome: ' + professor.name"></p>
                                <p v-text="'Email: ' + professor.email"></p>
                                <!-- <p v-text="professor.password"></p>
                                <p v-text="professor.recoveryPass"></p> -->
                                <p v-text="'Título principal: ' + professor.tituloPrincipal"></p>
                                <p v-text="professor.imagem"></p>
                                <p v-text="professor.banner"></p>
                                <p v-text="'Conta validada: ' + professor.validated"></p>
                                <!-- <p v-text="professor.tentativasRestantes"></p> -->
                                <p v-text="'Registro: ' + formatarData(professor.createdAt)"></p>
                                <!-- <p v-text="professor.updatedAt"></p> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>


<script>
import Header from '../../components/admin/Header.vue';
import AsideDashboard from '../../components/admin/AsideDashboard.vue';
import anguloIcon from '../../assets/icons/angulo.png';

import { mixinAdmin } from '../../util/authMixins.js';
import { getFullProfessores } from '../../services/api/admin.js';

export default {
    name: 'TableProfessores',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            professores: []
        }
    },
    methods: {
        async fetchProfessores() {
            const data = await getFullProfessores(this.admin.token);
            this.professores = data.data;
        },
        formatarData(data) {
            const dataAtual = new Date();
            const dataMensagem = new Date(data);

            if (dataMensagem.toDateString() === dataAtual.toDateString()) {
                return dataMensagem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                const diff = Math.floor((dataAtual - dataMensagem) / (1000 * 60 * 60 * 24));

                if (diff === 1) {
                    return `Ontem, ${dataMensagem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                } else if (diff <= 7) {
                    return `${dataMensagem.toLocaleDateString('pt-BR', { weekday: 'long' })}, ${dataMensagem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                } else {
                    return dataMensagem.toLocaleString();
                }
            }
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.fetchProfessores();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableProfessor.scss";

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

