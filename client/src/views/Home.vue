<template>
    <Header />
    <Slides />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <div class="info">
                    <h1>Venha mostrar para o mundo o profissional que você é.</h1>
                    <p>Nossa missão é intermediar o processo de comunicação entre aluno, escola e empresa, de forma que
                        facilite a introdução do aluno ao mercado de trabalho.</p>
                    <router-link to="/">Saiba Mais</router-link>
                </div>
            </div>
            <div class="box" id="box2">
            </div>
        </main>
        <section class="aboutUs">
            <H1>About Us</H1>
            <br>
            <br>
            <br>
        </section>
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
    </div>
    <Footer />

</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Slides from '../components/Slides.vue';

export default {
    name: 'Home',
    components: {
        Header,
        Slides,
        Footer
    }
}
</script>

<style lang="scss" scoped>
main {
    background-color: $secondary-color-blue;
    @include flex(row, space-evenly, center);
    height: 70vh;

    .box {
        width: 30%;
        height: 100%;
        @include flex(column, center, center);
        @include font-inter(400);

        * {
            margin: 20px 0;
        }

        .info{
            @include flex(column, center, flex-start);
            // width: 40%;
        }

        h1 {
            color: $secondary-color-orange;
            @include font-inter(500);
        }

        p {
            width: 70%;
        }

        a {
            background-color: $primary-color-orange;
            padding: 10px 20px;
            border-radius: 20px;
            text-decoration: none;
            @include color($primary-color-blue, $primary-color-orange) ;
        }
    }

    #box2 {
        background-image: url(../assets/imageMain.png);
        background-position: center;
        background-size: 80%;
        transform: rotateY(180deg);
        background-repeat: no-repeat;
    }
}

.aboutUs{
    padding: 20px 40px;
    background-color: $primary-color-blue;

    h1{
        @include font-inter(500);
        color: $secondary-color-orange;
        height: 10vh;
        @include flex(column, center, flex-start);
    }
}
</style>