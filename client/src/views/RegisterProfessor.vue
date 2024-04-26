<template>
    <Header />
    <div id="app">
        <main>
            <form @submit.prevent="submitForm">
            </form>
        </main>
    </div>
    <Footer />

</template>

<script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import Cookies from 'js-cookie';
    import router from '../router/index.js'
    import { AuthAdmin } from '../services/api';

    export default {
        name: 'RegisterProfessor',
        components: {
            Header,
            Footer
        },
        methods: {
            async Authenticate() {
                const token = Cookies.get('token');
                if(token == undefined){
                    router.push({name : 'LoginAdmin'});
                }else{
                    try {
                        
                    } catch (error) {
                        alert(error);
                    }
                    alert(token);
                }
            }
        },
        async created() {
            await this.Authenticate();
        }
    }

</script>

<style lang="scss" scoped>
</style>