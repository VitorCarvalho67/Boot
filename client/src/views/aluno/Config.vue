<template>
    <Header />
    <main>
        <AsideDashboard pageName="config" />
        <div class="content">
            <div class="box" id="box1">
                <H1>Suas informações</H1>
                <ul>
                    <li>
                        <bold>Email</bold>
                        <p v-text="aluno.email"></p>
                    </li>
                    <li>
                        <bold>Registro de Matrícula</bold>
                        <p v-text="aluno.rm"></p>
                    </li>
                    <li>
                        <bold>Endereço</bold>
                        <p v-text="aluno.endereco"></p>
                    </li>
                    <li>
                        <bold>Nascimento</bold>
                        <p v-text="aluno.nascimento"></p>
                    </li>
                    <li>
                        <bold>Vinculos</bold>
                        <router-link to="/rede">3 vínculos</router-link>
                    </li>
                </ul>
            </div>
            <div class="box" id="box2">
                <router-link to="/aluno/me" class="profile">
                    <img :src="aluno.imageUrl" :alt="aluno.nome">
                    <div class="info">
                        <h3 v-text="aluno.nome"></h3>
                        <p v-text="aluno.idade"></p>
                        <p v-text="aluno.endereco"></p>
                    </div>
                </router-link>
            </div>
            <div class="inputUpload">
                <p>Anexo suas notas aqui enviando um boletim</p>
                <input type="file" ref="boletimInput">
                <button @click="sendBoletim" type="button">
                    <img :src="imgVerificar">Salvar
                </button>
            </div>
        </div>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue'
import Footer from '../../components/Footer.vue';

import {
    getCurriculo,
    sendBoletim
} from '../../services/api/aluno';
import {
    getImage,
} from '../../services/api/shared';

import imgVerificar from '../../assets/icons/verificar.png';

import { mixinAluno } from '../../util/authMixins.js';


export default {
    name: 'ConfigAluno',
    components: {
        Header,
        AsideDashboard,
        Footer
    },
    data() {
        return {
            aluno: {
                token: '',
                nome: '',
                endereco: '',
                nascimento: '',
                idade: '',
                email: '',
                curriculo: '',
                curriculoEdit: '',
                imgUrl: '../../assets/img/defaultImage.png',
                bannerUrl: '../../assets/img/defaultBanner.png',
            }
        }
    },
    methods:{
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
        async getData() {
            const response = await getCurriculo(this.aluno.token);

            try {
                if (response.status >= 200 && response.status < 300) {
                    this.aluno.curriculo = response.data.curriculo.replace(/\n/g, '<br>');
                    this.aluno.curriculoEdit = response.data.curriculo;
                    this.aluno.endereco = response.data.endereco;
                    this.aluno.nascimento = response.data.nascimento;
                    this.calcularIdade(this.aluno.nascimento);
                    this.aluno.nascimento = this.aluno.nascimento.split('T')[0].split('-').reverse().join('/');
                    this.aluno.nome = response.data.nome;
                    this.aluno.email = response.data.email;
                    this.aluno.rm = response.data.rm;
                } else {
                    alert("Ops.. Algo deu errado ao recuperar os dados. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao recuperar os dados. 😕\n" + error);
            }

            try {
                const response = await getImage({
                    identifier: "ALUNO",
                    email: this.aluno.email
                });

                if (response.status >= 200 && response.status < 300) {
                    this.aluno.imageUrl = response.data.url;
                } else {
                    console.log("Ops.. Algo deu errado ao recuperar a imagem. 😕\n" + response.message);
                }
            } catch (error) {
                console.log("Ops.. Algo deu errado ao recuperar a imagem de perfil. 😕\n" + error);
            }
        },
        async sendBoletim(){
            const file = this.$refs.boletimInput.files[0];
            if (!file) return;

            const response = await sendBoletim(file, this.aluno.token);

            if (response.status >= 200 && response.status < 300) {
                alert("Notas carregadas com sucesso! 😉");
                await this.getCurriculoAluno();
            } else {
                alert("Ops.. Algo deu errado ao enviar notas. 😕\n" + response.message);
            }

            this.$refs.boletimInput.value = '';
        }
    },
    mixins: [mixinAluno],
    async created() {
        this.getToken();
        this.RefreshToken();
        this.getData();
    }
}

</script>
<style lang="scss" scoped>
@import "../../scss/pages/aluno/_home.scss";
</style>