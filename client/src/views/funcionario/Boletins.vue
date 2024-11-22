<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <h1>Boletins a serem validados</h1>

                <div v-if="boletins.length === 0">Nenhum boletim para análise no momento</div>

                <div v-for="boletim in boletins" :key="boletim.id" class="boletim-item">
                    <div>
                        <strong>Aluno:</strong> {{ boletim.aluno.name }} <br />
                        <strong>Turma:</strong> {{ boletim.aluno.turma }} <br />
                        <strong>Link:</strong> <a :href="boletim.url" target="_blank">Baixar Boletim</a>
                    </div>
                    <input type="file" @change="(event) => handleFileChange(event, boletim.id)" />
                    <button :disabled="!selectedFiles[boletim.id]" @click="compareBoletim(boletim.id)">
                        Comparar
                    </button>
                </div>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import AsideDashboard from '../../components/funcionario/AsideDashboard.vue';
import { mixinFuncionario } from '../../util/authMixins.js';
import { getBoletins, compareBoletins } from '../../services/api/funcionario.js';

export default {
    name: 'Boletins',
    components: {
        Header,
        AsideDashboard,
        Footer
    },
    data() {
        return {
            boletins: [],
            selectedFiles: {}
        };
    },
    methods: {
        async fetchBoletins() {
            const response = await getBoletins(this.funcionario.token);
            this.boletins = response.data;
        },
        handleFileChange(event, boletimId) {
            this.selectedFiles[boletimId] = event.target.files[0];
        },
        async compareBoletim(boletimId) {
            const file = this.selectedFiles[boletimId];

            if (file) {
                const response = await compareBoletins(file, boletimId, this.funcionario.token);
                alert(response.data.message);
            } else {
                alert('Por favor, selecione um arquivo para comparação.');
            }
        }
    },
    mixins: [mixinFuncionario],
    async created() {
        await this.getToken();
        await this.fetchBoletins();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/funcionario/_dashboard.scss";

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

            .boletim-item {
                margin-bottom: 20px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
    }
}
</style>
