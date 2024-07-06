<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="profile" />
            <div class="content">
                <div class="capa">
                    <div class="capaProfile">
                        <img v-if="aluno.bannerUrl == 'default'" src="../../assets/imgs/defaultBanner.png" alt="Capa">
                        <img v-else :src="aluno.bannerUrl" alt="Capa">
                        <div class="capaEdit editButtons">
                            <button v-show="modeBanner === 'view'" @click="editModeBanner" type="button">
                                <img :src="imgLapis" alt="">Editar
                            </button>
                            <div class="inputUpload" v-show="modeBanner === 'edit'">
                                <input type="file" ref="bannerInput" @change="previewBannerImage">
                                <img src="../../assets/icons/envio.png" alt="">
                            </div>
                            <button v-show="modeBanner === 'edit'" @click="updateBannerImage" type="button">
                                <img :src="imgVerificar">Salvar
                            </button>
                            <button v-show="modeBanner === 'edit'" @click="cancelBanner" type="button">
                                <img :src="imgCruz">Cancelar
                            </button>
                        </div>
                    </div>
                    <div class="infoProfile">
                        <img v-if="aluno.imageUrl == 'default'" src="../../assets/icons/artwork.png" :alt="aluno.nome">
                        <img v-else :src="aluno.imageUrl" :alt="aluno.nome">
                        <div class="editButtons">
                            <button v-show="modeImage === 'view'" @click="editModeImage" type="button">
                                <img :src="imgLapis" alt="">Editar
                            </button>
                            <input type="file" ref="profileInput" v-show="modeImage === 'edit'">
                            <button v-show="modeImage === 'edit'" @click="updateProfileImage" type="button">
                                <img :src="imgVerificar">Salvar
                            </button>
                            <button v-show="modeImage === 'edit'" @click="cancelImage" type="button">
                                <img :src="imgCruz">Cancelar
                            </button>
                        </div>
                        <div class="info">
                            <div class="box1">
                                <h1 v-text="aluno.nome"></h1>
                            </div>
                            <div class="box2">
                                <p v-text="aluno.idade"></p>
                                <p v-text="aluno.endereco"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="sobreMim">
                    <h2>Sobre mim</h2>
                    <div>
                        <p v-show="mode === 'view'" v-html="aluno.curriculo"></p>
                        <textarea v-show="mode === 'edit'" name="" cols="30" rows="10" id="edit"
                            v-model="aluno.curriculoEdit" ref="edit"></textarea>
                        <div class="editButtons">
                            <button v-show="mode === 'view'" @click="editMode" type="button">
                                <img :src="imgLapis" alt="">Editar
                            </button>
                            <button v-show="mode === 'edit'" @click="updateCurriculoSubmit" type="button">
                                <img :src="imgVerificar">Salvar
                            </button>
                            <button v-show="mode === 'edit'" @click="cancel" type="button">
                                <img :src="imgCruz">Cancelar
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
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue';
import {
    getCurriculo,
    updateCurriculo,
    updateBanner,
    updateImage,
} from '../../services/api/aluno';
import {
    getImage,
    getBanner
} from '../../services/api/shared';
import { mixinAluno } from '../../util/authMixins';
import imgLapis from '../../assets/icons/lapis.png';
import imgVerificar from '../../assets/icons/verificar.png';
import imgCruz from '../../assets/icons/cruz.png';

