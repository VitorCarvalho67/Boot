<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <div class="register">
                    <form @submit.prevent="submitForm">
                        <h1>Registro de funcionário</h1>
                        <div>
                            <label for="name">Nome:</label>
                            <input type="text" id="name" v-model="funcionario.name" required>
                        </div>
                        <div>
                            <Select :dataSelect="dataSelect" @input="funcionario.cargo = $event" />
                        </div>
                        <div>
                            <label for="email">Email:</label>
                            <input type="email" id="email" v-model="funcionario.email" @input="checkData" required>
                        </div>
                        <br>


                        <button v-show="allRequirementsMet" type="submit">Registrar - valido</button>
                        <button v-show="!allRequirementsMet" type="button">Registrar - invalido</button>
                        <br>

                    </form>
                </div>
            </div>
        </main>
    </div>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Select from '../../components/Select.vue';
import AsideDashboard from '../../components/admin/AsideDashboard.vue';

import { mixinAdmin } from '../../util/authMixins.js';
import { registerFuncionario } from '../../services/api/admin';

export default {
    name: 'RegisterFuncionario',
    components: {
        Header,
        Footer,
        AsideDashboard,
        Select
    },
    data() {
        return {
            funcionario: {
                name: '',
                cargo: '',
                email: '',
            },
            dataSelect: {
                title: "Selecione um cargo",
                description: "Cargo",
                options: [
                    { value: 'GESTAO', description: 'Gestão' },
                    { value: 'ADMINISTRACAO', description: 'Administração' },
                    { value: 'DIRECAO', description: 'Direção' },
                    { value: 'ORIENTACAO', description: 'Orientação' }
                ],
            },
        }
    },
    computed: {
        allRequirementsMet() {
            return this.funcionario.name && this.funcionario.email && this.funcionario.cargo;
        }
    },
    methods: {
        checkData() {
            const name = this.funcionario.name;
            const email = this.funcionario.email;
            const cargo = this.funcionario.cargo;

            return (name, email, cargo);
        },

        async submitForm() {
            try {
                const response = await registerFuncionario(
                    {
                        name: this.funcionario.name,
                        email: this.funcionario.email,
                        cargo: this.funcionario.cargo
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
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_registerFuncionario.scss";
#app {
    display: flex;
    flex-direction: column;
    height: 100vh;

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
        }
    }
}
</style>