<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de funcionário</h1>
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="funcionario.name" required>
                </div>
                <div>
                    <label for="cargo">Cargo de:</label>
                    <select id="cargo" name="cargo" v-model="funcionario.cargo" required>
                        <option value="GESTAO">Gestão</option>
                        <option value="ADMINISTRACAO">Administração</option>
                        <option value="DIRECAO">Direção</option>
                        <option value="ORIENTACAO">Orientação</option>
                    </select>
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
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import { mixinAdmin } from '../../util/authMixins.js';
import { registerFuncionario } from '../../services/api/admin';

export default {
    name: 'RegisterFuncionario',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            token: '',
            funcionario: {
                name: '',
                tituloPrincipal: '',
                email: '',
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
                    this.token
                );

                console.log(response)
                
                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
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

<style lang="scss" scoped></style>