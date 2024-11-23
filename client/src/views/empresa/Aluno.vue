<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard />
            <div class="content">
                <div class="capa">
                    <div class="capaProfile">
                        <img v-if="aluno.bannerUrl == 'default'" src="../../assets/imgs/defaultBanner.png" alt="Capa">
                        <img v-else :src="aluno.bannerUrl" alt="Capa">
                    </div>
                    <div class="infoProfile">
                        <img v-if="aluno.imageUrl == 'default'" src="../../assets/icons/artwork.png" :alt="aluno.nome">
                        <img v-else :src="aluno.imageUrl" :alt="aluno.nome">
                        <div class="info">
                            <div class="box1">
                                <h1 v-text="aluno.nome"></h1>
                            </div>
                            <div class="box2">
                                <p v-text="aluno.idade"></p>
                                <p v-text="JSON.parse(aluno.endereco).municipio + ', ' + JSON.parse(aluno.endereco).estado"></p>
                                <router-link :to="'/empresa/mensagens/aluno/' + aluno.email">Entre em contato</router-link>

                            </div>
                        </div>
                    </div>
                </div>
                <section class="sobreMim">
                    <h2>Sobre mim</h2>
                    <div>
                        <p v-html="aluno.curriculo"></p>
                    </div>
                </section>
                <section class="extracurriculares">
                    <h2>Atividades Extracurriculares</h2>

                    <div class="activities">
                        <div v-for="(activity, index) in aluno.extracurriculares" :key="activity.id" class="activity">
                            <div>
                                <p><strong>Instituição:</strong> {{ activity.instituicao }}</p>
                                <p><strong>Descrição:</strong> {{ activity.descricao }}</p>
                                <p><strong>Início:</strong> {{ formatDate(activity.inicio) }}</p>
                                <p><strong>Fim:</strong> {{ formatDate(activity.fim) }}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/empresa/Header.vue';
import Footer from '../../components/Footer.vue';

import router from '../../router/index.js'
import Cookies from 'js-cookie';
import {
    getCurriculo,
    getImage,
    getBanner,
    getExtracurriculares,
} from '../../services/api/shared';
import {
    getVinculosAluno,
    getVinculosProfileAluno,
    getMeAluno,
    sendVinculoSolicitationAluno,
    acceptVinculoAluno,
    removeVinculoAluno,
    rejectVinculoAluno
} from '../../services/api/aluno';
import { socket } from '../../socket.js';

import { getVinculosProfessor } from '../../services/api/professor';
import AsideDashboard from '../../components/empresa/AsideDashboard.vue';

export default {
    name: 'PublicPerfilAluno',
    components: {
        Header,
        AsideDashboard,
        Footer
    },
    data() {
        return {
            visualizador: {
                conected: false,
                semiconectado: false,
                situacao: '',
                token: '',
                isOwner: false,
                email: ''
            },
            aluno: {
                rm: '',
                nome: '',
                endereco: '',
                nascimento: '',
                idade: '',
                curriculo: '',
                curriculoEdit: '',
                imgUrl: '../../assets/img/defaultImage.png',
                bannerUrl: 'default',
                extracurriculares: []
            },
            mode: 'view'
        };
    },
    methods: {
        async getCurriculoAluno() {
            try {
                const response = await getCurriculo({
                    rm: this.aluno.rm
                });

                if (response.status >= 200 && response.status < 300) {
                    this.aluno.curriculo = response.data.curriculo.replace(/\n/g, '<br>');
                    this.aluno.endereco = response.data.endereco;
                    this.aluno.nascimento = response.data.nascimento;
                    this.aluno.email = response.data.email;
                    this.calcularIdade(this.aluno.nascimento);
                    this.aluno.nome = response.data.nome;
                } else {
                    // router.push({path: "/notfound"});
                }
            } catch (error) {
                // router.push({path: "/notfound"});
            }

            try {
                const response = await getImage({
                    identifier: "ALUNO",
                    email: this.aluno.email
                });

                const responseBanner = await getBanner({
                    identifier: "ALUNO",
                    email: this.aluno.email
                });

                if (response.status >= 200 && response.status < 300) {
                    this.aluno.imageUrl = response.data.url;
                }

                if (responseBanner.status >= 200 && responseBanner.status < 300) {
                    this.aluno.bannerUrl = responseBanner.data.url;
                }
            } catch (error) {
                router.push({ path: "/notfound" });
            }
        },
        calcularIdade(nascimento) {
            const hoje = new Date();
            const dataNascimento = new Date(nascimento);

            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            const mesAtual = hoje.getMonth() + 1;
            const mesNascimento = dataNascimento.getMonth() + 1;

            if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())) {
                idade--;
            }

            this.aluno.idade = "" + idade + " anos";
        },
        async fetchExtracurriculares() {
            try {
                const response = await getExtracurriculares(this.aluno.rm);
                if (response.status >= 200 && response.status < 300) {
                    this.aluno.extracurriculares = response.data;
                } else {
                    alert("Ops.. Algo deu errado ao carregar as atividades extracurriculares. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Ocorreu um erro ao carregar as atividades extracurriculares. 😕\n" + error.message);
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('pt-BR');
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
    async created() {
        this.aluno.rm = this.$route.params.rm;
        await this.getCurriculoAluno();
        await this.fetchExtracurriculares();
    }
};

</script>

<style lang="scss" scoped>
@import "../../scss/pages/shared/_perfilAluno.scss";
</style>