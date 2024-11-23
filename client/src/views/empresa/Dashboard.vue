<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <div class="content">
                    <div class="capa">
                        <div class="capaProfile">
                            <img v-if="empresa.banner == 'default'" src="../../assets/imgs/defaultBanner.png"
                                alt="Capa" />
                            <img v-else :src="empresa.banner" alt="Capa" />
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
                            <img v-if="empresa.imagem == 'default'" src="../../assets/icons/artwork.png" />
                            <img v-else :src="empresa.imagem" />
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
                                    <h1 v-text="empresa.nome"></h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section class="sobreMim">
                    <h2>
                        Sobre a Empresa
                    </h2>
                    <div>
                        CNPJ: {{empresa.cnpj}}
                        Email: {{empresa.email}}
                        <p  v-show="mode === 'view'">Site: <a :href="empresa.site" target="_blanck">{{empresa.site}}</a></p>
                        <textarea v-show="mode === 'edit'" name="" cols="30" rows="10" id="edit"
                            v-model="empresa.siteSubmit" ref="edit"></textarea>
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
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/empresa/Header.vue';
import Footer from '../../components/Footer.vue';
import AsideDashboard from '../../components/empresa/AsideDashboard.vue';
import router from '../../router/index.js'
import { mixinEmpresa } from '../../util/authMixins.js';

import imgLapis from "../../assets/icons/lapis.png";
import imgVerificar from "../../assets/icons/verificar.png";
import imgCruz from "../../assets/icons/cruz.png";

import { getEmpresa } from '../../services/api/shared.js';

import Cookies from 'js-cookie';
import { updateBanner, updateImage, updateSite } from '../../services/api/empresa.js';

export default {
    name: 'Empresa',
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
            extracurriculares: [],
            showAddForm: false,
        }
    },
    methods: {
        async GetEmpresa(){
            try {
                const response = await getEmpresa(this.empresa.email);
                if (response.status >= 200 && response.status < 300) {
                    this.empresa = response.data;

                    this.empresa.siteSubmit = response.data.site;

                } else {
                    console.error(
                        "Erro ao carregar dados da empresa",
                        response.message,
                    );
                }
            } catch (error) {
                console.error(
                    "Erro ao carregar dados da empresa",
                    error.message,
                );
            }
        },
        async updateCurriculoSubmit() {
            this.getToken();

            const response = await updateSite(
                {
                    site: this.empresa.siteSubmit,
                },
                this.empresa.token,
            );

            if (response.status >= 200 && response.status < 300) {
                alert("Informações alteradas com sucesso! 😉");
            } else {
                alert(
                    'Ops.. Algo deu errado ao alterar o campo "site". 😕\n' +
                    response.message,
                );
            }

            await this.getEmpresa();
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
            await this.GetEmpresa();
            this.editMode();
        },
        async cancelImage() {
            await this.GetEmpresa();
            this.$refs.profileInput.value = [];
            this.editModeImage();
        },
        async cancelBanner() {
            await this.GetEmpresa();
            this.$refs.bannerInput.value = [];
            this.editModeBanner();
        },
        async updateProfileImage() {
            this.getToken();

            const file = this.$refs.profileInput.files[0];
            if (!file) return;

            console.log("Token para requisição: " + this.empresa.token)

            const response = await updateImage(file, this.empresa.token);


            if (response.status >= 200 && response.status < 300) {
                alert("Imagem de perfil atualizada com sucesso! 😉");

                this.linkstatus = 0;

                await this.GetEmpresa();
            } else {
                alert(
                    "Ops.. Algo deu errado ao atualizar a imagem de perfil. 😕\n" +
                    response.message,
                );
            }

            this.$refs.profileInput.value = "";

            await this.GetEmpresa();
            this.editModeImage();
        },
        async updateBannerImage() {
            this.getToken();

            const file = this.$refs.bannerInput.files[0];
            if (!file) return;

            console.log("Token para requisição: " + this.empresa.token)

            const response = await updateBanner(file, this.empresa.token);

            if (response.status >= 200 && response.status < 300) {
                alert("Imagem do banner atualizada com sucesso! 😉");
                await this.GetEmpresa();
            } else {
                alert(
                    "Ops.. Algo deu errado ao atualizar a imagem do banner. 😕\n" +
                    response.message,
                );
            }

            this.$refs.bannerInput.value = "";

            await this.GetEmpresa();
            this.editModeBanner();
        },
        previewProfileImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.empresa.imagem = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        previewBannerImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.empresa.banner = e.target.result;
            };
            reader.readAsDataURL(file);
        },
    },
    mixins: [mixinEmpresa],
    async created() {
        this.getToken();

        console.log("Token após getToken: " + this.empresa.token)

        this.empresa.email = Cookies.get('email-empresa');

        this.GetEmpresa();
    }
}
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
            padding: 20px;
            overflow-y: auto;
            height: 100%;

            @media (max-width: 1000px) {
                width: calc(100% - 100px);
            }
        }
    }
}
</style>