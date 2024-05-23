<template>
    <Header />
    <main>
        <div class="box">
            <nav>
                <ul>
                    <li>
                        <router-link to="/empresa/login">Login</router-link>
                    </li>
                    <li>
                        <p>Cadastro</p>
                    </li>
                </ul>
            </nav>
            <form @submit.prevent="submitForm">
                <div class="content">
                    <h1>Finalize seu registro</h1>
                    <p>Para sua segurança te enviamos um código de verificação no email inserido anteriormente, termine seu registro inserindo-o abaixo
                    </p>

                    <div class="input-box focused">
                        <div class="d1">
                            <label for="">CNPJ</label>
                            <p>{{ empresa.cnpjExibido }}</p>
                        </div>
                        <div class="d2">
                            <router-link to="/empresa/register" class="editMail"></router-link>
                        </div>
                    </div>
                    <div class="token">
                        <label>Token de acesso</label>
                        <div class="box-token">
                            <div class="box-token">
                                <input ref="token1" type="text" pattern="[0-9]" v-model="empresa.token.token1"
                                    maxlength="1" @keydown="handleKeyDown($event, 1)" @paste="handlePaste($event, 1)">
                                <input ref="token2" type="text" pattern="[0-9]" v-model="empresa.token.token2"
                                    maxlength="1" @keydown="handleKeyDown($event, 2)" @paste="handlePaste($event, 2)">
                                <input ref="token3" type="text" pattern="[0-9]" v-model="empresa.token.token3"
                                    maxlength="1" @keydown="handleKeyDown($event, 3)" @paste="handlePaste($event, 3)">
                                <input ref="token4" type="text" pattern="[0-9]" v-model="empresa.token.token4"
                                    maxlength="1" @keydown="handleKeyDown($event, 4)" @paste="handlePaste($event, 4)">
                                <input ref="token5" type="text" pattern="[0-9]" v-model="empresa.token.token5"
                                    maxlength="1" @keydown="handleKeyDown($event, 5)" @paste="handlePaste($event, 5)">
                                <input ref="token6" type="text" pattern="[0-9]" v-model="empresa.token.token6"
                                    maxlength="1" @keydown="handleKeyDown($event, 6)" @paste="handlePaste($event, 6)">
                            </div>
                        </div>
                    </div>
                    <section class="voltar">
                        <router-link to="/empresa/register">Esse não é seu CNPJ?</router-link>
                    </section>
                    <div class="button-box">
                        <button type="submit">Finalizar</button>
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

import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { validateEmpresa } from '../../services/api/empresa';

export default {
    name: 'ValidateRegisterEmpresa',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            empresa: {
                cnpj: '',
                cnpjExibido: '',
                token: {
                    token1: '',
                    token2: '',
                    token3: '',
                    token4: '',
                    token5: '',
                    token5: '',
                    token6: ''
                }
            }
        }
    },
    methods: {
        handleKeyDown(event, index) {
            const maxLength = 1;
            const input = event.target;

            if (event.key >= '0' && event.key <= '9') {
                if (input.value.length === 0) {
                    input.value = event.key;
                    this.empresa.token[`token${index}`] = event.key;
                } else if (index < 6) {
                    const nextInput = this.$refs[`token${index + 1}`];
                    event.preventDefault();
                    nextInput.focus();
                    nextInput.setSelectionRange(0, 0);
                    nextInput.value = event.key;
                    this.empresa.token[`token${index + 1}`] = event.key;
                }
            } else if (event.key === 'Backspace') {
                if (input.value.length === 0) {
                    const previousInput = this.$refs[`token${index - 1}`];
                    if (previousInput) {
                        previousInput.focus();
                    }
                } else {
                    input.value = '';
                    this.empresa.token[`token${index}`] = '';
                }
            } else if (event.key === 'ArrowLeft') {
                const previousInput = this.$refs[`token${index - 1}`];
                if (previousInput) {
                    event.preventDefault();
                    previousInput.focus();
                    previousInput.setSelectionRange(maxLength, maxLength);
                }
            } else if (event.key === 'ArrowRight') {
                const nextInput = this.$refs[`token${index + 1}`];
                if (nextInput) {
                    event.preventDefault();
                    nextInput.focus();
                    nextInput.setSelectionRange(0, 0);
                }
            }
        },
        handlePaste(event, index) {
            event.preventDefault();

            const pastedText = event.clipboardData.getData('text/plain').trim();

            if (pastedText.length > 6) {
                return;
            }

            if (!/^\d+$/.test(pastedText)) {
                return;
            }

            const characters = pastedText.split('');

            characters.forEach((char, i) => {
                const nextIndex = index + i;
                if (nextIndex <= 6) {
                    const input = this.$refs[`token${nextIndex}`];
                    input.focus();
                    input.setSelectionRange(0, 0);
                    input.value = char;
                    this.empresa.token[`token${nextIndex}`] = char;
                }
            });
        },
        async submitForm() {
            try {
                const token = Object.values(this.empresa.token).join('');

                const response = await validateEmpresa({
                    cnpj: this.empresa.cnpj,
                    token: token
                });

                if (200 <= response.status && response.status < 300) {
                    Cookies.remove('cnpj-registro-empresa');
                    router.push({ name: 'LoginEmpresa' });

                    alert("Tudo certo! 😉");
                } else {
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    },
    created() {
        this.empresa.cnpj = Cookies.get('cnpj-registro-empresa');
        this.empresa.cnpjExibido = this.empresa.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }
}
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/empresa/_validate.scss";
</style>