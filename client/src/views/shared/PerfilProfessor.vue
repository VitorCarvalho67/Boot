<template>
    <Header />
    <div id="app">
        <main>
            Perfil do professor View
        </main>
    </div>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import router from '../../router/index.js'
import Cookies from 'js-cookie';

export default {
    name: 'PublicPerfilProfessor',
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/shared/_perfilProfessor.scss";
</style>