<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="userAluno.name" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="userAluno.email" required>
                </div>
                <div>
                    <label for="password">Senha:</label>
                    <input type="password" id="password" v-model="userAluno.password" required>
                </div>
                <div>
                    <label for="confirmPassword">Confirmar Senha:</label>
                    <input type="password" id="confirmPassword" v-model="userAluno.confirmPassword" required>
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import Cookies from 'js-cookie';
import { registerPreAluno } from '../services/api.js';
// import { loginAluno } from '../services/api.js';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
    name: 'Register',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAluno: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        async submitForm() {
            if (this.userAluno.password !== this.userAluno.confirmPassword) {
                alert('Senhas não conferem');
            } else {
                try {
                    const data = await registerPreAluno({
                        name: this.userAluno.name,
                        email: this.userAluno.email,
                        password: this.userAluno.password
                    });

                    alert('Aluno registrado com sucesso');

                    Cookies.set('email', `${data.email}`, { expires: 10 });

                    // try {
                    //     const data = await loginAluno({
                    //         email: this.userAluno.email,
                    //         password: this.userAluno.password
                    //     });
                    //     alert('Aluno logado com sucesso');
                    //     console.log(data);
                    //     document.cookie = `token=${data.token}`;
                    // } catch (error) {
                    //     alert('Erro ao logar');
                    // }

                } catch (error) {
                    alert('Erro ao registrar aluno');
                }
            }
        }
    }
}
</script>