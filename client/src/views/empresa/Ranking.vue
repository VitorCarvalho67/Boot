<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="rankings" />
            <section class="content">
                <div class="box" id="box1">
                    <H1>Ranking</H1>
                    <h2>Ranking gerado a partir das notas dos alunos. A nota máxima é 1000.</h2>
                    
                    <div class="alunos">
                        <p class="info">Clique para entrar em contato:</p>
                
                        <router-link v-for="(item, index) in ranking" :key="index" :to="`/empresa/aluno/profile/${item.aluno.rm}`" class="aluno">
                            <div class="xx">
                                <b>#{{ index + 1 }}</b>
                                <img :src="index + 1 < 4 ? medalhas[index] : medalhas[3]"
                                    :class="(index + 1 < 4) ? 'medalha' : 'medalha normal'" alt="" />
                                <img v-if="item.aluno.imagem != 'default'" :src="item.aluno.imagem" alt="Foto do aluno">
                                <img v-else src="../../assets/icons/artwork.png" alt="Foto padrão">
                                <p class="pontos">{{ (item.rankingNota * 1000).toFixed(2) }} / {{ item.numeroNotas }} pontos</p>
                            </div>
                            <div class="zz">
                                <p class="name">{{ item.aluno.nome }} - 3º DS</p>
                                <p class="pontos">{{ (item.rankingNota * 1000).toFixed(2) }} / {{ item.numeroNotas }} pontos</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import Header from '../../components/empresa/Header.vue';
import AsideDashboard from '../../components/empresa/AsideDashboard.vue';
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
