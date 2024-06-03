<template>
    <Header />
    <div id="app">
        <main>
            <section>
                <p v-text="aluno.nome"></p>
                <p v-text="aluno.idade"></p>
                <p v-text="aluno.endereco"></p>
                <div>
                    <p v-show="mode === 'view'" v-html="aluno.curriculo"></p>
                    <button v-show="mode === 'view'" @click="editMode" type="button">Lápis</button>
                    <textarea v-show="mode === 'edit'" name="" id="" cols="30" rows="10" v-model="aluno.curriculoEdit"></textarea>
                    <button v-show="mode === 'edit'" @click="updateCurriculoSubmit" type="button">Salvar</button>
                    <button v-show="mode === 'edit'" @click="cancel" type="button">Cancelar</button>
                </div>
            </section>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import router from '../../router/index.js';
import Cookies from 'js-cookie';
import { getCurriculo, updateCurriculo } from '../../services/api/aluno';
import { mixinAluno } from '../../util/authMixins';

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
            mode: 'view'
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

            await this.getCurriculoAluno()
            this.editMode();
        },
        editMode() {
            this.mode = this.mode === 'view' ? 'edit' : 'view';
        },
        async cancel(){
            await this.getCurriculoAluno()
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
        async getCurriculoAluno(){
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