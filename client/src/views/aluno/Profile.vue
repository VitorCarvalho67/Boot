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
                            <button v-show="modeBanner === 'edit' && $refs.bannerInput.value != []"
                                @click="updateBannerImage" type="button">
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
                        <div class="inputUpload" v-show="modeImage === 'edit'">
                            <input type="file" ref="profileInput" v-show="modeImage === 'edit'"
                                @change="previewProfileImage">
                            <img src="../../assets/icons/envio.png" alt="">
                        </div>
                        <div class="editButtons">
                            <button v-show="modeImage === 'view'" @click="editModeImage" type="button">
                                <img :src="imgLapis" alt="">Editar
                            </button>
                            <button v-show="modeImage === 'edit' && $refs.profileInput.value != []"
                                @click="updateProfileImage" type="button">
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
                <section class="extracurriculares">
                    <h2>Atividades Extracurriculares</h2>
                    <button v-if="!showAddForm" @click="showAddForm = true">Adicionar Nova Atividade</button>

                    <div v-for="(activity, index) in extracurriculares" :key="activity.id" class="activity">
                        <div v-show="activity.editMode === 'view'">
                            <p><strong>Instituição:</strong> {{ activity.instituicao }}</p>
                            <p><strong>Descrição:</strong> {{ activity.descricao }}</p>
                            <p><strong>Início:</strong> {{ formatDate(activity.inicio) }}</p>
                            <p><strong>Fim:</strong> {{ formatDate(activity.fim) }}</p>

                            <button @click="toggleEditMode(activity, index)">Editar</button>
                            <button @click="confirmDelete(activity, index)">Excluir</button>
                        </div>

                        <div v-show="activity.editMode === 'edit'">
                            <div class="input-box">
                                <input v-model="activity.instituicao" placeholder="Instituição">
                            </div>
                            <div class="input-box">
                                <input v-model="activity.descricao" placeholder="Descrição">
                            </div>
                            <div class="input-box">
                                <input v-model="activity.inicio" type="date">
                            </div>
                            <div class="input-box">
                                <input v-model="activity.fim" type="date">
                            </div>

                            <div class="button-box">
                                <button @click="saveEdit(activity, index)">Salvar</button>
                                <button @click="cancelEdit(activity, index)">Cancelar</button>
                            </div>
                        </div>
                    </div>

                    <div v-if="showAddForm">
                        <div class="input-box">
                            <input v-model="newActivity.instituicao" placeholder="Instituição">
                        </div>
                        <div class="input-box">
                            <input v-model="newActivity.descricao" placeholder="Descrição">
                        </div>
                        <div class="input-box">
                            <input v-model="newActivity.inicio" type="date">
                        </div>
                        <div class="input-box">
                            <input v-model="newActivity.fim" type="date">
                        </div>

                        <div class="button-box">
                            <button @click="addNewActivity">Adicionar</button>
                            <button @click="cancelAdd">Cancelar</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/aluno/Header.vue';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue';
import {
    getCurriculo,
    updateCurriculo,
    updateBanner,
    updateImage,
    addExtracurricular,
    editExtracurricular,
    deleteExtracurricular,
    getExtracurriculares
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
            imgCruz,
            extracurriculares: [],
            showAddForm: false,
            newActivity: { instituicao: '', descricao: '', inicio: '', fim: '' },
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
            await this.getCurriculoAluno();
            this.$refs.profileInput.value = [];
            this.editModeImage();
        },
        async cancelBanner() {
            await this.getCurriculoAluno();
            this.$refs.bannerInput.value = [];
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
                    console.log("Pegando o banner do aluno");
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
        previewProfileImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
                this.aluno.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        previewBannerImage(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
                this.aluno.bannerUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        async fetchExtracurriculares() {
            const response = await getExtracurriculares(this.aluno.token);
            if (response.status >= 200 && response.status < 300) {
                this.extracurriculares = response.data.cursosExtracurriculares.map(activity => ({ ...activity, editMode: 'view' }));
            } else {
                alert("Ops.. Algo deu errado ao carregar as atividades extracurriculares. 😕\n" + response.message);
            }
        },

        toggleEditMode(activity, index) {
            this.extracurriculares[index] = { ...activity, editMode: 'edit' };
        },

        cancelEdit(activity, index) {
            this.extracurriculares[index] = { ...activity, editMode: 'view' };
        },


        async saveEdit(activity, index) {
            const response = await editExtracurricular(activity, this.aluno.token);
            if (response.status >= 200 && response.status < 300) {
                alert("Atividade atualizada com sucesso! 😉");
                this.fetchExtracurriculares();
            } else {
                alert("Ops.. Algo deu errado ao editar a atividade extracurricular. 😕\n" + response.message);
            }
        },

        confirmDelete(activity, index) {
            if (confirm("Você tem certeza que deseja excluir esta atividade extracurricular?")) {
                this.deleteActivity(activity, index);
            }
        },

        async deleteActivity(activity, index) {
            const response = await deleteExtracurricular({ extracurricularId: activity.id, alunoId: this.aluno.id }, this.aluno.token);
            if (response.status >= 200 && response.status < 300) {
                alert("Atividade excluída com sucesso! 😉");
                this.extracurriculares.splice(index, 1);
            } else {
                alert("Ops.. Algo deu errado ao excluir a atividade extracurricular. 😕\n" + response.message);
            }
        },

        async addNewActivity() {
            const response = await addExtracurricular(this.newActivity, this.aluno.token);
            if (response.status >= 200 && response.status < 300) {
                alert("Nova atividade adicionada com sucesso! 😉");
                this.showAddForm = false;
                this.newActivity = { instituicao: '', descricao: '', inicio: '', fim: '' };
                this.fetchExtracurriculares();
            } else {
                alert("Ops.. Algo deu errado ao adicionar a nova atividade extracurricular. 😕\n" + response.message);
            }
        },

        cancelAdd() {
            this.showAddForm = false;
            this.newActivity = { instituicao: '', descricao: '', inicio: '', fim: '' };
        },

        formatDate(date) {
            return new Date(date).toLocaleDateString('pt-BR');
        }
    },
    mixins: [mixinAluno],
    async created() {
        this.getToken();
        await this.getCurriculoAluno();
        await this.fetchExtracurriculares();
    }
};
</script>

<style lang="scss" scoped>
@import "../../scss/pages/aluno/_profile.scss";

#app {
    display: flex;
    flex-direction: column;
}
</style>
