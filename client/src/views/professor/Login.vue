<template>
    <Header />
    <div id="app">
        <main>
            <div class="box" id="box1">
                <nav>
                    <ul>
                        <li>
                            <p>Professor</p>
                        </li>
                        <li>
                            <router-link to="/login">É Aluno?</router-link>
                        </li>
                    </ul>
                </nav>
                <form @submit.prevent="submitForm">
                    <div class="content">
                        <h1>Bem vindo, Professor!</h1>
                        <p>Entre com suas credencias de acesso do professor</p>
                        <div class="input-box focused">
                            <div class="d1">
                                <label for="email">E-Mail</label>
                                <p>{{ professor.email }}</p>
                            </div>
                            <router-link to="/professor/init" class="editMail"></router-link>
                        </div>
                        <div class="input-box" :class="{ 'focused': passwordFocused }">
                            <div class="d1">
                                <label for="password">Senha</label>
                                <input :type="inputType" id="password" v-model="professor.password" required
                                       @focus="passwordFocused = true" @blur="passwordFocused = false">
                            </div>
                            <div class="d2">
                                <button type="button" @click="togglePasswordVisibility" :class="buttonClass"></button>
                            </div>
                        </div>
                        <p><router-link to="/professor/recovery">Esqueceu a senha?</router-link></p>
                    </div>
                    <div class="button-box">
                        <button type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import Cookies from 'js-cookie';
import router from '../../router/index.js';
import { loginProfessor } from '../../services/api/professor';

export default {
    name: 'LoginProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            professor: {
                email: '',
                password: ''
            },
            showPassword: false,
            emailFocused: false,
            passwordFocused: false,
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
                const response = await loginProfessor({
                    email: this.professor.email,
                    password: this.professor.password
                });

                if (200 <= response.status && response.status < 300) {
                    if(Cookies.get('token-professor')){
                        Cookies.remove('token-professor');
                    }
                    
                    document.cookie = `token-professor=${response.data.token}`;
                    router.push({path: "/professor"});
                    
                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        },
        async getEmail(){
            if(Cookies.get('email-init-professor')){
                this.professor.email = Cookies.get('email-init-professor');
            }
            else{
                router.push({path: "/professor/init"});
            }
        }
    },
    async created(){
        await this.getEmail();
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
    background-color: $secondary-color-dark;

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
                    width: 80px;
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
                    width: 60px;
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
            margin-top: 10px;
        }

        p {
            width: 100%;
            font-size: .8rem;
            color: $font-color-dark-2;
            @include flex(row, flex-start, center);
            @include font-inter(200);
            margin-bottom: 50px;
            
            width: 100%;
            margin-bottom: 10px;
            
            a {
                text-decoration: none;
                color: $font-color-dark-2;
                @include font-inter(300);
                font-size: .8rem;
            }
            
        }

        p:last-child {
            @include flex(row, flex-end, center);
        }

        .input-box {
            @include flex(row, flex-start, center);
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

            p {
                background-color: transparent;
                width: 90%;
                margin-top: 5px;
                outline: none;
                color: $font-color-dark;
                border: none;
                @include font-inter(400);
                font-size: 1rem;
                @include flex(row, flex-start, center);
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

            a.editMail {
                height: 20px;
                width: 20px;
                border: none;
                background-color: transparent;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                background-image: url('../../assets/icons/lapis.png');
                cursor: pointer;
                filter: invert(100%);
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
</style>