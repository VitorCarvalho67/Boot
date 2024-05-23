<template>
    <Header />
    <main>
        <div class="box">
            <form @submit.prevent="submitForm">
                <h1>Entre como profissional</h1>
                <p class="p">Para acessar sua área exclusiva de profissionais na plataforma, por favor, insira seu
                    e-mail cadastrado e seu cargo</p>
                <div class="input-box" :class="{ 'focused': emailFocused }">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model="funcionario.email" required @focus="emailFocused = true"
                        @blur="emailFocused = false">
                </div>
                <div class="input-box input-box2" :class="{ 'focused': cargoFocused }">
                    <label for="cargo">Cargo</label>
                    <select id="cargo" name="cargo" v-model="funcionario.cargo" required @focus="cargoFocused = true"
                        @blur="cargoFocused = false">
                        <option value="" disabled>Selecione um cargo</option>
                        <option value="GESTAO">Gestão</option>
                        <option value="ADMINISTRACAO">Administração</option>
                        <option value="DIRECAO">Direção</option>
                        <option value="ORIENTACAO">Orientação</option>
                    </select>
                </div>
                <p><router-link to="/recovery">Acesse como</router-link></p>
                <div class="button-box">
                    <button type="submit">Continuar</button>
                </div>
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
import { initFuncionario } from '../../services/api/funcionario';

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
            },
            emailFocused: false
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
                    if (Cookies.get('email-init-funcionario')) {
                        Cookies.remove('email-init-funcionario');
                    }

                    Cookies.set('email-init-funcionario', `${this.funcionario.email}`, { expires: 10 });

                    if (!response.data.funcionario.validated) {
                        router.push({ name: 'ValidateFuncionario' });
                    } else {
                        router.push({ name: 'LoginFuncionario' });
                    }

                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/funcionario/_init.scss";
</style>