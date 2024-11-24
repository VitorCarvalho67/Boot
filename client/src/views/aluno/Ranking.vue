<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="rankings" />
            <section class="content">
                <div class="box" id="box1">
                    <H1>Rankings</H1>
                    <h2>Ranking gerado a partir das notas dos alunos. O objetivo desse ranking é proporcionar competitividade e destacar os alunos para as empresas.</h2>
                    
                    <div class="alunos">
                        <p class="info">Ranking geral:</p>
                
                        <router-link v-for="(item, index) in ranking" :key="index" :to="`/aluno/profile/${item.aluno.rm}`" class="aluno">
                            <b>#{{ index + 1 }}</b>
                            <img :src="(index + 1 < 4) ? '../assets/icons/m' + (index + 1) + '.png' : '../../assets/icons/m3.png'" :class="(index + 1 < 4) ? 'medalha' : 'medalha normal' " alt="">
                            <img v-if="item.aluno.imagem != 'default'" :src="item.aluno.imagem" alt="Foto do aluno">
                            <img v-else src="../../assets/icons/artwork.png" alt="Foto padrão">
                            <p class="name">{{ item.aluno.nome }} - 3º DS</p>
                            <p class="pontos">{{ (item.rankingNota * 1000).toFixed(2) }} pontos</p>
                        </router-link>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import Header from '../../components/aluno/Header.vue';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue';
import searchIcon from '../../assets/icons/procurar.png';

import Cookies from 'js-cookie';

import { getNotaRanking } from '../../services/api/shared';

export default {
    name: 'Ranking',
    components: {
        Header,
        AsideDashboard
    },
    data() {
        return {
            aluno: {
                token: ''
            },
            ranking: {

            }
        };
    },
    methods: {
        async getRanking() {
            try {
                const response = await getNotaRanking();
                if (response.status >= 200 && response.status < 300) {
                    this.ranking = response.data;
                } else {
                    console.error(
                        "Erro ao carregar ranking",
                        response.message,
                    );
                }
            } catch (error) {
                console.error(
                    "Erro ao carregar ranking",
                    error.message,
                );
            }
        },
    },
    async created() {
        await this.getRanking();
    },
};
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/shared/_ranking.scss";

    #app {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px);
    min-height: 510px;

    main {
        display: flex;
        flex: 1;
        min-height: calc(100vh - 80px);
        overflow: hidden;

        .content {
            flex: 1;
            min-height: calc(100vh - 80px);
            padding: 20px;
            overflow-y: auto;

            @media (max-width: 1000px) {
                width: calc(100% - 100px);
            }
        }
    }
}
</style>
