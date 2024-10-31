<template>
    <Header />
    <main>
        <div class="box" id="box2">
            <form @submit.prevent="submitForm">
                <div class="content">
                    <h1>Termine seu registro</h1>

                    <div v-if="etapa === 1" class="step" id="content1">
                        <h3>Dados pessoais</h3>


                        <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                        <div class="input-box" :class="{ 'focused': focused.nascimentoFocused }">
                            <label for="nascimento">Data de nascimento</label>
                            <input type="date" id="nascimento" v-model="aluno.nascimento"
                                @focus="focused.nascimentoFocused = true" @blur="focused.nascimentoFocused = false"
                                required>
                        </div>
                        
                        <div class="input-box" :class="{ 'focused': focused.telefone }">
                            <label for="telefone">Telefone ou número de celular</label>
                            <input type="text" id="telefone" v-model="aluno.telefone" @focus="focused.telefone = true"
                                @blur="focused.telefone = false" @input="formatTelefone" required>
                        </div>

                        <span class="alert" v-show="alerts.nascimentoAlert">Por favor, preencha sua data de nascimento
                            e número de telefone ou celular corretamente.</span>
                        <div class="button-box">
                            <button @click="validateNascimento" type="button">Continuar</button>
                        </div>
                    </div>

                    <div v-if="etapa === 2" class="step" id="content2">
                        <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                        
                        <h3>Endereço</h3>

                        <div class="input-box" :class="{ 'focused': focused.cep }">
                            <label for="cep">CEP</label>
                            <input type="text" id="cep" v-model="aluno.endereco.cep" @focus="focused.cep = true"
                                @blur="focused.cep = false" @input="handleCepInput" required>
                        </div>

                        <div class="input-box" :class="{ 'focused': focused.municipio }">
                            <label for="municipio">Município</label>
                            <input type="text" id="municipio" :value="aluno.endereco.municipio? (aluno.endereco.municipio + ', ' + aluno.endereco.estado) : ''"
                                @focus="focused.municipio = true" @blur="focused.municipio = false" readonly>
                        </div>

                        <div class="input-box" :class="{ 'focused': focused.rua }">
                            <label for="rua">Rua</label>
                            <input type="text" id="rua" v-model="aluno.endereco.rua" @focus="focused.rua = true"
                                @blur="focused.rua = false" required>
                        </div>

                        <div class="input-box" :class="{ 'focused': aluno.numero }">
                            <label for="numero">Número</label>
                            <input type="text" id="numero" v-model="aluno.endereco.numero" @focus="focused.numero = true"
                                @blur="focused.numero = false" required>
                        </div>
                        
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
                        <h3>Resgistro de Matrícula</h3>
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

import axios from 'axios';

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
                telefone: '',
                nascimento: '',
                rm: '',
                endereco: {
                    cep: '',
                    municipio: '',
                    estado: '',
                    rua: '',
                    numero: ''
                },
                curso: {
                    name: '',
                    inicio: '',
                    turno: ''
                }
            },
            etapa: 1,
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
            return this.aluno.nascimento &&
                this.aluno.endereco.estado !== '' &&
                this.aluno.endereco.municipio !== '' &&
                this.aluno.endereco.rua !== '' &&
                this.aluno.endereco.numero !== '' &&
                this.aluno.endereco.cep !== '' &&
                this.aluno.curso.name !== '' &&
                this.aluno.curso.turno !== '' &&
                this.aluno.curso.inicio !== '' &&
                this.aluno.rm !== '' &&
                this.aluno.telefone !== '';
        },
        nascimentoValidated() {
            return this.aluno.nascimento !== '' &&
            this.aluno.telefone !== '';
        },
        enderecoValidated() {
            return this.aluno.endereco.estado !== '' &&
                this.aluno.endereco.municipio !== '' &&
                this.aluno.endereco.rua !== '' &&
                this.aluno.endereco.numero !== '' &&
                this.aluno.endereco.cep !== '';
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
                    telefone: this.aluno.telefone,
                    endereco: this.aluno.endereco,
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
        },
        formatTelefone() {
            let telefone = this.aluno.telefone.replace(/\D/g, '');
            if (telefone.length > 11) {
                telefone = telefone.substring(0, 11);
            }
            if (telefone.length > 10) {
                telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (telefone.length > 9) {
                telefone = telefone.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
            this.aluno.telefone = telefone;
        },
        async loadDataFromCep() {
            const cep = this.aluno.endereco.cep.replace(/\D/g, '');
            if (cep.length === 8) {
                try {
                    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                    if (response.data) {
                        this.aluno.endereco.municipio = response.data.localidade;
                        this.aluno.endereco.estado = response.data.uf;
                        this.aluno.endereco.rua = response.data.logradouro;
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do CEP:", error);
                }
            }
        },
        formatCep(cep) {
            cep = cep.replace(/\D/g, '');
            if (cep.length > 8) {
                cep = cep.substring(0, 8);
            }
            if (cep.length > 5) {
                cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
            }
            return cep;
        },
        handleCepInput(event) {
            const input = event.target.value;
            this.aluno.endereco.cep = this.formatCep(input);
            if (input.replace(/\D/g, '').length === 8) {
                this.loadDataFromCep();
            }
        },
    },
    mixins: [mixinAluno],
    async created() {
        await this.getToken();
        this.aluno.email = Cookies.get('email-aluno');
        this.fetchCursos();
    }
};
</script>

<style lang="scss" scoped>
@import "../../scss/pages/aluno/_complete.scss";
</style>
