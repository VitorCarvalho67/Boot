<template>
    <aside :class="['aside-dashboard', view, { fixed: isFixed && view === 'yeah' }]">
        <div>
            <ul>
                <li :class="getClassForPage('home')">
                    <router-link to="/empresa">
                        <img :src="icons.home">
                        <p v-if="showPs">Home</p>
                    </router-link>
                </li>
                <li :class="getClassForPage('message')">
                    <router-link to="/empresa/mensagens">
                        <img :src="icons.send" />
                        <p v-if="showPs">Mensagens</p>
                    </router-link>
                </li>
                <li :class="getClassForPage('pesquisa')">
                    <router-link to="/empresa/search">
                        <img :src="icons.search" />
                        <p v-if="showPs">Pesquisa</p>
                    </router-link>
                </li>
                <li :class="getClassForPage('rankings')">
                    <router-link to="/empresa/ranking">
                        <img :src="icons.ranking" />
                        <p v-if="showPs">Rankings</p>
                    </router-link>
                </li>
            </ul>
            <ul>
                <li>
                    <button @click="logout">
                        <img :src="icons.config">
                        <p v-if="showPs">Sair</p>
                    </button>
                </li>
            </ul>
        </div>
        <button @click="changePsVisualization">
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
import configIcon from '../../assets/icons/saida.png';
import formIcon from '../../assets/icons/forma.png';
import tablesIcon from '../../assets/icons/grafico-horizontal-simples.png';
import { mixinEmpresa } from '../../util/authMixins';

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
                config: configIcon,
                form: formIcon,
                table: tablesIcon
            },
            showPs: true,
            view: 'yeah',
            isFixed: false
        }
    },
    methods: {
        getClassForPage(pageLoad) {
            return this.pageName === pageLoad ? "page" : "";
        },
        changePsVisualization() {
            this.showPs = !this.showPs;
            this.view = this.showPs ? 'yeah' : 'none';
            localStorage.setItem('asideDashboardState', JSON.stringify({
                showPs: this.showPs,
                view: this.view
            }));
            this.updateFixedState();
        },
        loadStateFromStorage() {
            const state = localStorage.getItem('asideDashboardState');
            if (state) {
                const parsedState = JSON.parse(state);
                this.showPs = parsedState.showPs;
                this.view = parsedState.view;
            }
        },
        checkScreenWidth() {
            if (window.innerWidth < 1000) {
                this.showPs = false;
                this.view = 'none';
                this.updateFixedState();
            } else {
                this.isFixed = false;
                if (this.showPs) {
                    this.view = 'yeah';
                }
            }
            localStorage.setItem('asideDashboardState', JSON.stringify({
                showPs: this.showPs,
                view: this.view
            }));
        },
        updateFixedState() {
            this.isFixed = (this.view === 'yeah' && window.innerWidth < 1000);
        }
    },
    mounted() {
        this.loadStateFromStorage();
        this.checkScreenWidth();
        window.addEventListener('resize', this.checkScreenWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkScreenWidth);
    },
    mixins: [mixinEmpresa]
});
</script>

<style lang="scss" scoped>
@import "../../scss/layouts/aluno/_asideDashboard.scss";
</style>