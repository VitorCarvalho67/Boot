<template>
    <Header />
    <main>
        <div class="box" id="box2">
            <form @submit.prevent="submitForm">
                <div class="content">
                    <h1>Termine seu registro</h1>
                    <div class="input-box" :class="{ 'focused': focused.nascimentoFocused }">
                        <label for="nascimento">Nascimento</label>
                        <input type="nascimento" id="nascimento" v-model="aluno.nascimento" @focus="focused.nascimentoFocused = true"
                            @blur="focused.nascimentoFocused = false" required>

                    </div>
                    
                    <div class="input-box" :class="{ 'focused': focused.enderecoFocused }">
                        <label for="endereco">Endereco</label>
                        <input type="adress" id="endereco" v-model="aluno.endereco"
                            @focus="focused.enderecoFocused = true" @blur="focused.enderecoFocused = false" required>
                    </div>

                    <div class="input-box" :class="{ 'focused': focused.turmaFocused }">
                        <label for="turma">Turma</label>

                        <input type="adress" id="turma" v-model="aluno.turma"
                            @focus="focused.turmaFocused = true" @blur="focused.turmaFocused = false" required>
                    </div>

                    <div class="input-box" :class="{ 'focused': focused.rmFocused }">
                        <label for="rm">RM</label>

                        <input type="adress" id="rm" v-model="aluno.rm"
                            @focus="focused.rmFocused = true" @blur="focused.rmFocused = false" required>
                    </div>

                    <div class="button-box">
                        <button v-show="allRequirementsMet" type="submit">Finalizar</button>
                        <button v-show="!allRequirementsMet" type="button">Finalizar</button>
                    </div>
                </div>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>

import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import logo from '../../assets/imageMain.png';

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { completeRegister } from '../../services/api/aluno';

export default {
    name: 'Complete',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            aluno: {
                email: '',
                nascimento: '',
                endereco: '',
                turma: '',
                rm: ''
            },
            alerts: {
                
            },
            focused: {
                nascimentoFocused: false,
                turmaFocused: false,
                enderecoFocused: false,
                rmFocused: false
            },
            imagem: logo
        }
    },
    computed: {
        allRequirementsMet() {
            return true
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await completeRegister({
                    email: this.aluno.email,
                    nascimento: this.aluno.nascimento,
                    endereco: this.aluno.endereco,
                    turma: this.aluno.turma,
                    rm: this.aluno.rm
                });

                if (response.status >= 200 && response.status < 300) {
                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    created(){
        this.aluno.email = Cookies.get('email-aluno');
    }
}
</script>

<style lang="scss" scoped>
main {
    height: calc(100vh - 80px);
    background-color: $primary-color-dark;
    @include flex(row-reverse, center, center);
}

.alert {
    font-size: .8rem;
    color: rgb(158, 20, 20);

    & .input-box input {
        margin-top: 2px;
    }
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

        .input-box {
            height: 65px;
            @include flex(column, center, flex-start);
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            background-color: $terciary-color-dark;
            border-left: solid 3px $terciary-color-dark;
            margin: 15px 0px;

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

        .password {
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
    }
}

p {
    width: 100%;
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


#box1 {
    @include flex-center;

    img {
        height: 80%;
        transform: rotatey(180deg);
    }
}

#box2 {
    background-color: $secondary-color-dark;
}
</style>