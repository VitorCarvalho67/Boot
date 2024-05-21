<template>
    <section class="Cards">
        <h1>Por que devo usar a BOOT?</h1>
        <h2>Aqui estão alguns motivos pelos quais você deveria usar a plataforma BOOT.</h2>
        <div class="wrapper">
            <i class="fa-solid fa-angle-left" @click="scrollCarousel('left')"></i>
            <ul class="carousel" ref="carousel">
                <li class="card">
                    <div class="img">

                    </div>
                    <h2>Desenvolvimento</h2>
                    <span>Código aberto e feito pela comunidade</span>
                </li>
                <li class="card">
                    <div class="img">

                    </div>
                    <h2>Simplificação</h2>
                    <span>Elaboração automática de seus perfis profissionais</span>
                </li>
                <li class="card">
                    <div class="img">

                    </div>
                    <h2>Eficiente</h2>
                    <span>Software intuitivo com sistema de busca eficiente</span>
                </li>
                <li class="card">
                    <div class="img">

                    </div>
                    <h2>Visibilidade empresarial</h2>
                    <span>Facilidade de acesso aos perfis em procura por empresas</span>
                </li>
            </ul>
            <i class="fa-solid fa-angle-right" @click="scrollCarousel('right')"></i>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

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
            // carousel.value.classList.remove('dragging');
        }

        function scrollCarousel(direction) {
            carousel.value.scrollLeft += direction === 'left' ? -firstCardWidth.value : firstCardWidth.value;
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
            }, 2500);
        }

        return {
            carousel,
            scrollCarousel
        };
    }
};
</script>

<style lang="scss" scoped>
.Cards {
    background-color: $terciary-color-dark;
    padding: 100px;
    min-height: 400px;

    @include flex(column, flex-start, center);

    h1,
    h2 {
        width: 80%;
    }

    h1 {
        font-size: 2rem;
        @include font-inter(700);
        color: $secondary-color-orange;
    }

    h2 {
        font-size: 1.3rem;
        @include font-inter(300);
        color: $font-color-dark-2;
    }

    .wrapper {
        max-width: 1100px;
        width: 100%;
        margin: 80px 0px 20px 0px;
        position: relative;
    }

    .wrapper i {
        height: 100%;
        width: 50px;
        top: 0px;
        cursor: pointer;
        position: absolute;
        background-image: url('../assets/icons/angulo.png');
        background-position: center;
        background-size: 50px;
        background-repeat: no-repeat;
        filter: invert(100%);
        opacity: .7;
        transition: transform 0.1s linear;
    }

    .wrapper i:first-child {
        left: -22px;
    }

    .wrapper i:last-child {
        right: -22px;
        transform: rotatey(180deg);
    }

    .wrapper .carousel {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: calc((100% / 3) - 12px);
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 16px;
        border-radius: 8px;
        scroll-behavior: smooth;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        &.no-transition {
            scroll-behavior: auto;
        }

        &.dragging {
            scroll-snap-type: none;
            scroll-behavior: auto;

            .card {
                cursor: grab;
                user-select: none;
            }
        }

        :where(.card, .img) {
            @include flex(column, center, flex-start);
        }

        .card {
            scroll-snap-align: start;
            height: 342px;
            list-style: none;
            background: $secondary-color-dark;
            cursor: pointer;
            padding-bottom: 15px;
            flex-direction: column;
            border-radius: 8px;

            .img {
                background: $primary-color-dark;
                height: 80%;
                width: 100%;
                border-radius: 8px 8px 0px 0px;

                img {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }

            h2 {
                @include font-inter(400);
                font-size: 1.5rem;
                color: $font-color-dark;
                padding: 10px;
            }

            span {
                @include font-inter(200);
                font-size: .9rem;
                color: $font-color-dark-2;
                padding: 10px;
            }
        }
    }

    @media screen and (max-width: 900px) {
        .wrapper .carousel {
            grid-auto-columns: calc((100% / 2) - 9px);
        }
    }

    @media screen and (max-width: 600px) {
        .wrapper .carousel {
            grid-auto-columns: 100%;
        }
    }
}
</style>