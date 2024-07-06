<template>
    <div id="app">
        <Header />
        <main>
            <div class="register">
                <form @submit.prevent="submitForm">
                    <h1>Registro de vaga</h1>

                    <div>
                        <label>Título</label>
                        <input type="text" v-model="vaga.titulo">
                    </div>

                    <Select :dataSelect="selectDataEmpresas" @input="vaga.empresa = $event" />

                    <div class="requisitos">
                        <label>Requisitos</label>
                        <div v-for="(requisito, index) in vaga.requisitos" :key="index" class="requisito">
                            <p :v-text="'Requisito' + index + ':'"></p>
                            <input type="text" v-model="vaga.requisitos[index]">
                        </div>
                        <button type="button" @click="addRequisito"
                            v-if="vaga.requisitos[vaga.requisitos.length - 1] != ''">
                            <img src="" alt="">
                            <p>Adicionar requisito</p>
                        </button>
                    </div>

                    <div class="beneficios">
                        <label>Benefícios</label>
                        <div v-for="(beneficio, index) in vaga.beneficios" :key="index" class="beneficio">
                            <p :v-text="'beneficio' + index + ':'"></p>
                            <input type="text" v-model="vaga.beneficios[index]">
                        </div>
                        <button type="button" @click="addBeneficio"
                            v-if="vaga.beneficios[vaga.beneficios.length - 1] != ''">
                            <img src="" alt="">
                            <p>Adicionar beneficio</p>
                        </button>
                    </div>

                    <div>
                        <label>Remuneração</label>
                        <input type="text" v-model="vaga.remuneracao">
                    </div>

                    <div>
                        <label>Carga horária</label>
                        <input type="text" v-model="vaga.cargaHoraria">
                    </div>

                    <div>
                        <label>Entrada</label>
                        <input type="text" v-model="vaga.inicio">
                    </div>

                    <div>
                        <label>Saída</label>
                        <input type="text" v-model="vaga.fim">
                    </div>

                    <Select :dataSelect="selectData" @input="vaga.curso = $event" />
                    <br>

                    <Select :dataSelect="selectDataStatus" @input="vaga.status = $event" />
                    <br>
                    
                    <div>
                        <label>Descrição</label>
                        <textarea v-model="vaga.descricao"></textarea>
                    </div>

                    <button type="button" @click="submitForm">Registrar</button>

                </form>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Select from '../../components/Select.vue';

import { mixinFuncionario } from '../../util/authMixins.js';
import { registerVaga, getCursos, getEmpresas } from '../../services/api/funcionario';

export default {
    name: 'RegisterVaga',
    components: {
        Header,
        Footer,
        Select
    },
    data() {
        return {
            vaga: {
                titulo: '',
                empresa: '',
                requisitos: [''],
                beneficios: [''],
                remuneracao: '',
                cargaHoraria: '',
                inicio: '',
                fim: '',
                status: '',
                curso: '',
                descricao: ''
            },
            invalidDate: true,
            cursos: [],
            empresas: [],
            selectData: {
                title: "Selecione um curso",
                description: "Curso Preferencial",
                options: [],
            },
            selectDataEmpresas: {
                title: "Selecione a empresa",
                description: "Empresa",
                options: [],
            },
            selectDataStatus: {
                title: "Selecione o status da vaga",
                description: "Situação",
                options: [
                    {
                        value: "DISPONIVEL", description: 'Disponível',
                    },
                    {
                        value: "INDISPONIVEL", description: 'Indisponível',
                    }
                ],
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await registerVaga(
                    {
                        titulo: this.vaga.titulo,
                        empresa: this.vaga.empresa,
                        requisitos: this.vaga.requisitos.map(requisito => (requisito !== "" ? requisito : null)),
                        beneficios: this.vaga.beneficios.map(beneficio => (beneficio !== "" ? beneficio : null)),
                        remuneracao: this.vaga.remuneracao,
                        cargaHoraria: this.vaga.cargaHoraria,
                        entrada: this.vaga.inicio,
                        saida: this.vaga.fim,
                        status: this.vaga.status,
                        curso: this.vaga.curso,
                        descricao: this.vaga.descricao
                    },
                    this.funcionario.token
                );

                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado ao registrar a vaga. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao registrar a vaga. 😕\n" + error.message);
            }
        },

        async GetCursos() {
            try {
                const response = await getCursos(this.funcionario.token);

                if (response.status < 300 && response.status >= 200) {
                    this.cursos = response.data;

                    this.selectData.options = this.cursos.map(curso => ({
                        value: curso.name,
                        description: curso.name
                    }));
                } else {
                    alert("Ops.. Algo deu errado ao recuperar os cursos. 😕\n" + response);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao recuperar os cursos. 😕\n" + error.message);
            }
        },
        async GetEmpresas() {
            try {
                const response = await getEmpresas(this.funcionario.token);
                this.empresas = response.data;

                this.selectDataEmpresas.options = this.empresas.map(empresa => ({
                    value: empresa.email,
                    description: empresa.name
                }))
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },
        addRequisito() {
            this.vaga.requisitos.push('');
        },
        addBeneficio() {
            this.vaga.beneficios.push('');
        },
    },
    mixins: [mixinFuncionario],
    async created() {
        this.getToken();
        await this.GetCursos();
        await this.GetEmpresas();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/funcionario/_registerVaga.scss";
</style>