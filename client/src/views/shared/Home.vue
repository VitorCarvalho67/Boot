<template>
    <Header />
    <!-- <Slides /> -->
    <div id="app">
        <main>
            <div class="content">
                <div class="box" id="box1">
                    <div class="info">
                        <div class="infoTitle">
                            <img :src="imgHome" alt="Imagem Home">
                            <h1>Venha mostrar para o mundo o profissional que você é.</h1>
                        </div>
                        <p>Nossa missão é intermediar o processo de comunicação entre aluno, escola e empresa, de forma
                            que
                            facilite a introdução do aluno ao mercado de trabalho.Nossa missão é intermediar o processo
                            de comunicação entre aluno, escola e empresa, de forma
                            que
                            facilite a introdução do aluno ao mercado de trabalho.</p>
                        <router-link to="/home">Saiba Mais</router-link>
                    </div>
                </div>
                <div class="box" id="box2">
                </div>
            </div>
        </main>
    </div>
    <!-- <ChatComponent /> -->
    <Cards />
    <ContactUs />
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import ContactUs from '../../components/ContactUs.vue';
import Footer from '../../components/Footer.vue';
import Slides from '../../components/Slides.vue';
import Cards from '../../components/Cards.vue';
import ChatComponent from '../../components/ChatComponent.vue';
import imgHome from '../../assets/imgs/imageMain.png';

export default {
    name: 'Home',
    components: {
        Header,
        Slides,
        Cards,
        ContactUs,
        Footer,
        ChatComponent
    },
    setup() {
        return {
            imgHome
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/shared/_home.scss";
</style>