<template>
    <Header />
    <div id="app">
        <main>
            <div class="capa">
                <div class="capaProfile">
                    <img src="" alt="imgCapa">
                </div>
                <div class="infoProfile">
                    <img src="" alt="imgProfile">
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
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import { getCurriculo, updateCurriculo } from '../../services/api/aluno';
import { mixinAluno } from '../../util/authMixins';
import imgLapis from '../../assets/icons/lapis.png';
import imgVerificar from '../../assets/icons/verificar.png';
import imgCruz from '../../assets/icons/cruz.png';

export default {
    name: 'PerfilAluno',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            aluno: {
                nome: '',
                endereco: '',
                nascimento: '',
                idade: '',
                curriculo: '',
                curriculoEdit: ''
            },
            mode: 'view',
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
            this.mode = this.mode === 'view' ? 'edit' : 'view';
            this.$nextTick(() => {
                if (this.mode === 'edit') {
                    this.$refs.edit.focus();
                }
            });
        },
        async cancel() {
            await this.getCurriculoAluno();
            this.editMode();
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

            if (response.status >= 200 && response.status < 300) {
                this.aluno.curriculo = response.data.curriculo.replace(/\n/g, '<br>');
                this.aluno.curriculoEdit = response.data.curriculo;
                this.aluno.endereco = response.data.endereco;
                this.aluno.nascimento = response.data.nascimento;
                this.calcularIdade(this.aluno.nascimento);
                this.aluno.nome = response.data.nome;
            } else {
                alert("Ops.. Algo deu errado ao recuperar os dados. 😕\n" + response.message);
            }
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