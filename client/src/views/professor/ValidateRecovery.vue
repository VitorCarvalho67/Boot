<template>
    <Header />
    <main>
        <div class="aaaa">
            <form @submit.prevent="submitForm">
                <H1>Senha temporária:</H1>
                <p>Informe a senha enviado pelo email informado</p>
                <p>Caso não tenha recebino o email</p> <button>Retornar para a página anterior</button>
                <br>
                <label for="recoveryPass">Senha temporária enviada no email:</label>
                <input type="text" id="recoveryPass" v-model="infoProfessor.recoveryPass" required>
                <br>
                <label for="newPass">Nova senha:</label>
                <input type="password" id="newPass" v-model="infoProfessor.newPass" required>
                <br>
                <label for="confirmNewPass">Confirmar nova senha:</label>
                <input type="password" id="confirmNewPass" v-model="infoProfessor.confirmNewPass" required>
                <br>
                <button type="submit">Recuperar</button>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import { validateRecoveryProfessor } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'

export default {
    name: 'ValidateRecoveryProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            infoProfessor: {
                recoveryPass: '',
                newPass: '',
                confirmNewPass: ''
            }
        }
    },
    methods: {
        async submitForm() {
            const emailCookies = Cookies.get('email-recovery-professor');
            if (this.infoProfessor.newPass === this.infoProfessor.confirmNewPass){    
                try {
                    const response = await validateRecovery({
                        email: emailCookies,
                        recoveryPassword: this.infoProfessor.recoveryPass,
                        newPass: this.infoProfessor.newPass
                    });

                    if (200 <= response.status && response.status < 300) {
                        router.push({ name: 'Login' });

                        alert("Tudo certo! 😉");
                    } else{
                        alert("Ops.. Algo deu errado. 😕\n" + response.message);
                    }
                } catch(error){
                    alert("Ops.. Algo deu errado. 😕\n" + error.message);
                }
            } else{
                alert("As senhas devem ser iguais!");
            }
        }
    }
}
</script>