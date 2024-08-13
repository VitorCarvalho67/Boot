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
                    <p>Registro de Coordenador</p>
                </div>
                <div class="register">
                    <form @submit.prevent="submitForm">
                        <h1>Registro de Coordenador</h1>
                        <p>Associando um professor ao cargo de coordenador, será possível atribuir turmas de um curso a
                            esse professor.</p>

                        <Select :dataSelect="dataSelect" @input="coordenador.name = $event" />

                        <div class="button-box">
                            <button type="submit">Registrar</button>
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
import { getProfessores, registerCoordenador } from '../../services/api/admin';

export default {
    name: 'RegisterCoordenador',
    components: {
        Header,
        Footer,
        AsideDashboard,
        Select
    },
    data() {
        return {
            anguloIcon,
            coordenador: {
                name: '',
            },
            dataSelect: {
                title: "Selecione um professor",
                description: "Professor",
                options: [],
            },
            professores: [],
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await registerCoordenador(this.coordenador.name, this.admin.token);

                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                    await this.GetProfessores();
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },
        async GetProfessores() {
            try {
                const response = await getProfessores(this.admin.token);
                this.professores = response.data


                this.dataSelect.options = this.professores.map(professor => ({
                    value: professor.name,
                    description: professor.name
                }));

                console.log(this.dataSelect.options);
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.GetProfessores();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_registerCoordenador.scss";

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

            @media (max-width: 1000px) {
                width: calc(100% - 100px);
            }
        }
    }
}
</style>