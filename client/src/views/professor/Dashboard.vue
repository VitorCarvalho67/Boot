<template>
    <Header />
    <main>
        <h1>Bem-vindo professor!</h1>
        <nav>
            <button @click="logout">Logout</button>
        </nav>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import router from '../../router/index.js';
import { mixinProfessor } from '../../util/mixins.js';

export default {
    name: 'Professor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            
        }
    },
    methods: {

    },
    mixins: [mixinProfessor],
    async created() {
        this.getToken();
    }
}

</script>

<style lang="scss" scoped>
nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 30px;

    a {
        text-decoration: none;
    }
}
</style>