<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="profile" />
            <div class="content">
                <div class="capa">
                    <div class="capaProfile">
                        <img v-if="professor.bannerUrl == 'default'" src="../../assets/imgs/defaultBanner.png" alt="Capa" />
                        <img v-else :src="professor.bannerUrl" alt="Capa" />
                        <div class="capaEdit editButtons">
                            <button v-show="modeBanner === 'view'" @click="editModeBanner" type="button">
                                <img :src="imgLapis" alt="" />Editar
                            </button>
                            <div class="inputUpload" v-show="modeBanner === 'edit'">
                                <input type="file" ref="bannerInput" @change="previewBannerImage" />
                                <img src="../../assets/icons/envio.png" alt="" />
                            </div>
                            <button v-show="modeBanner === 'edit' &&
                                $refs.bannerInput.value != []
                                " @click="updateBannerImage" type="button">
                                <img :src="imgVerificar" />Salvar
                            </button>
                            <button v-show="modeBanner === 'edit'" @click="cancelBanner" type="button">
                                <img :src="imgCruz" />Cancelar
                            </button>
                        </div>
                    </div>
                    <div class="infoProfile">
                        <img v-if="professor.imageUrl == 'default'" src="../../assets/icons/artwork.png" />
                        <img v-else :src="professor.imageUrl" />
                        <div class="inputUpload" v-show="modeImage === 'edit'">
                            <input type="file" ref="profileInput" v-show="modeImage === 'edit'"
                                @change="previewProfileImage" />
                            <img src="../../assets/icons/envio.png" alt="" />
                        </div>
                        <div class="editButtons">
                            <button v-show="modeImage === 'view'" @click="editModeImage" type="button">
                                <img :src="imgLapis" alt="" />Editar
                            </button>
                            <button v-show="modeImage === 'edit' &&
                                $refs.profileInput.value != []
                                " @click="updateProfileImage" type="button">
                                <img :src="imgVerificar" />Salvar
                            </button>
                            <button v-show="modeImage === 'edit'" @click="cancelImage" type="button">
                                <img :src="imgCruz" />Cancelar
                            </button>
                        </div>
                        <div class="info">
                            <div class="box1">
                                <h1 v-text="professor.nome"></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="sobreMim">
                    <h2>
                        Sobre mim 
                        <div id="getCurriculo">
                            <button @click="GetCurriculoFile" v-if="linkstatus == 0">Gerar Currículo</button>
                            <p v-if="linkstatus == 1">Gerando currículo</p>
                            <p v-if="linkstatus == 2">Currículo gerado</p>
                            <a v-if="linkstatus == 2">
                                <button @click="downloadFile">Baixar</button>
                            </a>
                        </div>
                    </h2>
                    <div>
                        <p v-show="mode === 'view'" v-html="professor.curriculo"></p>
                        <textarea v-show="mode === 'edit'" name="" cols="30" rows="10" id="edit"
                            v-model="professor.curriculoEdit" ref="edit"></textarea>
                        <div class="editButtons">
                            <button v-show="mode === 'view'" @click="editMode" type="button">
                                <img :src="imgLapis" alt="" />Editar
                            </button>
                            <button v-show="mode === 'edit'" @click="updateCurriculoSubmit" type="button">
                                <img :src="imgVerificar" />Salvar
                            </button>
                            <button v-show="mode === 'edit'" @click="cancel" type="button">
                                <img :src="imgCruz" />Cancelar
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from "../../components/professor/Header.vue";
import AsideDashboard from "../../components/professor/AsideDashboard.vue";
import {
    getCurriculo,
    updateCurriculo,
    updateBanner,
    updateImage,
} from "../../services/api/professor";
import { getImage, getBanner } from "../../services/api/shared";
import { mixinProfessor } from "../../util/authMixins";
import imgLapis from "../../assets/icons/lapis.png";
import imgVerificar from "../../assets/icons/verificar.png";
import imgCruz from "../../assets/icons/cruz.png";

