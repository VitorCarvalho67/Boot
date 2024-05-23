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
                <li><router-link to="/">Sobre Nós</router-link></li>
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
<style lang="scss" scoped>
    @import "../scss/components/Header.scss";
</style>