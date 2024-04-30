<template>
    <Header />
    <div id="app">
        <main>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="userAdmin.email" required>
                </div>
                <div>
                    <label for="password">Senha:</label>
                    <input type="password" id="password" v-model="userAdmin.password" required>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </main>
    </div>
    <Footer />

</template>

<script>
import { loginAdmin } from '../../services/api.js';
import router from '../../router/index.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';

export default {
    name: 'LoginAdmin',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAdmin: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const data = await loginAdmin({
                    email: this.userAdmin.email,
                    password: this.userAdmin.password
                });
                alert('Admin logado com sucesso');
                const tokenExists = Cookies.get('token');
                
                if (tokenExists) {
                    Cookies.remove('token');
                }
                document.cookie = `token=${data.token}`;
            } catch (error) {
                alert('Email ou senha inválidos');
            }
        }
    }
}
</script>