export default {
    name: "PerfilProfessor",
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            professor: {
                nome: "",
                email: "",
                curriculo: "",
                curriculoEdit: "",
                token: "",
                imgUrl: "../../assets/img/defaultImage.png",
                bannerUrl: "default",
            },
            file: "",
            fileSelected: false,
            linkstatus: 0,
            mode: "view",
            modeImage: "view",
            modeBanner: "view",
            imgLapis,
            imgVerificar,
            imgCruz,
        };
    },
    methods: {
        async updateCurriculoSubmit() {
            const response = await updateCurriculo(
                {
                    curriculo: this.professor.curriculoEdit,
                },
                this.professor.token,
            );

            if (response.status >= 200 && response.status < 300) {
                alert("Informações alteradas com sucesso! 😉");
            } else {
                alert(
                    'Ops.. Algo deu errado ao alterar o campo "sobre mim". 😕\n' +
                    response.message,
                );
            }

            await this.getCurriculoProfessor();
            this.editMode();
        },
        editMode() {
            if (this.mode === "view") {
                this.mode = "edit";
                this.modeImage = "view";
                this.modeBanner = "view";
            } else {
                this.mode = "view";
            }
        },
        editModeImage() {
            if (this.modeImage === "view") {
                this.modeImage = "edit";
                this.mode = "view";
                this.modeBanner = "view";
            } else {
                this.modeImage = "view";
            }
        },
        editModeBanner() {
            if (this.modeBanner === "view") {
                this.modeBanner = "edit";
                this.mode = "view";
                this.modeImage = "view";
            } else {
                this.modeBanner = "view";
            }
        },
        async cancel() {
            await this.getCurriculoProfessor();
            this.editMode();
        },
        async cancelImage() {
            await this.getCurriculoProfessor();
            this.$refs.profileInput.value = [];
            this.editModeImage();
        },
        async cancelBanner() {
            await this.getCurriculoProfessor();
            this.$refs.bannerInput.value = [];
            this.editModeBanner();
        },
        async getCurriculoProfessor() {
            const response = await getCurriculo(this.professor.token);

            try {
                if (response.status >= 200 && response.status < 300) {
                    this.professor.curriculo = response.data.curriculo.replace(
                        /\n/g,
                        "<br>",
                    );
                    this.professor.curriculoEdit = response.data.curriculo;
                    this.professor.nome = response.data.nome;
                    this.professor.email = response.data.email;
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
                    email: this.professor.email,
                });

                if (response.status >= 200 && response.status < 300) {
                    this.professor.imageUrl = response.data.url;
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

            try {
                const responseBanner = await getBanner({
                    identifier: "ALUNO",
                    email: this.professor.email,
                });

                if (
                    responseBanner.status >= 200 &&
                    responseBanner.status < 300
                ) {
                    this.professor.bannerUrl = responseBanner.data.url;
                } else {
                    console.log(
                        "Ops.. Algo deu errado ao recuperar a imagem de capa do perfil. 😕\n" +
                        responseBanner.message,
                    );
                }
            } catch (error) {
                console.log(
                    "Ops.. Algo deu errado ao recuperar a imagem do banner. 😕\n" +
                    error,
                );
            }
        },
        async updateProfileImage() {
            const file = this.$refs.profileInput.files[0];
            if (!file) return;

            const response = await updateImage(file, this.professor.token);

            if (response.status >= 200 && response.status < 300) {
                alert("Imagem de perfil atualizada com sucesso! 😉");

                this.linkstatus = 0;

                await this.getCurriculoProfessor();
            } else {
                alert(
                    "Ops.. Algo deu errado ao atualizar a imagem de perfil. 😕\n" +
                    response.message,
                );
            }

            this.$refs.profileInput.value = "";

            await this.getCurriculoProfessor();
            this.editModeImage();
        },
        async updateBannerImage() {
            const file = this.$refs.bannerInput.files[0];
            if (!file) return;

            const response = await updateBanner(file, this.professor.token);

            if (response.status >= 200 && response.status < 300) {
                alert("Imagem do banner atualizada com sucesso! 😉");
                await this.getCurriculoProfessor();
            } else {
                alert(
                    "Ops.. Algo deu errado ao atualizar a imagem do banner. 😕\n" +
                    response.message,
                );
            }

            this.$refs.bannerInput.value = "";

            await this.getCurriculoProfessor();
            this.editModeBanner();
        },
        previewProfileImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.professor.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        previewBannerImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.professor.bannerUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        async getData() {
            const response = await getCurriculo(this.professor.token);

            try {
                if (response.status >= 200 && response.status < 300) {
                    this.professor.curriculo = response.data.curriculo.replace(
                        /\n/g,
                        "<br>",
                    );
                    this.professor.curriculoEdit = response.data.curriculo;
                    this.professor.nome = response.data.nome;
                    this.professor.email = response.data.email;
                    this.professor.quantidadeVinculos = response.data.quantidadeVinculos;
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
                    email: this.professor.email,
                });

                if (response.status >= 200 && response.status < 300) {
                    this.professor.imageUrl = response.data.url;
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
        formatDate(date) {
            return new Date(date).toLocaleDateString("pt-BR");
        },
    },
    mixins: [mixinProfessor],
    async created() {
        this.getToken();
        await this.getCurriculoProfessor();
    },
};
</script>

<style lang="scss" scoped>
@import "../../scss/pages/aluno/_profile.scss";

#app {
    display: flex;
    flex-direction: column;
}
</style>
