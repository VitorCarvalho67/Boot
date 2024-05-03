<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Faça seu login como professor:</h1>
                <p>Email:</p>
                <input type="text" id="email" v-model="professor.email">
                <button type="submit">Continuar</button>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import { initProfessor } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'

export default {
    name: 'InitProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            professor: {
                email: ''
            }
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await initProfessor(this.professor.email);

                if (200 <= response.status && response.status < 300) {
                    if(Cookies.get('emailProfessor')){
                        Cookies.remove('emailProfessor');
                    }
                    
                    Cookies.set('emailProfessor', `${this.professor.email}`, { expires: 10 });
                    
                    if(!response.data.professor.validated){
                        router.push({ name: 'ValidateProfessor'});
                    } else{
                        router.push({ name: 'LoginProfessor'});
                    }
                    
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