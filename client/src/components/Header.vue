<template>
    <header>
        <div>
            <router-link to="/"><img :src="imagem" alt="Img"></router-link>
        </div>
        <nav>
            <ul>
                <li><router-link to="/">Rankings</router-link></li>
                <li><router-link to="/">Estágios</router-link></li>
                <li><router-link to="/">About Us</router-link></li>
                <li><router-link to="/register">Cadastre-se Agora</router-link></li>
                <li><router-link to="/login">Entrar</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../assets/logoHeader.png'

export default defineComponent({
    name: 'Header',
    setup() {
        const router = useRouter();

        return {
            router,
            imagem: logo
        }
    }
});
</script>

<style scoped lang="scss">

header {
    background-color: transparent;
    padding: 10px 80px;
    height: 80px;
    @include flex(row, space-between, center);
    background-color: $secondary-color-dark;

    div {
        width: 100px;

        img {
            height: 100%;
            width: 100%;
            @include flex(row, center, center);
        }
    }

    nav ul {
        @include flex(row, center, center);
        list-style-type: none;

        li a {
            margin-inline: 10px;
            text-decoration: none;
            text-transform: uppercase;
            color: $font-color-dark;
            font-size: .8rem;
            @include flex(column, center, flex-start);
            @include font-inter(400);
            @include line;
        }

        li:last-child a {
            background-color: $primary-color-orange;
            padding: 10px 20px;
            border-radius: 20px;
            color: $secondary-color-dark;
            border: solid 1px $primary-color-orange;
            transition: .1s linear;
            @include line;
            @include flex-center;

            &:after {
                height: 0;
            }

            &:hover{
                background-color: transparent;
                border: solid 1px $primary-color-orange;
                color: $primary-color-orange;
            }
        }
    }
}
</style>