<template>
    <Header />
    <main>
        <div class="box">
            <form @submit.prevent="submitForm">
                <h1>Entre como profissional</h1>
                <p class="p">Para acessar sua área exclusiva de profissionais na plataforma, por favor, insira seu
                    e-mail cadastrado e seu cargo</p>

                <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>

                <div class="input-box" :class="{ 'focused': emailFocused }">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model="funcionario.email" required @focus="emailFocused = true"
                        @blur="emailFocused = false">
                </div>

                <Select :dataSelect="dataSelect" @input="funcionario.cargo = $event" />

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
import Select from '../../components/Select.vue';

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { initFuncionario } from '../../services/api/funcionario';

export default {
    name: 'InitFuncionario',
    components: {
        Header,
        Footer,
        Select
    },
    data() {
        return {
            funcionario: {
                email: '',
                cargo: ''
            },
            emailFocused: false,
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
            errorMessage: ''
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

                } else {
                    this.errorMessage = "Ops.. Algo deu errado. 😕\n" + response.message;
                }
            } catch (error) {
                this.errorMessage = "Ops.. Algo deu errado. 😕";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/funcionario/_init.scss";
</style>