<template>
    <Header />
    <div id="app">
        <main>
            <div class="box">
                <div class="img">
                    <!-- img -->
                </div>
                <div class="info">
                    <h1>Ops... Acho que você se perdeu</h1>
                    <p class="p">Infelizmente, não localizamos essa página. Você pode voltar para a
                        página inicial. <span class="code">404 - Not Found</span>
                    </p>
                    <router-link to="/home">Home</router-link>
                </div>
            </div>
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

<style lang="scss" scoped>
    @import "../scss/pages/_notFound.scss";
</style>