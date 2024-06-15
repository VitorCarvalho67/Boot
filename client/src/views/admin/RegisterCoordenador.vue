<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de Coordenador</h1>

                <label for="professor">Professor a se tornar coordenador:</label>
                <Select :dataSelect="dataSelect" @input="coordenador.name = $event"/>

                <button type="submit">Registrar</button>

            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Select from '../../components/Select.vue';

import { mixinAdmin } from '../../util/authMixins.js';
import { getProfessores, registerCoordenador } from '../../services/api/admin';

export default {
    name: 'RegisterCoordenador',
    components: {
        Header,
        Footer,
        Select
    },
    data() {
        return {
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
@import "../../scss/pages/admin/_registerCoordenador.scss"
</style>