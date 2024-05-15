<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <p>Login</p>
                        </li>
                        <li>
                            <router-link to="/register">Cadastro</router-link>
                        </li>
                    </ul>
                </nav>
                <form @submit.prevent="submitForm">
                    <div class="content">
                        <h1>Bem vindo!</h1>
                        <p>Entre com suas credencias de acesso do aluno</p>
                        <div class="input-box" :class="{ 'focused': emailFocused }">
                            <label for="email">E-Mail</label>
                            <input type="email" id="email" v-model="userAluno.email" required
                                @focus="emailFocused = true" @blur="emailFocused = false">
                        </div>
                        <div class="input-box" :class="{ 'focused': passwordFocused }">
                            <div class="d1">
                                <label for="password">Senha</label>
                                <input :type="inputType" id="password" v-model="userAluno.password" required
                                    @focus="passwordFocused = true" @blur="passwordFocused = false">
                            </div>
                            <div class="d2">
                                <button type="button" @focus="passwordFocused = true" @blur="passwordFocused = false" 
                                @click="togglePasswordVisibility" :class="buttonClass"></button>
                            </div>
                        </div>
                    </div>
                    <p><router-link to="/recovery">Esqueceu a senha?</router-link></p>
                    <p><router-link to="/register">Ainda não possui conta?</router-link></p>
                    <div class="button-box">
                        <button type="submit">Entrar</button>
                    </div>
                </form>
            </div>
            <div class="box" id="box2">
                <img :src="imagem" alt="Img">
            </div>
        </main>
    </div>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import logo from '../../assets/imageMain.png';

import router from '../../router/index.js'
import Cookies from 'js-cookie';
import { loginAluno } from '../../services/api/aluno';

export default {
    name: 'Login',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAluno: {
                email: '',
                password: ''
            },
            emailFocused: false,
            passwordFocused: false,
            imagem: logo,
            showPassword: false,
        }
    },
    computed: {
        inputType() {
            return this.showPassword ? 'text' : 'password';
        },
        buttonClass() {
            return this.showPassword ? 'hide' : 'show';
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async submitForm() {
            try {
                const response = await loginAluno({
                    email: this.userAluno.email,
                    password: this.userAluno.password
                });

                if (response.status >= 200 && response.status < 300) {
                    if (Cookies.get('token')) {
                        Cookies.remove('token');
                    }
                    document.cookie = `token=${response.data.token}`;

                    router.push({ path: '/aluno'});
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
    @include flex-center;
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

        p{
            width: 100%;
            font-size: .8rem;
            @include flex(row, flex-start, center);
            color: $font-color-dark-2;
            @include font-inter(200);
            margin-bottom: 50px;
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

        .input-box:last-child {
            @include flex(row, flex-start, center);

            div {
                @include flex(column, center, flex-start)
            }

            .d1 {
                width: 95%;
            }

            .d2 {
                width: 5%;

                button {
                    height: 20px;
                    width: 20px;
                    border: none;
                    background-color: transparent;
                    background-position: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                    filter: invert(100%);
                    cursor: pointer;
                }

                .show {
                    background-image: url('../../assets/icons/olho-1.png');
                }

                .hide {
                    background-image: url('../../assets/icons/olho-2.png');
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

                &:hover{
                    background-color: $secondary-color-dark;
                    color: $primary-color-orange;
                }
            }
        }
    }
}

#box1 {
    background-color: $secondary-color-dark;
}

#box2 {
    @include flex-center;

    img {
        height: 80%;
        transform: rotatey(180deg);
    }
}
</style>