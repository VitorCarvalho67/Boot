<template>
    <Header />
    <div id="app">
        <main>
            <section class="content">
                <div class="box" id="box1">
                    <H1>Rankings</H1>
                    <h2>Ranking gerados a partir das notas dos alunos. O objetivo desse ranking é proporcionar competitividade e destacar os alunos para as empresas.</h2>
                    
                    <div class="alunos">
                        <p class="info">Ranking geral:</p>
                
                        <router-link v-for="(item, index) in ranking" :key="index" :to="`/aluno/profile/${item.aluno.rm}`" class="aluno">
                            <b>#{{ index + 1 }}</b>
                            <img :src="index + 1 < 4 ? medalhas[index] : medalhas[3]"
                                :class="(index + 1 < 4) ? 'medalha' : 'medalha normal'" alt="" />
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
import searchIcon from '../../assets/icons/procurar.png';
import medalha1 from '../../assets/icons/m1.png';
import medalha2 from '../../assets/icons/m2.png';
import medalha3 from '../../assets/icons/m3.png';
import medalhaDefault from '../../assets/icons/m3.png';


import Cookies from 'js-cookie';

import { getNotaRanking } from '../../services/api/shared';

export default {
    name: 'Ranking',
    components: {
        Header,
    },
    data() {
        return {
            aluno: {
                token: ''
            },
            ranking: {

            },
            medalhas: [medalha1, medalha2, medalha3, medalhaDefault],
        };
    },
    methods: {
        async getRanking() {
            try {
                const response = await getNotaRanking();
                if (response.status >= 200 && response.status < 300) {
                    this.ranking = response.data;
                    console.log(this.ranking)
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
