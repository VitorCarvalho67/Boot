<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard />
            <div class="content">
                <div class="back-button">
                    <router-link to="/vagas">
                        <img src="../../assets/icons/angulo.png" alt="Voltar" />
                        Voltar
                    </router-link>
                </div>
                <div class="capa">
                    <div class="capaProfile">
                        <img v-if="empresa.banner === 'default'" src="../../assets/imgs/defaultBanner.png" alt="Capa" />
                        <img v-else :src="empresa.banner" alt="Capa" />
                    </div>
                    <div class="infoProfile">
                        <img v-if="empresa.imagem === 'default'" src="../../assets/icons/artwork.png" />
                        <img v-else :src="empresa.imagem" />
                        <div class="info">
                            <div class="box1">
                                <h1 v-text="empresa.nome"></h1>
                            </div>
                            <div class="box2">
                                <p v-text="empresa.email"></p>
                                <p v-show="mode === 'view'">
                                    <a :href="empresa.site" target="_blank">{{ empresa.site }}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <section class="sobreMim">
                    <h2>Nossos Estágios:</h2>
                    <ul class="vagas">
                        <li v-if="empresa.vagas && empresa.vagas.length < 1">
                            <p>Nenhuma vaga cadastrada por esta empresa.</p>
                        </li>
                        <li class="vaga" v-for="(vaga, index) in empresa.vagas" :key="index">
                            <router-link :to="'/vaga/' + vaga.id">
                                <div class="infoVaga">
                                    <div class="contentVaga name">
                                        <p class="who">{{ vaga.titulo }}</p>

                                        <div class="info">
                                            <label>Salário</label>
                                            <p v-text="vaga.remuneracao"></p>
                                        </div>
                                        <div class="info">
                                            <label>Carga horária</label>
                                            <p v-text="vaga.cargaHoraria"></p>
                                        </div>
                                        <div class="info">
                                            <label>Oferecida por</label>
                                            <p v-text="vaga.empresa"></p>
                                        </div>
                                        <div class="info">
                                            <label>Curso preferencial</label>
                                            <p v-text="vaga.curso"></p>
                                        </div>
                                    </div>
                                    <div class="box-button">
                                        <button>Ver vaga</button>
                                    </div>
                                </div>
                            </router-link>
                        </li>

                    </ul>
                </section>
            </div>
        </main>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue';
import { getEmpresa, getVagas } from '../../services/api/shared.js';

export default {
    name: 'PublicPerfilEmpresa',
    components: {
        Header,
        AsideDashboard,
        Footer
    },
    data() {
        return {
            empresa: {
                email: '',
                telefone: '',
                endereco: '',
                imagem: '',
                banner: '',
                patrocinada: '',
                cnpj: '',
                site: '',
                siteSubmit: '',
                token: '',
                vagas: [],
            },
            mode: "view",
        };
    },
    methods: {
        async GetEmpresa() {
            try {
                const response = await getEmpresa(this.empresa.email);
                if (response.status >= 200 && response.status < 300) {
                    this.empresa = response.data;
                    this.empresa.siteSubmit = response.data.site;

                    await this.loadVagasEmpresa();
                } else {
                    console.error("Erro ao carregar dados da empresa", response.message);
                }
            } catch (error) {
                console.error("Erro ao carregar dados da empresa", error.message);
            }
        },
        async loadVagasEmpresa() {
            try {
                const response = await getVagas();
                if (response.status >= 200 && response.status < 300) {
                    this.empresa.vagas = response.data.filter(
                        (vaga) => vaga.empresa.toLowerCase() === this.empresa.nome.toLowerCase()
                    );
                } else {
                    console.error("Erro ao carregar vagas da empresa.");
                }
            } catch (error) {
                console.error("Erro ao carregar vagas da empresa.", error.message);
            }
        },
    },
    async created() {
        this.empresa.email = this.$route.params.email;
        await this.GetEmpresa();
    }
};
</script>

<style lang="scss" scoped>
@import "../../scss/pages/empresa/_dashboard.scss";

#app {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px);

    main {
        display: flex;
        flex: 1;
        overflow: hidden;

        .content {
            flex: 1;
            overflow-y: auto;
            height: 100%;

            @media (max-width: 1000px) {
                width: calc(100% - 100px);
            }
        }
    }
}
</style>
