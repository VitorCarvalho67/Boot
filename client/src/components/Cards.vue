<template>
    <section class="Cards">
        <h1>Por que devo usar a BOOT?</h1>
        <h2>Aqui estão alguns motivos pelos quais você deveria usar a plataforma BOOT.</h2>
        <div class="wrapper">
            <i class="fa-solid fa-angle-left" @click="scrollCarousel('left')"></i>
            <ul class="carousel" ref="carousel">
                <li class="card" v-for="(slide, index) in slides" :key="index">
                    <div class="img">
                        <img :src="slide.image" :alt="slide.title">
                    </div>
                    <h2>{{ slide.title }}</h2>
                    <span>{{ slide.description }}</span>
                </li>
            </ul>
            <i class="fa-solid fa-angle-right" @click="scrollCarousel('right')"></i>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Slide1Image from '../assets/imgs/img4.jpg';
import Slide2Image from '../assets/imgs/img2.jpg';
import Slide3Image from '../assets/imgs/img3.jpg';
import Slide4Image from '../assets/imgs/img1.jpg';

export default {
    name: 'Cards',
    setup() {
        const carousel = ref(null);
        const isDragging = ref(false);
        const startX = ref(0);
        const startScrollLeft = ref(0);
        const timeoutId = ref(null);
        const firstCardWidth = ref(0);
        const cardPerView = ref(0);

        const slides = ref([
            { image: Slide1Image, title: 'Desenvolvimento', description: 'Código aberto e feito pela comunidade' },
            { image: Slide2Image, title: 'Simplificação', description: 'Elaboração automática de seus perfis profissionais' },
            { image: Slide3Image, title: 'Eficiente', description: 'Software intuitivo com sistema de busca eficiente' },
            { image: Slide4Image, title: 'Visibilidade', description: 'Facilidade de acesso aos perfis em procura por empresas' },
        ]);

        onMounted(() => {
            firstCardWidth.value = carousel.value.querySelector('.card').offsetWidth;
            cardPerView.value = Math.round(carousel.value.offsetWidth / firstCardWidth.value);

            initInfiniteScroll();
            autoPlay();

            carousel.value.addEventListener('mousedown', dragStart);
            carousel.value.addEventListener('mousemove', dragging);
            document.addEventListener('mouseup', dragStop);
            carousel.value.addEventListener('scroll', infiniteScroll);
            carousel.value.addEventListener('mouseenter', () => clearTimeout(timeoutId.value));
            carousel.value.addEventListener('mouseleave', autoPlay);
        });

        onUnmounted(() => {
            clearTimeout(timeoutId.value);
            document.removeEventListener('mouseup', dragStop);
        });

        function dragStart(e) {
            isDragging.value = true;
            startX.value = e.pageX;
            startScrollLeft.value = carousel.value.scrollLeft;
            carousel.value.classList.add('dragging');
        }

        function dragging(e) {
            if (!isDragging.value) return;
            const x = e.pageX - startX.value;
            carousel.value.scrollLeft = startScrollLeft.value - x;
        }

        function dragStop() {
            isDragging.value = false;
            carousel.value.classList.remove('dragging');
        }

        function scrollCarousel(direction) {
            carousel.value.scrollLeft += direction === 'left' ? -firstCardWidth.value : firstCardWidth.value;
            autoPlay();
        }

        function initInfiniteScroll() {
            const children = Array.from(carousel.value.children);
            children.slice(-cardPerView.value).reverse().forEach(card => {
                carousel.value.insertAdjacentHTML("afterbegin", card.outerHTML);
            });
            children.slice(0, cardPerView.value).forEach(card => {
                carousel.value.insertAdjacentHTML("beforeend", card.outerHTML);
            });
        }

        function infiniteScroll() {
            const totalWidth = carousel.value.scrollWidth - carousel.value.offsetWidth;
            if (carousel.value.scrollLeft === 0) {
                carousel.value.scrollLeft = totalWidth - carousel.value.offsetWidth;
            } else if (Math.ceil(carousel.value.scrollLeft) >= totalWidth) {
                carousel.value.scrollLeft = carousel.value.offsetWidth;
            }
        }

        function autoPlay() {
            if (window.innerWidth < 800) return;
            timeoutId.value = setTimeout(() => {
                scrollCarousel('right');
            }, 4000);
        }

        return {
            carousel,
            slides,
            scrollCarousel
        };
    }
};
</script>
<style lang="scss" scoped>
@import "../scss/layouts/_cards.scss";
</style>