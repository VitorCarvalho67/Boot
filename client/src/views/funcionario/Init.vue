<template>
    <Header />
    <main>
        <div class="box">
            <form @submit.prevent="submitForm">
                <h1>Entre como profissional</h1>
                <p class="p">Para acessar sua área exclusiva de profissionais na plataforma, por favor, insira seu
                    e-mail cadastrado e seu cargo</p>
                <div class="input-box" :class="{ 'focused': emailFocused }">
                    <label for="email">E-Mail</label>
                    <input type="email" id="email" v-model="funcionario.email" required @focus="emailFocused = true"
                        @blur="emailFocused = false">
                </div>
                <div class="input-box input-box2" :class="{ 'focused': cargoFocused }">
                    <label for="cargo">Cargo</label>
                    <select id="cargo" name="cargo" v-model="funcionario.cargo" required @focus="cargoFocused = true"
                        @blur="cargoFocused = false">
                        <option value="" disabled>Selecione um cargo</option>
                        <option value="GESTAO">Gestão</option>
                        <option value="ADMINISTRACAO">Administração</option>
                        <option value="DIRECAO">Direção</option>
                        <option value="ORIENTACAO">Orientação</option>
                    </select>
                </div>
                <p><router-link to="/recovery">Acesse como</router-link></p>
                <div class="button-box">
                    <button type="submit">Continuar</button>
                </div>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { initFuncionario } from '../../services/api/funcionario';

export default {
    name: 'InitFuncionario',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            funcionario: {
                email: '',
                cargo: ''
            },
            emailFocused: false
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await initFuncionario(
                    this.funcionario.email,
                    this.funcionario.cargo
                );

                if (200 <= response.status && response.status < 300) {
                    if (Cookies.get('email-init-funcionario')) {
                        Cookies.remove('email-init-funcionario');
                    }

                    Cookies.set('email-init-funcionario', `${this.funcionario.email}`, { expires: 10 });

                    if (!response.data.funcionario.validated) {
                        router.push({ name: 'ValidateFuncionario' });
                    } else {
                        router.push({ name: 'LoginFuncionario' });
                    }

                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
main {
    height: calc(100vh - 80px);
    background-color: $primary-color-dark;
    @include flex(row, center, center);
}

.box {
    height: 65%;
    width: 30%;
    border-radius: 20px;
    padding: 20px;
    color: $font-color-dark;

    nav {
        width: 100%;

        ul {
            @include flex(row, flex-start, center);

            li {
                font-size: .9rem;
                @include font-inter(300);
                margin-inline: 20px;

                p {
                    @include flex(column, center, center);
                    @include font-inter(400);
                    width: 60px;
                    @include line;

                    &:after {
                        width: 100%;
                        height: 3px;
                        margin-top: 3px;
                        background-color: $secondary-color-orange;
                    }

                    &:hover::after {
                        animation: none;
                    }
                }

                a {
                    text-decoration: none;
                    color: $font-color-dark-2;
                    @include flex(column, center, center);
                    @include font-inter(400);
                    width: 80px;
                    @include line;

                    &:after {
                        margin-top: 3px;
                        height: 3px;
                        background-color: $secondary-color-orange;
                    }
                }
            }
        }
    }

    form {
        padding: 20px;

        h1 {
            @include font-inter(300);
            font-size: 2.5rem;
            margin-top: 50px;
        }

        .p {
            width: 100%;
            font-size: .8rem;
            @include flex(row, flex-start, center);
            color: $font-color-dark-2;
            @include font-inter(200);
            margin-bottom: 60px;
        }

        .input-box {
            @include flex(column, center, flex-start);
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            background-color: $terciary-color-dark;
            border-left: solid 3px $terciary-color-dark;
            margin: 25px 0px;

            &.focused {
                border-left: solid 3px $secondary-color-orange;
                border-radius: 0px 5px 5px 0px;
            }

            label {
                letter-spacing: 1.5px;
                @include font-inter(200);
                font-size: .8rem;
                color: $font-color-dark-2;
            }

            input {
                background-color: transparent;
                width: 100%;
                margin-top: 5px;
                outline: none;
                color: $font-color-dark;
                border: none;
                @include font-inter(400);
                font-size: 1rem;
            }

            div input:last-child {
                font-size: 1rem;
            }
        }

        .input-box2 {
            width: 180px;

            select {
                background-color: transparent;
                border: none;
                color: $font-color-dark;
                @include font-inter(400);

                option {
                    border: none;
                    color: $terciary-color-dark;
                    @include font-inter(400);
                }
            }

        }

        >p {
            width: 100%;
            margin-bottom: 10px;
            @include flex(row, flex-end, center);

            a {
                text-decoration: none;
                color: $font-color-dark-2;
                @include font-inter(300);
                font-size: .8rem;
            }
        }

        .button-box {
            width: 100%;
            margin-top: 40px;
            @include flex(row, flex-start, center);

            button {
                height: 40px;
                width: 140px;
                background-color: $primary-color-orange;
                border: none;
                border-radius: 3px;
                @include font-inter(400);
                font-size: .9rem;
                color: $secondary-color-dark;
                border: solid 1px $primary-color-orange;
                cursor: pointer;
                transition: .1s linear;

                &:hover {
                    background-color: $secondary-color-dark;
                    color: $primary-color-orange;
                }
            }
        }
    }
}
</style>