<template>
    <Header />
    <div id="app">
        <main>
            <p>Infelizmente, não localizamos essa página. Você pode voltar para a <router-link to="/">Página inicial</router-link>inicial.</p>
            <p>Código de erro: 404</p>
        </main>
    </div>
    <Footer />

</template>

<script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import { useRouter } from 'vue-router';

    export default {
        name: 'NotFound',
        components: {
            Header,
            Footer
        },
        setup() {
            const router = useRouter();

            return {
                router
            }
        }
    }
</script>