export default {
    name: 'PerfilAluno',
    components: {
        Header,
        Footer,
        AsideDashboard
    },
    data() {
        return {
            aluno: {
                nome: '',
                endereco: '',
                nascimento: '',
                idade: '',
                email: '',
                curriculo: '',
                curriculoEdit: '',
                imgUrl: 'default',
                bannerUrl: 'default',
            },
            mode: 'view',
            modeImage: 'view',
            modeBanner: 'view',
            imgLapis,
            imgVerificar,
            imgCruz
        };
    },
    methods: {
        async updateCurriculoSubmit() {
            const response = await updateCurriculo({
                curriculo: this.aluno.curriculoEdit
            }, this.aluno.token);

            if (response.status >= 200 && response.status < 300) {
                alert("Informações alteradas com sucesso! 😉");
            } else {
                alert("Ops.. Algo deu errado ao alterar o campo \"sobre mim\". 😕\n" + response.message);
            }

            await this.getCurriculoAluno();
            this.editMode();
        },
        editMode() {
            if (this.mode === 'view') {
                this.mode = 'edit';
                this.modeImage = 'view';
                this.modeBanner = 'view';
            } else {
                this.mode = 'view';
            }
        },
        editModeImage() {
            if (this.modeImage === 'view') {
                this.modeImage = 'edit';
                this.mode = 'view';
                this.modeBanner = 'view';
            } else {
                this.modeImage = 'view';
            }
        },
        editModeBanner() {
            if (this.modeBanner === 'view') {
                this.modeBanner = 'edit';
                this.mode = 'view';
                this.modeImage = 'view';
            } else {
                this.modeBanner = 'view';
            }
        },
        async cancel() {
            await this.getCurriculoAluno();
            this.editMode();
        },
        async cancelImage() {
            this.editModeImage();
        },
        async cancelBanner() {
            this.editModeBanner();
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
        async getCurriculoAluno() {
            const response = await getCurriculo(this.aluno.token);

            try {
                if (response.status >= 200 && response.status < 300) {
                    this.aluno.curriculo = response.data.curriculo.replace(/\n/g, '<br>');
                    this.aluno.curriculoEdit = response.data.curriculo;
                    this.aluno.endereco = response.data.endereco;
                    this.aluno.nascimento = response.data.nascimento;
                    this.calcularIdade(this.aluno.nascimento);
                    this.aluno.nome = response.data.nome;
                    this.aluno.email = response.data.email;
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

            try {
                const responseBanner = await getBanner({
                    identifier: "ALUNO",
                    email: this.aluno.email
                });

                if (responseBanner.status >= 200 && responseBanner.status < 300) {
                    this.aluno.bannerUrl = responseBanner.data.url;
                } else {
                    console.log("Ops.. Algo deu errado ao recuperar a imagem de capa do perfil. 😕\n" + responseBanner.message);
                }
            } catch (error) {
                console.log("Ops.. Algo deu errado ao recuperar a imagem do banner. 😕\n" + error);
            }
        },
        async updateProfileImage() {
            const file = this.$refs.profileInput.files[0];
            if (!file) return;

            const response = await updateImage(file, this.aluno.token);

            if (response.status >= 200 && response.status < 300) {
                alert("Imagem de perfil atualizada com sucesso! 😉");
                await this.getCurriculoAluno();
            } else {
                alert("Ops.. Algo deu errado ao atualizar a imagem de perfil. 😕\n" + response.message);
            }

            this.$refs.profileInput.value = '';

            await this.getCurriculoAluno();
            this.editModeImage();
        },
        async updateBannerImage() {
            const file = this.$refs.bannerInput.files[0];
            if (!file) return;

            const response = await updateBanner(file, this.aluno.token);

            if (response.status >= 200 && response.status < 300) {
                alert("Imagem do banner atualizada com sucesso! 😉");
                await this.getCurriculoAluno();
            } else {
                alert("Ops.. Algo deu errado ao atualizar a imagem do banner. 😕\n" + response.message);
            }

            this.$refs.bannerInput.value = '';

            await this.getCurriculoAluno();
            this.editModeBanner();
        },
        previewBannerImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
                this.aluno.bannerUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    },
    mixins: [mixinAluno],
    async created() {
        this.getToken();
        await this.getCurriculoAluno();
    }
};
</script>

<style lang="scss" scoped>
@import "../../scss/pages/aluno/_profile.scss";
</style>