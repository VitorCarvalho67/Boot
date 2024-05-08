<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Complete seu cadastro:</h1>
                <p>Email:</p><p>{{ this.funcionario.email }}</p><router-link to="/funcionario/init">Editar</router-link>
                
                <p>Senha temporária (enviada no email):</p>
                <input type="text" id="temporaryPassword" v-model="funcionario.temporaryPassword" required>
                
                <p>Nova Senha:</p>
                <input type="text" id="newPassword" v-model="funcionario.newPassword" @input="checkData" required>
                
                <p v-show="!allRequirements">A senha deve conter pelo menos:</p>
                <p v-show="allRequirements">Sua senha contém ao menos:</p>
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
                    <input type="text" id="confirmPassword" v-model="funcionario.confirmPassword" @input="checkData" required>
                </div>

                <p v-show="!confirmPass">× As senhas devem ser iguais</p>
                <p v-show="confirmPass">✓ As senhas devem ser iguais</p>

                <button type="submit" v-show="allRequirements">Concluir</button>
                <button type="button" v-show="!allRequirements">Concluir</button>
            </form>
        </div>
    </main>
    <Footer />
</template>

<script>
import { validateFuncionario } from '../../services/api.js';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'

export default {
    name: 'ValidateFuncionario',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            funcionario: {
                email: '',
                temporaryPassword: '',
                newPassword: ''
            },
            uppercase: false,
            lowercase: false,
            number: false,
            specialCharacter: false,
            length: false,
            confirmPass: false,
        }
    },
    computed: {
        allRequirements(){
            return (this.confirmPass && this.uppercase && this.lowercase && this.number && this.specialCharacter && this.length)
        }
    },
    methods: {
        checkData() {
            const password = this.funcionario.newPassword;
            const passwordConfirm = this.funcionario.confirmPassword;
            this.confirmPass = (password == passwordConfirm);
            this.uppercase = /[A-Z]/.test(password);
            this.lowercase = /[a-z]/.test(password);
            this.number = /[0-9]/.test(password);
            this.specialCharacter = /[*!@#$%&\./\\-]/.test(password);
            this.length = password.length >= 8;
        },

        async submitForm() {
            try {
                const response = await validateFuncionario({
                    email: this.funcionario.email,
                    temporaryPassword: this.funcionario.temporaryPassword,
                    newPassword: this.funcionario.newPassword
                });

                if (200 <= response.status && response.status < 300) {
                    Cookies.remove('email');
                    
                    router.push({ path: '/funcionario/login' });
                    
                    alert("Tudo certo! 😉");
                } else{
                    alert("Ops.. Algo deu errado. 😕\n" + response.message);
                }
            } catch(error){
                alert("Ops.. Algo deu errado. 😕\n" + error.message);
            }

        },

        async getEmail(){
            if(Cookies.get('email-init-funcionario')){
                this.funcionario.email = Cookies.get('email-init-funcionario');
            }
            else{
                router.push({path: "/funcionario/init"});
            }
        }
    },
    async created(){
        await this.getEmail();
    }
}
</script>