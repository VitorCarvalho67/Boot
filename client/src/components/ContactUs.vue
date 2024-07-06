<template>
    <section class="contact-us">
        <div class="box" id="box1">
            <h1>Fale Conosco</h1>
            <p>
                Estamos comprometidos em oferecer soluções inovadoras e de qualidade que superem suas expectativas,
                tornando sua experiência conosco memorável.
            </p>
            <p>
                bootservicesmail@gmail.com
            </p>
        </div>
        <div class="box" id="box2">
            <form @submit.prevent="submitForm">
                <li v-if="errorMessage" class="alertBox alertBox-error">{{ errorMessage }}</li>
                <li v-if="sucessMessage" class="alertBox alertBox-sucess">{{ sucessMessage }}</li>
                <input type="text" id="name" v-model="contact.name" placeholder="Nome" required>
                <input type="text" id="name" v-model="contact.email" placeholder="Email" required>
                <input type="text" id="name" v-model="contact.assunto" placeholder="Assunto" required>
                <textarea name="" id="" cols="30" rows="8" v-model="contact.msg" placeholder="Mensagem"></textarea>
                <div class="btn-box">
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    </section>
</template>


<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ContactUs',
    setup() {
        const router = useRouter();

        return {
            router,
            contact: {
                name: '',
                email: '',
                assunto: '',
                msg: ''
            },
            errorMessage: '',
            sucessMessage: ''
        }
    },
    methods: {
        async submitForm() {
            this.sucessMessage = 'tudo certo 👍';
        }
    }
});
</script>
<style lang="scss" scoped>
@import "../scss/layouts/_contactUs.scss";
</style>