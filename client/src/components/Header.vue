<template>
    <header>
        <div>
            <router-link :to="this.path"><img :src="imagem" alt="Img"></router-link>
        </div>
        <nav>
            <ul>
                <li><router-link to="/home">Rankings</router-link></li>
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
                <li><router-link to="/home">Sobre Nós</router-link></li>
                <li><router-link to="/register">Cadastre-se Agora</router-link></li>
                <li class="hamburger">
                    <button @click="showAside = true">
                        <img :src="imgHamburger" alt="">
                    </button>
                </li>
                <li><router-link to="/login">Entrar</router-link></li>
            </ul>
        </nav>
        <Aside :visible="showAside" @close="showAside = false" />
    </header>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../assets/imgs/logoHeader.png';
import hamburger from '../assets/icons/hamburger.png';
import Cookies from 'js-cookie';
import Aside from './Aside.vue';

export default defineComponent({
    name: 'Header',
    components: {
        Aside
    },
    data() {
        return {
            path: '/'
        }
    },
    setup() {
        const router = useRouter();
        const spanView = ref(false);
        const showAside = ref(false);

        function toggleSpanView() {
            spanView.value = !spanView.value;
        }

        return {
            router,
            imagem: logo,
            imgHamburger: hamburger,
            spanView,
            showAside,
            toggleSpanView,
        };
    },
    created() {
        let entidade = Cookies.get("entidade");

        switch (entidade) {
            case "aluno":
                this.path = "/aluno";
                break;

            case "admin":
                this.path = "/admin";
                break;

            case "professor":
                this.path = "/professor";
                break;

            case "funcionario":
                this.path = "/funcionario";
                break;

            case "empresa":
                this.path = "/empresa";
                break;

            default:
                break;
        }
    }
});
</script>

<style lang="scss" scoped>
@import "../scss/layouts/_header.scss";
</style>