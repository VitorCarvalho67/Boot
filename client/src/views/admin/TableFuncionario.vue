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
                    <p>Funcionários</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row table-row1">
                            <div class="table-cell">Funcionários Registrados</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="funcionario in funcionarios" :key="funcionario.id">
                            <div class="table-cell">
                                <p>{{funcionario.name}}</p>
                                <p>{{funcionario.email}}</p>
                                <p>Validado: {{funcionario.validated}}</p>
                                <p>Ocupação: {{cargos[funcionario.cargo]}}</p>
                                <p>Registro: {{ formatarData(funcionario.createdAt) }}</p>
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
import { getFullFuncionarios } from '../../services/api/admin';

export default {
    name: 'TableFuncionarios',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            funcionarios: [],
            cargos: {
                GESTAO: "Gestão",
                ADMINISTRACAO: "Administração",
                DIRECAO: "Direção",
                ORIENTACAO: "Orientação"
            }
        }
    },
    methods: {
        async fetchFuncionarios() {
            const data = await getFullFuncionarios(this.admin.token);
            this.funcionarios = data.data;
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
        await this.fetchFuncionarios();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableFuncionario.scss";

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