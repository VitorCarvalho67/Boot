<template>
    <!-- main com carrossel -->
    <section>
        <div class="carrossel">
            <div class="slides">
                <div class="slide" v-for="(slide, index) in slides" :key="slide.id"
                    :class="{ active: index === activeSlide }">
                    <img :src="slide.image" :alt="slide.title">
                    <div class="slide-content">
                        <h2>{{ slide.title }}</h2>
                        <p>{{ slide.description }}</p>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button @click="previousSlide"></button>
                <button @click="nextSlide"></button>
            </div>
        </div>
        <div class="box">
            <div class="info">
            <h1>Venha mostrar para o mundo o profissional que você é.</h1>
            <p>Nossa missão é intermediar o processo de comunicação entre aluno, escola e empresa, de forma que
                facilite a introdução do aluno ao mercado de trabalho.</p>
            <router-link to="/">Saiba Mais</router-link>
        </div>
        </div>
    </section>


</template>

<script>
import { defineComponent } from 'vue';
import Slide1Image from '../assets/imgs/img1.jpg';
import Slide2Image from '../assets/imgs/img2.jpg';
import Slide3Image from '../assets/imgs/img3.jpg';
import Slide4Image from '../assets/imgs/img4.jpg';

export default defineComponent({
    name: 'Slides',
    data() {
        return {
            slides: [
                {
                    id: 1,
                    title: 'Slide 1',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                    image: Slide1Image
                },
                {
                    id: 2,
                    title: 'Slide 2',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                    image: Slide2Image
                },
                {
                    id: 3,
                    title: 'Slide 3',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                    image: Slide3Image
                },
                {
                    id: 4,
                    title: 'Slide 4',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                    image: Slide4Image
                }
            ],
            activeSlide: 0
        }
    },
    methods: {
        nextSlide() {
            this.activeSlide++;
            if (this.activeSlide > this.slides.length - 1) {
                this.activeSlide = 0;
            }
        },
        previousSlide() {
            this.activeSlide--;
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1;
            }
        }
    },
    mounted() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);  // mudando o tempo para 3 segundos
    }
});
</script>

<!-- Aqui o resto do seu código CSS -->

<style lang="scss" scoped>
section {
    padding: 30px;
    background-color: $terciary-color-dark;
    @include flex(row-reverse, space-around, center);
}

.box {
    width: 30%;
    height: 100%;
    @include flex(column, center, center);
    @include font-inter(400);

    * {
        margin: 20px 0;
    }

    .info {
        @include flex(column, center, flex-start);
        width: 70%;
    }

    h1 {
        color: $secondary-color-orange;
        @include font-inter(500);
    }

    p {
        width: 70%;
    }

    a {
        @include color($secondary-color-dark, $primary-color-orange);
        padding: 10px 20px;
        border-radius: 20px;
        text-decoration: none;
    }
}

.carrossel {
    position: relative;
    width: 50%;
    height: 70vh;
    @include flex(column, center, center);
    border-radius: 20px;
}

.slides {
    width: 100%;
    height: 100%;
    @include flex(column, center, center);
}

.slide {
    width: 100%;
    height: 100%;
    @include flex(row, center, center);
    position: absolute;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.slide.active {
    opacity: 1;
}

.slide img {
    width: 100%;
    height: 100%;
    opacity: 0.7;
    object-fit: cover;
    border-radius: 20px;
}

.slide-content {
    width: 100%;
    height: 100%;
    @include flex(column, center, center);
    position: absolute;
    color: white;
    text-align: center;

    h2 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.5rem;
    }
}

.buttons {
    width: 100%;
    height: 100%;
    @include flex(row, space-between, center);
    position: absolute;
    bottom: 0;
    padding: 1rem;

    button {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid rgb(68, 75, 77);
        background-color: transparent;
        color: #fff;
        cursor: pointer;
        width: 50px;
        height: 100%;
        opacity: 0.2;

        &:hover {
            background-color: rgb(53, 57, 59);
        }
    }
}
</style>