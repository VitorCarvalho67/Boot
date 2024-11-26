<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="" />
            <div class="content">
                <div class="capa">
                    <div class="capaProfile">
                        <img :src="professor.bannerUrl || '../../assets/imgs/defaultBanner.png'" alt="Capa" />
                    </div>
                    <div class="infoProfile">
                        <img :src="professor.imageUrl || '../../assets/icons/artwork.png'" />
                        <div class="info">
                            <div class="box1">
                                <h1 v-text="professor.nome"></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="sobreMim">
                    <h2>Sobre mim</h2>
                    <div>
                        <p v-show="mode === 'view'" v-text="formattedCurriculo"></p>
                    </div>
                </section>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue';
import { getProfessor, getImage, getBanner } from "../../services/api/shared";

export default {
    name: "AlunoPerfilProfessor",
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
                imgUrl: "",
                bannerUrl: "",
            },
            mode: "view",
        };
    },
    computed: {
        formattedCurriculo() {
            return this.professor.curriculo.replace(/\n/g, "<br>");
        },
    },
    methods: {
        async fetchImageData(apiMethod, identifier, email) {
            try {
                const response = await apiMethod({ identifier, email });
                return response.status >= 200 && response.status < 300 ? response.data.url : null;
            } catch {
                return null;
            }
        },
        async getCurriculoProfessor() {
            try {
                const response = await getProfessor(this.professor.email);
                console.log(response.data)
                if (response.status >= 200 && response.status < 300) {
                    this.professor.curriculo = response.data.curriculo || "";
                    this.professor.nome = response.data.nome || "";
                    this.professor.email = response.data.email || "";
                }
            } catch (error) {
                console.error("Erro ao recuperar os dados do professor:", error);
            }

            this.professor.imageUrl = await this.fetchImageData(getImage, "PROFESSOR", this.professor.email) || "../../assets/icons/artwork.png";
            this.professor.bannerUrl = await this.fetchImageData(getBanner, "PROFESSOR", this.professor.email) || "../../assets/imgs/defaultBanner.png";
        },
    },
    async created() {
        this.professor.email = this.$route.params.email;
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
