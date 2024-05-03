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
                const professorResult = await initProfessor(this.professor.email);

                console.log(professorResult);

                alert(professorResult.professor.validated);

                if(Cookies.get('emailProfessor')){
                    Cookies.remove('emailProfessor');
                }
                
                Cookies.set('emailProfessor', `${this.professor.email}`, { expires: 10 });
                
                if(!professorResult.professor.validated){
                    router.push({ name: 'ValidateProfessor'});
                } else{
                    router.push({ name: 'LoginProfessor'});
                }

            } catch (error) {
                alert('Erro ao buscar professor');
            }

        }
    }
}
</script>