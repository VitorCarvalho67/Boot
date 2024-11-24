<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="estagios" />
            <div class="content">
                <div class="back-button">
                    <router-link to="/vagas">
                        <img src="../../assets/icons/angulo.png" alt="Voltar" />
                        Voltar
                    </router-link>
                </div>

                <div class="vaga">
                    <div class="vaga-header">
                        <h3 v-text="vaga.titulo"></h3>
                        <p class="status" v-text="situacao[vaga.status]"></p>
                    </div>

                    <div class="main-information">
                        <div class="enterprise">
                            <img
                                :src="vaga.empresa.entityUrl"
                                :alt="vaga.empresa.name"
                            />
                            <div class="info-enterprise">
                                <strong>Empresa:</strong>
                                <router-link
                                    :to="'/aluno/empresa/' + vaga.empresa.email">
                                    {{ vaga.empresa.name }}
                                </router-link>
                            </div>
                        </div>
                        <div class="remuneracao">
                            <strong>Remuneração:</strong>
                            <span v-text="vaga.remuneracao"></span>
                        </div>
                    </div>

                    <section class="vaga-info">
                        <h2>Requisitos</h2>
                        <ul class="requisitos">
                            <li
                                v-for="(requisito, index) in parsedRequisitos"
                                :key="index"
                            >
                                <p v-text="requisito"></p>
                            </li>
                        </ul>

                        <div class="vaga-details">
                            <p>
                                <strong>Carga Horária:</strong>
                                <span v-text="vaga.cargaHoraria"></span>
                            </p>
                            <p>
                                <strong>Entrada:</strong>
                                <span v-text="vaga.entrada"></span>
                            </p>
                            <p>
                                <strong>Saída:</strong>
                                <span v-text="vaga.saida"></span>
                            </p>
                        </div>

                        <section class="descricao">
                            <h2>Descrição</h2>
                            <p v-text="vaga.descricao"></p>
                        </section>

                        <h2>Benefícios</h2>
                        <ul class="beneficios">
                            <li
                                v-for="(beneficio, index) in parsedBeneficios"
                                :key="index"
                            >
                                <p v-text="beneficio"></p>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from "../../components/aluno/Header.vue";
import Footer from "../../components/Footer.vue";
import AsideDashboard from "../../components/aluno/AsideDashboard.vue";
import router from "../../router/index.js";
import Cookies from "js-cookie";
import { getVaga } from "../../services/api/shared";
import { getMeAluno } from "../../services/api/aluno";

export default {
    name: "Vaga",
    components: {
        Header,
        AsideDashboard,
        Footer,
    },
    data() {
        return {
            vaga: {
                requisitos: "[]",
                beneficios: "[]",
            },
            aluno: {
                email: "",
                token: "",
            },
            situacao: {
                DISPONIVEL: "Vaga disponível",
                INDISPONIVEL: "Vaga indisponível",
            },
        };
    },
    computed: {
        parsedRequisitos() {
            return JSON.parse(this.vaga.requisitos);
        },
        parsedBeneficios() {
            return JSON.parse(this.vaga.beneficios);
        },
    },
    methods: {
        async getVaga() {
            try {
                const response = await getVaga({ id: this.$route.params.id });
                if (response.status >= 200 && response.status < 300) {
                    this.vaga = response.data.vaga;
                } else {
                    console.error(
                        "Erro ao recuperar os dados da vaga:",
                        response.message,
                    );
                }
            } catch (error) {
                console.error(
                    "Erro ao recuperar os dados da vaga:",
                    error.message,
                );
            }
        },
        async testAluno() {
            this.aluno.token = Cookies.get("token");

            if (this.aluno.token) {
                const responseMail = await getMeAluno(this.aluno.token);
                if (responseMail.status >= 200 && responseMail.status < 300) {
                    this.aluno.email = responseMail.data.email;
                } else {
                    console.log("Erro ao buscar aluno");
                }
            } else {
                console.log("Token de aluno não encontrado");
            }
        },
    },
    async created() {
        await this.testAluno();
        await this.getVaga();
    },
};
</script>

<style lang="scss" scoped>
@import "../../scss/pages/shared/_vaga.scss";
</style>
