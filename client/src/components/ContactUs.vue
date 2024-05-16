<template>
    <section class="contact-us">
        <div class="box" id="box1">
            <h1>Fale conosco</h1>
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
            }
        }
    },
    methods: {
        async submitForm() {
            alert('tudo certo 🙏')
        }
    }
});
</script>

<style lang="scss" scoped>
.contact-us {
    background-color: $secondary-color-dark;
    @include flex(row, space-around, center);
    height: 50vh;
    width: 100%;

    .box {
        height: 100%;
        width: 25%;
        @include flex(column, center, flex-start);
        @include font-inter(300);

        h1 {
            color: $secondary-color-orange;
            @include font-inter(500);
            font-size: 2rem
        }

        p:last-child {
            color: $primary-color-orange;
        }

        form {
            @include flex(column, center, flex-start);

            input[type='text'] {
                border: none;
                border: solid 1px $font-color-dark;
                background-color: transparent;
                outline: none;
                color: $font-color-dark;
                padding: 8px;
                min-width: 350px;
                border-radius: 3px;

                &:focus {
                    border: solid 1px $secondary-color-orange;
                }
            }

            textarea {
                border: none;
                border: solid 1px $font-color-dark;
                background-color: transparent;
                outline: none;
                color: $font-color-dark;
                padding: 8px;
                min-width: 350px;
                border-radius: 3px;
                resize: none;

                &:focus {
                    border: solid 1px $secondary-color-orange;
                }
            }

            .btn-box {
                width: 100%;
                @include flex(column, center, flex-end);

                button {
                    padding: 8px 25px;
                    border-radius: 3px;
                    font-size: 1rem;
                    color: $font-color-dark;
                    background-color: $primary-color-orange;
                    border: none;
                    border: solid 1px $primary-color-orange;
                    transition: .1s linear;
                    cursor: pointer;

                    &:hover {
                        background-color: transparent;
                        border: solid 1px $primary-color-orange;
                        color: $primary-color-orange;
                    }
                }
            }
        }

        * {
            margin-top: 10px;
        }
    }

}
</style>