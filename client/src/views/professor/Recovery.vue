<template>
    <Header />
    <div id="app">
        <main>
            <form @submit.prevent="submitForm">
                <H1>Recupere sua senha de acesso:</H1>
                <p>É necessário informar alguns dados para que seja enviado uma senha temporária para acesso a conta novamente.</p>
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="userProfessor.name" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="userProfessor.email" required>
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
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { recoveryProfessor } from '../../services/api/professor';

export default {
    name: 'RecoveryProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userProfessor: {
                name: '',
                email: ''
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await recoveryProfessor({
                    name: this.userProfessor.name,
                    email: this.userProfessor.email
                });

                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('email-recovery-professor', `${this.userProfessor.email}`, { expires: 10 });
                    router.push({name: 'ValidateRecovery'});
                
                    alert("Tudo certo! 😉");
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