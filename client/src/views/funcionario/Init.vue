<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Faça seu login como funcionario:</h1>
                <p>Email:</p>
                <input type="text" id="email" v-model="funcionario.email">

                <div>
                    <label for="cargo">Cargo</label>
                    <select id="cargo" name="cargo" v-model="funcionario.cargo" required>
                        <option value="GESTAO">Gestão</option>
                        <option value="ADMINISTRACAO">Administração</option>
                        <option value="DIRECAO">Direção</option>
                        <option value="ORIENTACAO">Orientação</option>
                    </select>
                </div>
                <button type="submit">Continuar</button>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import { initFuncionario } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'

export default {
    name: 'InitFuncionario',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            funcionario: {
                email: '',
                cargo: ''
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await initFuncionario(
                    this.funcionario.email,
                    this.funcionario.cargo
                );

                if (200 <= response.status && response.status < 300) {
                    if(Cookies.get('emailFuncionario')){
                        Cookies.remove('emailFuncionario');
                    }
                    
                    Cookies.set('emailFuncionario', `${this.funcionario.email}`, { expires: 10 });
                    
                    if(!response.data.funcionario.validated){
                        router.push({ name: 'ValidateFuncionario'});
                    } else{
                        router.push({ name: 'LoginFuncionario'});
                    }

                    alert("Tudo certo! 😉 " + response.status);
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    }
}
</script>