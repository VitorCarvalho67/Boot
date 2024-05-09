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
main {
    height: calc(100vh - 80px);
    background-color: $primary-color-dark;
    @include flex-center;
}

.box {
    width: 50%;
    height: 30%;
    @include flex-center;

    .img {
        width: 30%;
        height: 100%;
        background-image: url(../assets/image404.png);
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .info {
        width: 70%;
        height: 100%;
        @include flex(column, flex-start, flex-start);
        padding: 20px;

        h1 {
            width: 80%;
            font-size: 2rem;
            @include font-inter(300);
            color: $font-color-dark;
        }

        .p {
            margin-top: 10px;
            width: 80%;
            font-size: 1rem;
            @include font-inter(300);
            color: $font-color-dark-2;
        }

        .code {
            display: inline;
            margin-top: 0;
            width: auto;
            font-size: 1rem;
            @include font-inter(300);
            color: $primary-color-orange;
        }

        a {
            border: none;
            cursor: pointer;
            text-decoration: none;
            height: 40px;
            width: 140px;
            color: $secondary-color-dark;
            border: solid 1px $primary-color-orange;
            background-color: $primary-color-orange;
            font-size: .9rem;
            border-radius: 3px;
            margin-top: 12%;
            transition: .1s linear;
            @include font-inter(400);
            @include flex-center;

            &:hover {
                background-color: $secondary-color-dark;
                color: $primary-color-orange;
            }
        }
    }
}
</style>