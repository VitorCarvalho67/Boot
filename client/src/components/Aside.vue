<template>
    <transition name="slide">
        <div class="overlay" @click="handleOutsideClick" v-if="visible">
            <aside @click.stop>
                <ul>
                    <li><router-link to="/home">Rankings</router-link></li>
                    <li @click="toggleSpanView">
                        <a>Entre como</a>
                        <div v-if="spanView">
                            <ul>
                                <li><router-link to="/professor">Professor</router-link></li>
                                <li><router-link to="/funcionario">Funcionário</router-link></li>
                                <li><router-link to="/empresa">Empresa</router-link></li>
                            </ul>
                        </div>
                    </li>
                    <li><router-link to="/home">Sobre Nós</router-link></li>
                    <li><router-link to="/register">Cadastre-se Agora</router-link></li>
                    <li><router-link to="/login">Entrar</router-link></li>
                </ul>
            </aside>
        </div>
    </transition>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../assets/imgs/logoHeader.png';

export default defineComponent({
    name: 'Aside',
    emits: ['close'],
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    setup(props, { emit }) {
        const router = useRouter();
        const spanView = ref(false);

        function toggleSpanView() {
            spanView.value = !spanView.value;
        }

        function handleOutsideClick() {
            spanView.value = false;
            closeAside();
        }

        function closeAside() {
            emit('close');
        }

        watch(() => props.visible, (newVal) => {
            if (!newVal) spanView.value = false;
        });

        return {
            router,
            imagem: logo,
            spanView,
            toggleSpanView,
            handleOutsideClick,
            closeAside,
        };
    }
});
</script>

<style lang="scss" scoped>
@import "../scss/layouts/_aside.scss";
</style>