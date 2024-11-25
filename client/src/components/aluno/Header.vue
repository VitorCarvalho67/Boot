<template>
    <header>
        <div>
            <router-link :to="this.path"><img :src="imagem" alt="Img"></router-link>
        </div>
        <nav>
            <ul>
                <li><router-link to="/aluno/ranking">Rankings</router-link></li>
                <li><router-link to="/aluno/vagas">Estágios</router-link></li>
                <li><router-link to="/mensagens">Mensagens</router-link></li>
                <li class="hamburger">
                    <button @click="showAside = true">
                        <img :src="imgHamburger" alt="">
                    </button>
                </li>
                <li><router-link to="/aluno/me">Perfil</router-link></li>
            </ul>
        </nav>
        <Aside :visible="showAside" @close="showAside = false" />
    </header>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../../assets/imgs/logoHeader.png';
import hamburger from '../../assets/icons/hamburger.png';
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
@import "../../scss/layouts/_header.scss";
</style>