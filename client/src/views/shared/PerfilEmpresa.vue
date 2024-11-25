<template>
    <Header />
    <div id="app">
        <main>
            <div class="content">
                <div class="content">
                    <div class="capa">
                        <div class="capaProfile">
                            <img v-if="empresa.banner == 'default'" src="../../assets/imgs/defaultBanner.png"
                                alt="Capa" />
                            <img v-else :src="empresa.banner" alt="Capa" />
                        </div>
                        <div class="infoProfile">
                            <img v-if="empresa.imagem == 'default'" src="../../assets/icons/artwork.png" />
                            <img v-else :src="empresa.imagem" />
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
                    </div>
                </section>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
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
    name: 'PublicPerfilEmpresa',
    components: {
        Header,
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
    async created() {
        this.empresa.email = this.$route.params.email;
        await this.GetEmpresa(this.empresa.email);
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