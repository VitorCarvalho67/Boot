<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="userAluno.name" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="userAluno.email" @input="checkData" required>
                </div>
                <p v-show="!dominio">× Possuir domínio etec.sp.gov.br</p>
                <p v-show="dominio">✓ Possuir domínio etec.sp.gov.br</p>
                <br>
                <div>
                    <label for="password">Senha:</label>
                    <input type="text" id="password" v-model="userAluno.password" @input="checkData" required>
                </div>

                <p v-show="!allRequirementsMet">A senha deve conter pelo menos:</p>
                <p v-show="allRequirementsMet">Sua senha contém ao menos:</p>
                <br>

                <p v-show="!uppercase">× Uma letra maiúscula (A-Z)</p>
                <p v-show="uppercase">✓ Uma letra maiúscula (A-Z)</p>

                <p v-show="!lowercase">× Uma letra minúscula (a-z)</p>
                <p v-show="lowercase">✓ Uma etra minúscula (a-z)</p>
                
                <p v-show="!number">× Um número (0-9)</p>
                <p v-show="number">✓ Um número (0-9)</p>
                
                <p v-show="!specialCharacter">× Um caractere especial (*, !, @, #, $, %, &, /, -, .)</p>
                <p v-show="specialCharacter">✓ Um caractere especial</p>
                
                <p v-show="!length">× 8 caracteres</p>
                <p v-show="length">✓ 8 caracteres</p>
                <br>

                <div>
                    <label for="confirmPassword">Confirmar Senha:</label>
                    <input type="text" id="confirmPassword" v-model="userAluno.confirmPassword" @input="checkData" required>
                </div>

                <p v-show="!confirmPass">× As senhas devem ser iguais</p>
                <p v-show="confirmPass">✓ As senhas devem ser iguais</p>

                <button v-show="allRequirementsMet" type="submit">Registrar - valido</button>
                <button v-show="!allRequirementsMet" type="button">Registrar - invalido</button>
                <br>

            </form>
        </div>
    </main>
    <Footer />
</template>

<script>

import { registerPreAluno } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import router from '../../router/index.js'
import Cookies from 'js-cookie';

export default {
    name: 'Register',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            userAluno: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            dominio: false,
            uppercase: false,
            lowercase: false,
            number: false,
            specialCharacter: false,
            length: false,
            confirmPass: false
        }
    },
    computed: {
        allRequirementsMet() {
            return this.uppercase && this.lowercase && this.number && this.specialCharacter && this.length;
        }
    },
    methods: {
        checkData() {
            const password = this.userAluno.password;
            const passwordConfirm = this.userAluno.confirmPassword;
            const email = this.userAluno.email;
            this.dominio =/@etec\.sp\.gov\.br$/.test(email);
            this.confirmPass = (password == passwordConfirm);
            this.uppercase = /[A-Z]/.test(password);
            this.lowercase = /[a-z]/.test(password);
            this.number = /[0-9]/.test(password);
            this.specialCharacter = /[*!@#$%&\./\\-]/.test(password);
            this.length = password.length >= 8;
        },

        async submitForm() {
            try {
                const response = await registerPreAluno({
                    name: this.userAluno.name,
                    email: this.userAluno.email,
                    password: this.userAluno.password
                });

                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('email', `${response.data.email}`, { expires: 10 });
                    router.push({ name: 'TokenRegister' })
                    
                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>