<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <div class="path">
                    <p>Dashboard</p>
                    <img :src="anguloIcon" alt="">
                    <p>Formulários</p>
                    <img :src="anguloIcon" alt="">
                    <p>Registro de turmas</p>
                </div>
                <div class="register">
                    <form @submit.prevent="submitForm">
                        <h1>Registro de Turma</h1>
                        <p>Preencha os dados abaixo para registrar uma nova turma. Certifique-se de fornecer informações corretas sobre as datas de início e fim, e selecione o curso apropriado.</p>

                        <div class="input-box">
                            <label>Ínicio:</label>
                            <input type="date" name="" id="" v-model="turma.inicio" @input="checkDateValidity">
                        </div>

                        <div class="input-box">
                            <label>Fim:</label>
                            <input type="date" name="" id="" v-model="turma.fim" @input="checkDateValidity">
                        </div>

                        <div class="select-box">
                            <Select :dataSelect="selectData" @input="turma.curso = $event" />
                        </div>

                        <div class="button-box">
                            <button type="submit" v-show="!invalidDate">Registrar</button>
                            <button type="button" v-show="invalidDate">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/admin/Header.vue';
import Footer from '../../components/Footer.vue';
import Select from '../../components/Select.vue';
import AsideDashboard from '../../components/admin/AsideDashboard.vue';
import anguloIcon from '../../assets/icons/angulo.png';

import { mixinAdmin } from '../../util/authMixins.js';
import { registerTurma, getCursos } from '../../services/api/admin';

export default {
    name: 'RegisterTurma',
    components: {
        Header,
        Footer,
        AsideDashboard,
        Select
    },
    data() {
        return {
            anguloIcon,
            turma: {
                inicio: '',
                fim: '',
                curso: '',
            },
            invalidDate: true,
            cursos: [],
            selectData: {
                title: "Selecione um curso",
                description: "Curso",
                options: [],
            },
        }
    },
    methods: {
        checkDateValidity() {
            const startDate = new Date(this.turma.inicio);
            const endDate = new Date(this.turma.fim);
            if (endDate <= startDate) {
                this.invalidDate = true;
            } else {
                this.invalidDate = false;
            }
        },
        async submitForm() {
            try {
                const response = await registerTurma(
                    {
                        inicio: this.turma.inicio,
                        fim: this.turma.fim,
                        cursoName: this.turma.curso
                    },
                    this.admin.token
                );

                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },

        async GetCursos() {
            try {
                const response = await getCursos(this.admin.token);
                this.cursos = response.data;

                this.selectData.options = this.cursos.map(curso => ({
                    value: curso.name,
                    description: curso.name
                }))
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.GetCursos();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_registerTurma.scss";

#app {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px);

    main {
        display: flex;
        overflow: hidden;

        .content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            height: 100%;
            @include flex(column, start, flex-start);

            @media (max-width: 1000px) {
                width: calc(100% - 100px);
            }
        }
    }
}
</style>