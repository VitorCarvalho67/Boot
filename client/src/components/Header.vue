<template>
    <header>
        <div>
            <router-link to="/"><img :src="imagem" alt="Img"></router-link>
        </div>
        <nav>
            <ul>
                <li><router-link to="/">Rankings</router-link></li>
                <li @click="toggleSpanView" @mouseenter="toggleSpanView" @mouseout="!toggleSpanView">
                    <a>Entre como</a>
                    <div v-if="spanView" @mouseenter="toggleSpanView" @mousedown="!toggleSpanView">
                        <ul>
                            <li><router-link to="/professor">Professor</router-link></li>
                            <li><router-link to="/funcionario">Funcionário</router-link></li>
                            <li><router-link to="/empresa">Empresa</router-link></li>
                        </ul>
                    </div>
                </li>
                <li><router-link to="/">Sobre nós</router-link></li>
                <li><router-link to="/register">Cadastre-se Agora</router-link></li>
                <li><router-link to="/login">Entrar</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../assets/logoHeader.png'

export default defineComponent({
    name: 'Header',
    setup() {
        const router = useRouter();
        const spanView = ref(false);

        function toggleSpanView() {
            spanView.value = !spanView.value;
        }

        return {
            router,
            imagem: logo,
            spanView,
            toggleSpanView,
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

    nav {
        >ul {
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

            li:nth-child(2) {
                cursor: pointer;
            }

            >li:last-child a {
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

                &:hover {
                    background-color: transparent;
                    border: solid 1px $primary-color-orange;
                    color: $primary-color-orange;
                }
            }
        }

        div {
            position: absolute;
            margin-top: 10px;
            background-color: $primary-color-dark;
            @include flex(column, center, flex-start);
            @include font-inter(200);
            border-radius: 5px;

            ul {
                list-style-type: none;
                padding: 0;

                li {
                    padding: 10px 0px;
                    color: $font-color-dark;
                    cursor: pointer;

                    a {
                        font-size: .7rem;

                        &:after {
                            height: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>