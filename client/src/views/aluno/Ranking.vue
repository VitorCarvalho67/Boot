<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="rankings" />
            <section class="content">
                <div class="box" id="box1">
                    <H1>Rankings</H1>
                    <h2>Rankings gerados a partir das atividades dos alunos. O objetivo desses rankings é proporcionar competitividade e destacar os alunos para as empresas.</h2>
                    
                    <div class="alunos">
                        <p class="info">Ranking geral:</p>
                        <router-link to="" class="aluno">
                            <b>#1</b>
                            <img src="../../assets/icons/m1.png" alt="">
                            <img src="../../assets/icons/artwork.png" alt="">
                            <p class="name">Beatriz Rodriges de Oliveira - 3º DS</p>
                            <p class="pontos">XXXX pontos</p>
                        </router-link>
                        <router-link to="" class="aluno">
                            <b>#2</b>
                            <img src="../../assets/icons/m2.png" alt="">
                            <img src="../../assets/icons/artwork.png" alt="">
                            <p class="name">Maria Clara Dias Soares De Souza - 3º DS</p>
                            <p class="pontos">XXXX pontos</p>
                        </router-link>
                        <router-link to="" class="aluno">
                            <b>#3</b>
                            <img src="../../assets/icons/m3.png" alt="">
                            <img src="../../assets/icons/artwork.png" alt="">
                            <p class="name">Daniel Rocha Alvarenga - 3º DS</p>
                            <p class="pontos">XXXX pontos</p>
                        </router-link>
                        <router-link to="" class="aluno">
                            <b>#4</b>
                            <img src="../../assets/icons/m3.png" class="normal" alt="">
                            <img src="../../assets/icons/artwork.png" alt="">
                            <p class="name">Amanda Barbosa Godinho - 3º DS</p>
                            <p class="pontos">XXXX pontos</p>
                        </router-link>
                        <router-link to="" class="aluno">
                            <b>#5</b>
                            <img src="../../assets/icons/m3.png" class="normal" alt="">
                            <img src="../../assets/icons/artwork.png" alt="">
                            <p class="name">Gustavo do Nascimento Paulo - 3º DS</p>
                            <p class="pontos">XXXX pontos</p>
                        </router-link>
                        <router-link to="" class="aluno">
                            <b>#6</b>
                            <img src="../../assets/icons/m3.png" class="normal" alt="">
                            <img src="../../assets/icons/artwork.png" alt="">
                            <p class="name">Guilherme de Almeida Rodrigues - 3º DS</p>
                            <p class="pontos">XXXX pontos</p>
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
            }
        };
    },
    methods: {
        
    }
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
