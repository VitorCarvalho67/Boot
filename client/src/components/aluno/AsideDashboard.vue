<template>
    <aside>
        <div>
            <ul>
                <li :class="getClassForPage('home')">
                    <img :src="icons.home">
                    <router-link to="/aluno">Página inicial</router-link>
                </li>
                <li :class="getClassForPage('profile')">
                    <img :src="icons.user">
                    <router-link to="/aluno/me">Meu perfil</router-link>
                </li>
                <li :class="getClassForPage('pesquisa')">
                    <img :src="icons.search">
                    <router-link to="">Pesquisa</router-link>
                </li>
                <li :class="getClassForPage('rede')">
                    <img :src="icons.link">
                    <router-link to="/rede">Meus vínculos</router-link>
                </li>
                <li :class="getClassForPage('messsage')">
                    <img :src="icons.send">
                    <router-link to="">Mensagens</router-link>
                </li>
                <li :class="getClassForPage('estagios')">
                    <img :src="icons.job">
                    <router-link to="">Estágios</router-link>
                </li>
                <li :class="getClassForPage('rankings')">
                    <img :src="icons.ranking">
                    <router-link to="">Rankings</router-link>
                </li>
            </ul>
            <ul>
                <li :class="getClassForPage('config')">
                    <img :src="icons.config">
                    <router-link to="/config">Configurações</router-link>
                </li>
            </ul>
        </div>
        <button>
            <img :src="icons.angulo" alt="<">
        </button>
    </aside>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

// icons
import homeIcon from '../../assets/icons/casa.png';
import searchIcon from '../../assets/icons/procurar.png';
import linkIcon from '../../assets/icons/link.png';
import sendIcon from '../../assets/icons/aviao-de-papel.png';
import jobIcon from '../../assets/icons/estagio.png';
import rankingIcon from '../../assets/icons/trofeu.png';
import anguloIcon from '../../assets/icons/angulo.png';
import userIcon from '../../assets/icons/user.png';
import configIcon from '../../assets/icons/config.png';

export default defineComponent({
    name: 'AsideDashboard',
    emits: ['close'],
    props: {
        pageName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            icons: {
                home: homeIcon,
                search: searchIcon,
                link: linkIcon,
                send: sendIcon,
                job: jobIcon,
                ranking: rankingIcon,
                angulo: anguloIcon,
                user: userIcon,
                config: configIcon
            }
        }
    },
    methods: {
        getClassForPage(pageLoad) {
            return this.pageName === pageLoad ? "page" : "";
        }
    }
});
</script>

<style lang="scss" scoped>
@import "../../scss/layouts/aluno/_asideDashboard.scss";
</style>
