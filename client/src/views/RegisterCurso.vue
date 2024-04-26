<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de Curso</h1>

                <div>
                    <label for="name">Nome do curso:</label>
                    <input type="text" id="name" v-model="curso.name" required>
                </div>

                <div>
                    <label for="turno">Turno:</label>
                    <select id="turno" name="turno" v-model="curso.turno" required>
                        <option value="MANHA">Manhã</option>
                        <option value="TARDE">Tarde</option>
                        <option value="NOITE">Noite</option>
                        <option value="INTEGRAL">Integral</option>
                    </select>
                </div>

                <div>
                    <label>Duração:</label>
                    <div>
                        <input type="number" v-model="curso.duracao_quantidade" required>
                        <select id="duracao" name="duracao" v-model="curso.duracao_periodo" required>
                            <option value="anos">Anos</option>
                            <option value="meses">Meses</option>
                        </select>
                    </div>
                </div>
                
                <label for="coordenador">Coordenador:</label>
                <select id="coordenador" v-model="curso.coordenador" required>
                    <option value="" disabled>Selecione um coordenador</option>
                    <option v-for="coordenador in coordenadores" :key="coordenador.name" :value="coordenador.name">{{ coordenador.name }}</option>
                </select>
                <br>
                <button type="submit">Registrar</button>

            </form>
        </div>
    </main>
    <Footer />

</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../router/index.js'
import { authAdmin } from '../services/api';
import { getCoordenadores } from '../services/api';
import { registerCurso } from '../services/api';

export default {
    name: 'RegisterCurso',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            curso: {
                name: '',
                turno: '',
                duracao_quantidade: '',
                duracao_periodo: '',
                coordenador: ''
            },
            coordenadores: [],
        }
    },
    methods: {
        async submitForm() {
            const token = Cookies.get('token');
           
            if (token){
                try {
                    const data = await registerCurso(
                        {
                            cursoName: this.curso.name,
                            turno: this.curso.turno,
                            duracao: (this.curso.duracao_quantidade + " " + this.curso.duracao_periodo),
                            coordenador: this.curso.coordenador
                        }, 
                        token
                    );
                    alert("CERTINHO 🙏")
                } catch (error) {
                    alert('Erro ao registrar curso ' + error);
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
                        router.push({ path: "/admin/login" });
                    }

                    try {
                        this.coordenadores = await getCoordenadores(token);
                    } catch (error) {
                        console.log(error);
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