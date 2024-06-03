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
                <router-link to="/home">Saiba Mais</router-link>
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
<style lang="scss" scoped>
@import "../scss/layouts/_slides.scss";
</style>