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
                <input type="text" id="recoveryPass" v-model="infoAluno.recoveryPass" required>
                <br>
                <label for="newPass">Nova senha:</label>
                <input type="password" id="newPass" v-model="infoAluno.newPass" required>
                <br>
                <label for="confirmNewPass">Confirmar nova senha:</label>
                <input type="password" id="confirmNewPass" v-model="infoAluno.confirmNewPass" required>
                <br>
                <button type="submit">Recuperar</button>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import { validateRecovery } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'

export default {
    name: 'ValidateRecovery',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            infoAluno: {
                recoveryPass: '',
                newPass: '',
                confirmNewPass: ''
            }
        }
    },
    methods: {
        async submitForm() {
            const emailCookies = Cookies.get('email');
            if (this.infoAluno.newPass === this.infoAluno.confirmNewPass){    
                try {
                    const data = await validateRecovery({
                        email: emailCookies,
                        recoveryPassword: this.infoAluno.recoveryPass,
                        newPass: this.infoAluno.newPass
                    });

                    alert('Conta recuperada com sucesso');
                    
                    router.push({ name: 'Login' })
                } catch (error) {
                    alert('Erro ao recuperar conta');
                }
            } else{
                alert("As senhas devem ser iguais!");
            }
        }
    }
}
</script>