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
                    <p>Estágios</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row">
                            <div class="table-cell">Vagas Registradas</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="vaga in estagios" :key="vaga.id">
                            <div class="table-cell">
                                <div class="vaga-header">
                                    <strong v-text="vaga.titulo"></strong>
                                    <p v-text="'Registrado por ' + vaga.funcionario.name"></p>
                                    <p>Empresa: <router-link :to="'/empresa/' + vaga.empresa.cnpj">{{ vaga.empresa.name}}</router-link></p>
                                    <p class="status" v-text="situacao[vaga.status]"></p>
                                </div>

                                <section class="vaga-info">
                                    <strong>Requisitos</strong>
                                    <ul class="requisitos">
                                        <li v-for="(requisito, index) in parsedRequisitos" :key="index">
                                            <p v-text="requisito"></p>
                                        </li>
                                    </ul>

                                    <div class="vaga-details">
                                        <p>Carga Horária: <span v-text="vaga.cargaHoraria"></span></p>
                                        <p>Entrada: <span v-text="vaga.entrada"></span></p>
                                        <p>Saída: <span v-text="vaga.saida"></span></p>
                                    </div>

                                    <section class="descricao">
                                        <strong>Descrição</strong>
                                        <div class="vaga-remuneracao">
                                            <p>Remuneração: <span v-text="vaga.remuneracao"></span></p>
                                        </div>
                                        <p v-text="vaga.descricao"></p>
                                    </section>


                                    <strong>Benefícios</strong>
                                    <ul class="beneficios">
                                        <li v-for="(beneficio, index) in parsedBeneficios" :key="index">
                                            <p v-text="beneficio"></p>
                                        </li>
                                    </ul>
                                </section>
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
import { getFullEstagios } from '../../services/api/admin.js';

export default {
    name: 'TableEstagios',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            estagios: [],
            situacao: {
                "DISPONIVEL": "Vaga disponível",
                "INDISPONIVEL": "Vaga indisponível"
            }
        }
    },
    methods: {
        async fetchEstagios() {
            const data = await getFullEstagios(this.admin.token);
            this.estagios = data.data;
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.fetchEstagios();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableEstagio.scss";

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