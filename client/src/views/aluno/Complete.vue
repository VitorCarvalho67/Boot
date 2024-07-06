<template>
    <Header />
    <main>
        <div class="box" id="box2">
            <form @submit.prevent="submitForm">
                <div class="content">
                    <h1>Termine seu registro</h1>

                    <div v-if="etapa === 1" class="step" id="content1">
                        <h3>Nascimento</h3>
                        <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                        <div class="input-box" :class="{ 'focused': focused.nascimentoFocused }">
                            <label for="nascimento">Data de nascimento</label>
                            <input type="date" id="nascimento" v-model="aluno.nascimento"
                                @focus="focused.nascimentoFocused = true" @blur="focused.nascimentoFocused = false"
                                required>
                        </div>
                        <span class="alert" v-show="alerts.nascimentoAlert">Por favor, preencha a data de nascimento
                            corretamente.</span>
                        <div class="button-box">
                            <button @click="validateNascimento" type="button">Continuar</button>
                        </div>
                    </div>

                    <div v-if="etapa === 2" class="step" id="content2">
                        <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                        <h3>Endereço</h3>
                        <Select :dataSelect="dataSelectEstado" @input="$event => updateCidades($event)"/>
                        <Select :dataSelect="dataSelectCidade" @input="aluno.endereco.cidade = $event"/>
                        
                        <span class="alert" v-show="alerts.enderecoAlert">Por favor, preencha o endereço corretamente.</span>
                        <div class="button-box">
                            <button @click="etapa = 1" type="button">Voltar</button>
                            <button @click="validateEndereco" type="button">Continuar</button>
                        </div>
                    </div>

                    <div v-if="etapa === 3" class="step" id="content3">
                        <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                        <h3>Curso</h3>
                        <Select :dataSelect="dataSelectCurso" @input="aluno.curso.name = $event"/>
                        <Select :dataSelect="dataSelectTurno" @input="aluno.curso.turno = $event"/>
                        <span class="alert" v-show="alerts.cursoAlert">Por favor, selecione o curso e o turno.</span>
                        <div class="button-box">
                            <button @click="etapa = 2" type="button">Voltar</button>
                            <button @click="validateCurso" type="button">Continuar</button>
                        </div>
                    </div>

                    <div v-if="etapa === 4" class="step" id="content4">
                        <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                        <h3>Início</h3>
                        <Select :dataSelect="dataSelectInicio" @input="aluno.curso.inicio = $event"/>
                        <span class="alert" v-show="alerts.inicioAlert">Por favor, selecione a data de início.</span>
                        <div class="button-box">
                            <button @click="etapa = 3" type="button">Voltar</button>
                            <button @click="validateInicio" type="button">Continuar</button>
                        </div>
                    </div>

                    <div v-if="etapa === 5" class="step" id="content5">
                        <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                        <h3>RM</h3>
                        <div class="input-box" :class="{ 'focused': focused.rmFocused }">
                            <label for="rm">RM</label>
                            <input type="text" id="rm" v-model="aluno.rm" @focus="focused.rmFocused = true"
                                @blur="focused.rmFocused = false" required>
                        </div>
                        <span class="alert" v-show="alerts.rmAlert">Por favor, preencha o RM corretamente.</span>
                        <div class="button-box">
                            <button @click="etapa = 4" type="button">Voltar</button>
                            <button v-show="allRequirementsMet" type="submit">Finalizar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import logo from '../../assets/imgs/imageMain.png';
import Cookies from 'js-cookie';
import router from '../../router/index.js';
import Select from '../../components/Select.vue';

import { completeRegister, getCursos, getInicios } from '../../services/api/aluno';
import { mixinAluno } from '../../util/authMixins';

