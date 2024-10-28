<template>
    <Header />
    <main>
        <AsideDashboard pageName="config" />
        <div class="content">
            <div class="box" id="box1">
                <H1>Configurações</H1>
                <h2 class="title">
                    Configure seu perfil e veja suas informações
                </h2>

                <h3>Envio de boletim</h3>

                <div class="inputUpload">
                    <p v-if="!fileSelected" v-text="'Anexe suas notas aqui enviando um boletim'"></p>
                    <p v-else v-text="file.name"></p>
                    <input type="file" ref="boletimInput" @change="checkFile" />
                    <button
                        @click="SendBoletim"
                        type="button"
                        v-if="fileSelected"
                    >
                        <img :src="imgVerificar" />Salvar
                    </button>
                </div>

                <h3>Seus dados</h3>

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
                        <router-link to="/rede">{{aluno.quantidadeVinculos}} {{(aluno.quantidadeVinculos > 1) ? "vínculos" : "vínculo"}}</router-link>
                    </li>
                </ul>

                <button class="logout" @click="logout"><img src="../../assets/icons/saida.png" alt="">Logout</button>
            </div>
            <div class="box" id="box2">
                <router-link to="/aluno/me" class="profile">
                    <img :src="aluno.imageUrl" />
                    <div class="info">
                        <h3 v-text="aluno.nome"></h3>
                        <p v-text="aluno.idade"></p>
                        <p v-text="aluno.endereco"></p>
                    </div>
                </router-link>
            </div>
        </div>
    </main>
    <Footer />
</template>

<script>
import Header from "../../components/aluno/Header.vue";
import AsideDashboard from "../../components/aluno/AsideDashboard.vue";
import Footer from "../../components/Footer.vue";

import { getCurriculo, sendBoletim } from "../../services/api/aluno";
import { getImage } from "../../services/api/shared";

import imgVerificar from "../../assets/icons/verificar.png";

import { mixinAluno } from "../../util/authMixins.js";

export default {
    name: "ConfigAluno",
    components: {
        Header,
        AsideDashboard,
        Footer,
    },
    data() {
        return {
            aluno: {
                token: "",
                nome: "",
                endereco: "",
                nascimento: "",
                idade: "",
                email: "",
                curriculo: "",
                curriculoEdit: "",
                imgUrl: "../../assets/img/defaultImage.png",
                bannerUrl: "../../assets/img/defaultBanner.png",
            },
            file: "",
            fileSelected: false,
        };
    },
    methods: {
        calcularIdade(nascimento) {
            const hoje = new Date();
            const dataNascimento = new Date(nascimento);

            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            const mesAtual = hoje.getMonth() + 1;
            const mesNascimento = dataNascimento.getMonth() + 1;

            if (
                mesAtual < mesNascimento ||
                (mesAtual === mesNascimento &&
                    hoje.getDate() < dataNascimento.getDate())
            ) {
                idade--;
            }

            this.aluno.idade = "" + idade + " anos";
        },
        async getData() {
            const response = await getCurriculo(this.aluno.token);

            try {
                if (response.status >= 200 && response.status < 300) {
                    this.aluno.curriculo = response.data.curriculo.replace(
                        /\n/g,
                        "<br>",
                    );
                    this.aluno.curriculoEdit = response.data.curriculo;
                    this.aluno.endereco = response.data.endereco;
                    this.aluno.nascimento = response.data.nascimento;
                    this.calcularIdade(this.aluno.nascimento);
                    this.aluno.nascimento = this.aluno.nascimento
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/");
                    this.aluno.nome = response.data.nome;
                    this.aluno.email = response.data.email;
                    this.aluno.rm = response.data.rm;
                    this.aluno.quantidadeVinculos = response.data.quantidadeVinculos;
                } else {
                    alert(
                        "Ops.. Algo deu errado ao recuperar os dados. 😕\n" +
                            response.message,
                    );
                }
            } catch (error) {
                alert(
                    "Ops.. Algo deu errado ao recuperar os dados. 😕\n" + error,
                );
            }

            try {
                const response = await getImage({
                    identifier: "ALUNO",
                    email: this.aluno.email,
                });

                if (response.status >= 200 && response.status < 300) {
                    this.aluno.imageUrl = response.data.url;
                } else {
                    console.log(
                        "Ops.. Algo deu errado ao recuperar a imagem. 😕\n" +
                            response.message,
                    );
                }
            } catch (error) {
                console.log(
                    "Ops.. Algo deu errado ao recuperar a imagem de perfil. 😕\n" +
                        error,
                );
            }
        },
        async SendBoletim() {
            const file = this.$refs.boletimInput.files[0];
            console.log(file);
            if (!file) return;

            const response = await sendBoletim(file, this.aluno.token);

            if (response.status >= 200 && response.status < 300) {
                alert("Notas carregadas com sucesso! 😉");
                this.$refs.boletimInput.value = "";
                this.fileSelected = false;
            } else {
                alert(
                    "Ops.. Algo deu errado ao enviar notas. 😕\n" +
                        response.message,
                    );
                    this.fileSelected = false;
            }

        },
        checkFile() {
            this.fileSelected = this.$refs.boletimInput.files.length > 0;
            if(this.fileSelected) {
                this.file = this.$refs.boletimInput.files[0];
            };
        },
    },
    mixins: [mixinAluno],
    async created() {
        this.getToken();
        this.RefreshToken();
        this.getData();
    },
};
</script>
<style lang="scss" scoped>
@import "../../scss/pages/aluno/_config.scss";

#app {
    display: flex;
    flex-direction: column;
    height: 100vh;

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
