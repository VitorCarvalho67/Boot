<template>
    <Header />
    <div id="app">
        <main>
            Hello World!
            <br>
            <router-link to="/login">Login Aluno</router-link>
            <br>
            <router-link to="/admin/login">Login Admin</router-link>
            <br>
            <router-link to="/register">Register Aluno</router-link>
            <br>
            <router-link to="/register/token">Confirmação do token</router-link>
            <br>
            <router-link to="/recovery">Recuperar senha</router-link>
            <br>
            <router-link to="/recovery/validate">Token de recuperação de senha</router-link>
            <br>
            <router-link to="/admin/register/professor">Registro de professores pelo admin</router-link>
            <br>
            <router-link to="/admin/register/coordenador">Registro de Coordenador pelo admin</router-link>
            <br>
            <router-link to="/admin/register/curso">Registro de Curso pelo admin</router-link>
            <br>

        </main>
    </div>
    <Footer />

</template>

<script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';

    export default {
        name: 'Home',
        components: {
            Header,
            Footer
        }
    }
</script>

<style lang="scss" scoped>
    main {
        color: $red;
    }
</style>