export default {
    name: 'Complete',
    components: {
        Header,
        Footer,
        Select
    },
    data() {
        return {
            aluno: {
                email: '',
                nascimento: '',
                rm: '',
                endereco: {
                    cidade: '',
                    estado: ''
                },
                curso: {
                    name: '',
                    inicio: '',
                    turno: ''
                }
            },
            etapa: 1,
            ufs: ['SP'],
            cidades: [],
            cursos: [],
            inicios: [],
            focused: {
                nascimentoFocused: false,
                cursoFocused: false,
                inicioFocused: false,
                enderecoUFFocused: false,
                enderecoCidadeFocused: false,
                rmFocused: false
            },
            alerts: {
                nascimentoAlert: false,
                enderecoAlert: false,
                cursoAlert: false,
                inicioAlert: false,
                rmAlert: false
            },
            dataSelectEstado:{
                title: "Selecione o estado", 
                description: "UF",
                options: [],
            },
            dataSelectCidade:{
                title: "Selecione sua cidade", 
                description: "Município",
                options: [],
            },
            dataSelectTurno: {
                title: "Selecione um turno", 
                description: "Turno",
                options: [
                    { value: 'MANHA', description: 'Manhã' },
                    { value: 'TARDE', description: 'Tarde' },
                    { value: 'NOITE', description: 'Noite' },
                    { value: 'INTEGRAL', description: 'Integral' }
                ],
            },
            dataSelectCurso:{
                title: "Selecione o nome do curso", 
                description: "Curso",
                options: [],
            },
            dataSelectInicio:{
                title: "Selecione a data de início", 
                description: "Início",
                options: [],
            },
            imagem: logo,
            errorMessage: ''
        };
    },
    computed: {
        allRequirementsMet() {
            return this.aluno.nascimento && this.aluno.endereco.estado && this.aluno.endereco.cidade &&
                this.aluno.curso.name && this.aluno.curso.turno && this.aluno.curso.inicio && this.aluno.rm;
        },
        nascimentoValidated() {
            return this.aluno.nascimento !== '';
        },
        enderecoValidated() {
            return this.aluno.endereco.estado !== '' && this.aluno.endereco.cidade !== '';
        },
        inicioValidated() {
            return this.aluno.curso.inicio !== '';
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await completeRegister({
                    rm: this.aluno.rm,
                    endereco: this.aluno.endereco.cidade + ", " + this.aluno.endereco.estado,
                    nascimento: this.aluno.nascimento,
                    curso: this.aluno.curso.name,
                    inicio: this.aluno.curso.inicio
                }, this.aluno.token
                );

                if (response.status >= 200 && response.status < 300) {
                    Cookies.set("completed", "true");
                    router.push('/aluno/me');
                } else {
                    this.alerts.rmAlert = true;
                }
            } catch (error) {
                this.alerts.rmAlert = true;
            }
        },
        validateNascimento() {
            if (this.nascimentoValidated) {
                this.alerts.nascimentoAlert = false;
                this.etapa = 2;
            } else {
                this.alerts.nascimentoAlert = true;
            }
        },
        validateEndereco() {
            if (this.enderecoValidated) {
                this.alerts.enderecoAlert = false;
                this.etapa = 3;
            } else {
                this.alerts.enderecoAlert = true;
            }
        },
        async validateCurso() {
            try {
                const response = await getInicios({
                    curso: this.aluno.curso.name,
                    turno: this.aluno.curso.turno
                },
                    this.aluno.token
                );
                if (response.status >= 200 && response.status < 300) {
                    this.inicios = response.data;

                    this.dataSelectInicio.options = this.inicios.map(inicio => ({
                        value: inicio.inicio,
                        description: inicio.inicio,
                    }))

                    if (this.aluno.curso.name !== '' && this.aluno.curso.turno !== '' && this.inicios.length > 0) {
                        this.alerts.cursoAlert = false;
                        this.etapa = 4;
                    } else {
                        this.alerts.cursoAlert = true;
                    }
                } else {
                    this.alerts.cursoAlert = true;
                    this.errorMessage = "Ops.. Algo deu errado ao buscar as datas de início. 😕" + response.message;
                }
            } catch (error) {
                this.alerts.cursoAlert = true;
                this.errorMessage = "Ops.. Algo deu errado ao buscar as datas de início. 😕";
            }
        },
        validateInicio() {
            if (this.inicioValidated) {
                this.alerts.inicioAlert = false;
                this.etapa = 5;
            } else {
                this.alerts.inicioAlert = true;
            }
        },
        async updateEstados() {
            this.dataSelectEstado.options = this.ufs.map(uf => ({
                value: uf,
                description: uf
            }));
        },
        async updateCidades(estadoSeleted) {
            this.aluno.endereco.estado = estadoSeleted;
            const estado = this.aluno.endereco.estado;
            if (estado === 'SP') {
                this.cidades = ['São Paulo', 'Santo André', 'São Bernardo', 'São Caetano', 'Diadema', 'Mauá', 'Ribeirão Pires', 'Rio Grande da Serra'];
                this.dataSelectCidade.options = this.cidades.map(cidade => ({
                    value: cidade,
                    description: cidade
                }))
            }
        },
        async fetchCursos() {
            try {
                const response = await getCursos(this.aluno.token);
                if (response.status >= 200 && response.status < 300) {
                    this.cursos = response.data;

                    this.dataSelectCurso.options = this.cursos.map(curso => ({
                        value: curso.name,                        
                        description: curso.name
                    }));
                } else {
                    this.errorMessage = "Ops.. Algo deu errado ao buscar os cursos. 😕" + response.message;
                }
            } catch (error) {
                this.errorMessage = "Ops.. Algo deu errado ao buscar os cursos. 😕";
            }
        }
    },
    mixins: [mixinAluno],
    async created() {
        await this.getToken();
        this.aluno.email = Cookies.get('email-aluno');
        this.fetchCursos();
        this.updateEstados();
    }
};
</script>

<style lang="scss" scoped>
@import "../../scss/pages/aluno/_complete.scss";
</style>
