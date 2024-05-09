<template>
    <Header />
    <!-- <Slides /> -->
    <div id="app">
        <main>
            <div class="content">
                <div class="box" id="box1">
                    <div class="info">
                        <h1>Venha mostrar para o mundo o profissional que você é.</h1>
                        <p>Nossa missão é intermediar o processo de comunicação entre aluno, escola e empresa, de forma
                            que
                            facilite a introdução do aluno ao mercado de trabalho.Nossa missão é intermediar o processo
                            de comunicação entre aluno, escola e empresa, de forma
                            que
                            facilite a introdução do aluno ao mercado de trabalho.</p>
                        <router-link to="/">Saiba Mais</router-link>
                    </div>
                </div>
                <div class="box" id="box2">
                </div>
            </div>
        </main>
    </div>
    <Cards />
    <ContactUs />
    <Footer />

</template>

<script>
import Header from '../components/Header.vue';
import ContactUs from '../components/ContactUs.vue';
import Footer from '../components/Footer.vue';
import Slides from '../components/Slides.vue';
import Cards from '../components/Cards.vue';

export default {
    name: 'Home',
    components: {
        Header,
        Slides,
        Cards,
        ContactUs,
        Footer,
    }
}
</script>

<style lang="scss" scoped>
main {
    min-height: auto;
    background-color: $secondary-color-dark;

    >h1 {
        text-align: center;
        padding-top: 20px;
        @include font-inter(700);
        letter-spacing: .3cm;
        color: $primary-color-orange;
    }

    .content {
        @include flex(row-reverse, center, center);
        height: 55vh;
        width: 100%;

        .box {
            padding: 30px;
            width: 40%;
            height: 100%;
            @include flex(column, center, center);
            @include font-inter(400);

            * {
                margin: 20px 0;
            }

            .info {
                @include flex(column, center, flex-start);

                h1 {
                    color: $secondary-color-orange;
                    font-size: 2rem;
                    @include font-inter(700);
                }

                p {
                    width: 70%;
                }

                a {
                    background-color: $primary-color-orange;
                    padding: 10px 20px;
                    border-radius: 20px;
                    text-decoration: none;
                    transition: .7s;
                    border: solid 1px $primary-color-orange;
                    background-color: transparent;
                    color: $primary-color-orange;
                    
                    &:hover {
                        @include color($secondary-color-dark, $primary-color-orange);
                    }
                }
            }

        }

        #box2 {
            background-image: url(../assets/imageMain.png);
            background-position: center;
            background-size: 50%;
            background-repeat: no-repeat;
        }
    }

}

.aboutUs {
    padding: 20px 40px;
    background-color: $secondary-color-dark;

    h1 {
        @include font-inter(500);
        color: $secondary-color-orange;
        height: 10vh;
        @include flex(column, center, flex-start);
    }
}
</style>