<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de Coordenador</h1>
                
                <label for="professor">Professor a se tornar coordenador:</label>
                <select id="professor" v-model="coordenador.name" required>
                    <option value="" disabled>Selecione um professor</option>
                    <option v-for="professor in professores" :key="professor.name" :value="professor.name">{{ professor.name }}</option>
                </select>

                <button type="submit">Registrar</button>

            </form>
        </div>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { authAdmin } from '../../services/api';
import { getProfessores } from '../../services/api';
import { registerCoordenador } from '../../services/api';

export default {
    name: 'RegisterCoordenador',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            coordenador: {
                name: '',
            },
            professores: [],
        }
    },
    methods: {
        async submitForm() {
            const token = Cookies.get('token');
            if (token){
                try {
                    const data = await registerCoordenador(this.coordenador.name, Cookies.get('token'));
                    alert("CERTINHO 🙏")
                } catch (error) {
                    alert('Erro ao registrar coordenador ' + error);
                }
            } else{
                alert("Cookie de token não encontrado");
            }
        },

        async Authenticate() {
            const token = Cookies.get('token');
            if (token == undefined) {
                router.push({ path: '/admin/login' });
            } else {
                try {
                    const auth = await authAdmin(token);

                    if (auth !== "Usuário autenticado com sucesso.") {
                        router.push({ path: "/admin/login" })
                    }

                    try {
                        this.professores = await getProfessores(token);
                    } catch (error) {
                        console.error('Erro ao recuperar a lista de professores:', error);
                    }
                } catch (error) {
                    alert(error);
                }
            }
        }
    },
    async created() {
        await this.Authenticate();
    }
}

</script>

<style lang="scss" scoped></style>