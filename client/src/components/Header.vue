<template>
    <header>
        <div>
            <router-link to="/"><img :src="imagem" alt="Img"></router-link>
        </div>
        <nav>
            <ul>
                <li><router-link to="/">Rankings</router-link></li>
                <li @click="toggleSpanView" @mouseenter="toggleSpanView" @mouseleave="toggleSpanView">
                    <a>Entre como</a>
                    <div v-if="spanView" @mouseenter="toggleSpanView" @mouseleave="toggleSpanView">
                        <ul>
                            <li><router-link to="/professor">Professor</router-link></li>
                            <li><router-link to="/funcionario">Funcionário</router-link></li>
                            <li><router-link to="/empresa">Empresa</router-link></li>
                        </ul>
                    </div>
                </li>
                <li><router-link to="/">Sobre Nós</router-link></li>
                <li><router-link to="/register">Cadastre-se Agora</router-link></li>
                <li class="hamburger">
                    <button @click="showAnside = true">
                        <img :src="imgHamburger" alt="">
                    </button>
                </li>
                <li><router-link to="/login">Entrar</router-link></li>
            </ul>
        </nav>
        <Anside :visible="showAnside" @close="showAnside = false" />
    </header>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../assets/imgs/logoHeader.png';
import hamburger from '../assets/icons/hamburger.png';
import Anside from './Anside.vue';

export default defineComponent({
    name: 'Header',
    components: {
        Anside
    },
    setup() {
        const router = useRouter();
        const spanView = ref(false);
        const showAnside = ref(false);

        function toggleSpanView() {
            spanView.value = !spanView.value;
        }

        return {
            router,
            imagem: logo,
            imgHamburger: hamburger,
            spanView,
            showAnside,
            toggleSpanView,
        };
    }
});
</script>


<style lang="scss" scoped>
@import "../scss/layouts/_header.scss";
</style>
