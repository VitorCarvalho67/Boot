<template>
    <Header />
    <div id="app">
        <form @submit.prevent="submitForm">
           <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="userAluno.email" required>
            </div>
            <div>
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="userAluno.password" required>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
    <Footer />

</template>

<script>
    import { loginAluno } from '../services/api.js';
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';

    export default {
        name: 'Login',
        components: {
            Header,
            Footer
        },
        data() {
            return {
                userAluno: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async submitForm() {
                try {
                    const data = await loginAluno({
                        email: this.userAluno.email,
                        password: this.userAluno.password
                    });
                    alert('Aluno logado com sucesso');
                    console.log(data);
                    document.cookie = `token=${data.token}`;
                } catch (error) {
                    alert('Email ou senha inválidos');
                }
            }
        }
    }
</script>