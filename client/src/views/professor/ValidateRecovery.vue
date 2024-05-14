<template>
    <Header />
    <main>
        <div class="box">
            <nav>
                <ul>
                    <li>
                        <router-link to="/professor/init">Login</router-link>
                    </li>
                    <li>
                        <p>Recuperação de senha</p>
                    </li>
                </ul>
            </nav>
            <form @submit.prevent="submitForm">
                <h1>Termine sua recuperação</h1>
                <p>É necessário informar a senha temporária de recuperação enviada no email e criar um senha nova para logar na plataforma.</p>
                
                <div class="input-box email">
                    <div class="d1">
                        <p>{{ this.infoProfessor.email }}</p>
                    </div>
                    <div class="d2">
                        <router-link to="/professor/init" class="editMail"></router-link>
                    </div>
                </div>

                <div class="input-box" :class="{ 'focused': focused.temporaryPasswordFocused }">
                    <label>Senha Temporária enviada em seu e-mail</label>
                    <input id="temporaryPassword" v-model="infoProfessor.recoveryPass"
                        @focus="focused.temporaryPasswordFocused = true"
                        @blur="focused.temporaryPasswordFocused = false" required>
                </div>

                <div class="input-box password" :class="{ 'focused': focused.passwordFocused }">
                    <div class="d1">
                        <label for="newPassword">Nova Senha</label>
                        <input :type="inputType" id="newPassword" v-model="infoProfessor.newPass" @input="checkPasswords(infoProfessor.newPass, infoProfessor.confirmNewPass)"
                            @focus="focused.passwordFocused = true" @blur="focused.passwordFocused = false" required>
                        <span class="alert" v-show="alerts.alertUppercase">
                            A senha deve conter ao menos uma letra maiúscula(A-Z)
                        </span>
                        <span class="alert" v-show="alerts.alertLowercase">
                            A senha deve conter ao menos uma letra minúscula(a-z)
                        </span>
                        <span class="alert" v-show="alerts.alertNumber">
                            A senha deve conter ao menos um número (0-9)
                        </span>
                        <span class="alert" v-show="alerts.alertSpecial">
                            A senha deve conter ao menos um caractere especial (*, !, @, #, $, %, &, /, -, .)
                        </span>
                        <span class="alert" v-show="alerts.alertLenght">
                            A senha deve conter ao menos 8 caracteres
                        </span>
                    </div>
                    <div class="d2">
                        <button type="button" @click="togglePasswordVisibility" :class="buttonClass"
                            @focus="focused.passwordFocused = true" @blur="focused.passwordFocused = false"></button>
                    </div>
                </div>

                <div class="input-box password" :class="{ 'focused': focused.confirmFocused }">
                    <div class="d1">
                        <label for="confirmPassword">Confirmar Senha</label>
                        <input :type="inputTypeConfirm" id="confirmPassword" v-model="infoProfessor.confirmNewPass"
                            @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                            @input="checkPasswords(infoProfessor.newPass, infoProfessor.confirmNewPass)" required>
                        <span class="alert" v-show="alerts.alertPass"> As senhas devem ser iguais</span>
                    </div>
                    <div class="d2">
                        <button type="button" @click="togglePasswordConfirmVisibility"
                            @focus="focused.confirmFocused = true" @blur="focused.confirmFocused = false"
                            :class="buttonClassConfirm"></button>
                    </div>
                </div>
                <div class="button-box">
                    <button v-show="allRequirements" type="submit">Recuperar</button>
                    <button v-show="!allRequirements" type="button">Recuperar</button>
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
import { validateRecoveryMixin } from '../../util/mixins.js';
import { validateRecovery } from '../../services/api/professor';

export default {
    name: 'ValidateRecoveryProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            infoProfessor: {
                email: '',
                recoveryPass: '',
                newPass: '',
                confirmNewPass: ''
            },
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await validateRecovery({
                    email: this.infoProfessor.email,
                    recoveryPass: this.infoProfessor.recoveryPass,
                    newPass: this.infoProfessor.newPass
                });

                if (200 <= response.status && response.status < 300) {
                    router.push({ name: 'LoginProfessor' });

                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    mixins: [validateRecoveryMixin],
    created(){
        this.infoProfessor.email = Cookies.get('email-recovery-professor');
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
    background-color: $secondary-color-dark;
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
                
                p:last-child{
                    width: 170px;
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
            font-size: 2rem;
            margin-top: 10px;
        }

        >p {
            width: 100%;
            font-size: .8rem;
            @include flex(row, flex-start, center);
            color: $font-color-dark-2;
            @include font-inter(200);
            margin-bottom: 20px;
        }

        .input-box {
            height: 65px;
            @include flex(column, flex-start, center);
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            background-color: $terciary-color-dark;
            margin: 20px 0px;
            border-radius: 0px 5px 5px 0px;

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

            &.focused {
                border-left: solid 3px $secondary-color-orange;
            }

            label {
                letter-spacing: 1.5px;
                width: 100%;
                @include font-inter(200);
                font-size: .8rem;
                color: $font-color-dark-2;
            }

            p {
                background-color: transparent;
                width: 100%;
                margin-top: 5px;
                outline: none;
                color: $font-color-dark;
                border: none;
                @include font-inter(400);
                font-size: 1rem;
            }

            a {
                height: 18px;
                width: 18px;
                border: none;
                background-color: transparent;
                background-position: center;
                background-image: url('../../assets/icons/lapis.png');
                background-size: cover;
                background-repeat: no-repeat;
                filter: invert(100%);
                cursor: pointer;
                display: inline-block;
            }

            .d1 {
                width: 95%;

                .alert {
                    font-size: .8rem;
                    color: rgb(158, 20, 20);

                    & .input-box input {
                        margin-top: 2px;
                    }
                }
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
            }

            .alerts {
                @include flex(column, center, flex-start);
                font-size: .8rem;
                color: rgb(158, 20, 20);
            }
        }

        .email {
            background-color: transparent;
            @include flex(row, flex-start, center);
            height: 40px;

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
            }

        }

        .password{
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

        .token {
            width: 100%;
            @include flex(column, center, flex-start);

            label {
                padding-inline: 10px;
                letter-spacing: 1.5px;
                margin-top: 10px;
                @include font-inter(200);
                font-size: .8rem;
                color: $font-color-dark-2;
            }

            .box-token {
                @include flex(row, space-around, center);
                margin: 5px 0px 10px 0px;

                input {
                    border: none;
                    outline: none;
                    border-radius: 7px;
                    height: 65px;
                    width: 12%;
                    font-size: 1.8rem;
                    text-align: center;
                    @include flex-center;
                    color: $font-color-dark;
                    caret-color: $font-color-dark;
                    @include font-inter(500);
                    background-color: $terciary-color-dark;

                    &:focus {
                        border: solid 2px $primary-color-orange;
                    }

                    text-transform: uppercase
                }
            }
        }

        .button-box {
            width: 100%;
            margin-top: 10px;
            @include flex(row, flex-start, center);

            button {
                padding: 12px 75px;
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