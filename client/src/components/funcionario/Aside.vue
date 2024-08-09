<template>
    <transition name="slide">
        <div class="overlay" @click="handleOutsideClick" v-if="visible">
            <aside @click.stop>
                <ul>
                    <li><router-link to="">Home</router-link></li>
                </ul>
            </aside>
        </div>
    </transition>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../../assets/imgs/logoHeader.png';

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
@import "../../scss/layouts/_aside.scss";
</style>