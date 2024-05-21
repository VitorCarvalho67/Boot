<template>
    <Header />
    <div id="app">
        <main>
            Perfil do aluno View
        </main>
    </div>
    <Footer />

</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import router from '../router/index.js'
import Cookies from 'js-cookie';

export default {
    name: 'PublicPerfilAluno',
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss" scoped>
main {
    height: calc(100vh - 80px);
    background-color: $primary-color-dark;
    @include flex-center;
}

</style>