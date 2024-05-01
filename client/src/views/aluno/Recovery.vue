<template>
    <Header />
    <div id="app">
        <main>
            <form @submit.prevent="submitForm">
                <H1>Recupere sua senha de acesso:</H1>
                <p>É necessário informar alguns dados para que seja enviado uma senha temporária para acesso a conta novamente.</p>
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="userAluno.name" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="userAluno.email" required>
                </div>
                <div>
                    <button type="submit">Enviar senha temporária</button>
                </div>
            </form>
        </main>
    </div>
    <Footer />

</template>

<script>
import { recoveryAluno } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import Cookies from 'js-cookie';
import router from '../../router/index.js'

export default {
    name: 'RecoveryAluno',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAluno: {
                name: '',
                email: ''
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const data = await recoveryAluno({
                    name: this.userAluno.name,
                    email: this.userAluno.email
                });

                Cookies.set('email', `${this.userAluno.email}`, { expires: 10 });
                alert('Senha temporária enviada com sucesso!');

                router.push({name: 'ValidateRecovery'});
            } catch (error) {
                alert('Email ou nome inválidos');
            }
        }
    }
}
</script>