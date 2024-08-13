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
                    <p>Registro de professores</p>
                </div>
                <div class="register">
                    <form @submit.prevent="submitForm">
                        <h1>Registro de professor</h1>
                        <p>Preencha os dados abaixo para registrar um novo professor. Certifique-se de fornecer
                            informações corretas sobre o nome, título principal e email do professor.</p>

                        <div class="input-box">
                            <label for="name">Nome:</label>
                            <input type="text" id="name" v-model="professor.name" required>
                        </div>

                        <div class="input-box">
                            <label for="titulo">Título principal:</label>
                            <input type="text" id="name" v-model="professor.tituloPrincipal" required>
                        </div>

                        <div class="input-box">
                            <label for="email">Email:</label>
                            <input type="email" id="email" v-model="professor.email" @input="checkData" required>
                        </div>

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
import AsideDashboard from '../../components/admin/AsideDashboard.vue';
import anguloIcon from '../../assets/icons/angulo.png';

import { mixinAdmin } from '../../util/authMixins.js';
import { registerProfessor } from '../../services/api/admin';

export default {
    name: 'RegisterProfessor',
    components: {
        Header,
        AsideDashboard,
        Footer
    },
    data() {
        return {
            anguloIcon,
            professor: {
                name: '',
                tituloPrincipal: '',
                email: ''
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await registerProfessor(
                    {
                        name: this.professor.name,
                        tituloPrincipal: this.professor.tituloPrincipal,
                        email: this.professor.email
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
        await this.Authenticate();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_registerProfessor.scss";

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