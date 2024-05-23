<!-- Componente Cubo3D.vue -->
<template>
    <footer>
        <router-link to="/"><img :src="imagem" alt="Img"></router-link>
        <nav>
            <ul>
                <li>
                    <router-link to="/">Sobre Nós</router-link>
                </li>
                <li>
                    <a href="https://github.com/VitorCarvalho67/Boot" target="_blank">GitHub</a>
                </li>
                <li>
                    <router-link to="/">Ranking</router-link>
                </li>
                <li>
                    <router-link to="/">Estágios</router-link>
                </li>
            </ul>
        </nav>
        <li></li>
        <p>Boot - 2024 ©Copyright</p>
    </footer>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../assets/logoHeader.png'

export default defineComponent({
    name: 'Footer',
    setup() {
        const router = useRouter();

        return {
            router,
            imagem: logo
        }
    }
});
</script>
<style lang="scss" scoped>
    @import "../scss/components/Footer.scss";
</style>