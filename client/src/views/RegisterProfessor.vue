<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de professor</h1>
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="professor.name" required>
                </div>
                <div>
                    <label for="titulo">Título principal:</label>
                    <input type="text" id="name" v-model="professor.tituloPrincipal" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="professor.email" @input="checkData" required>
                </div>
                <br>
                <div>
                    <label for="password">Senha:</label>
                    <input type="text" id="password" v-model="professor.password" @input="checkData" required>
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
                    <input type="text" id="confirmPassword" v-model="professor.confirmPassword" @input="checkData"
                        required>
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
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../router/index.js'
import { authAdmin } from '../services/api';
import { registerProfessor } from '../services/api';

export default {
    name: 'RegisterProfessor',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            professor: {
                name: '',
                tituloPrincipal: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
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
            const password = this.professor.password;
            const passwordConfirm = this.professor.confirmPassword;
            const email = this.professor.email;
            this.confirmPass = (password == passwordConfirm);
            this.uppercase = /[A-Z]/.test(password);
            this.lowercase = /[a-z]/.test(password);
            this.number = /[0-9]/.test(password);
            this.specialCharacter = /[*!@#$%&\./\\-]/.test(password);
            this.length = password.length >= 8;
        },

        async submitForm() {
            if (this.professor.password !== this.professor.confirmPassword) {
                alert('Senhas não conferem');
            } else {
                const token = Cookies.get('token');
                if (token){
                    try {
                        const data = await registerProfessor({
                            name: this.professor.name,
                            tituloPrincipal: this.professor.tituloPrincipal,
                            email: this.professor.email,
                            password: this.professor.password
                        }, token);
                        alert("tudo certo 😂")
                    } catch (error) {
                        alert('Erro ao registrar professor');
                    }
                } else{
                    alert("Cookie de token não encontrado")
                }
            }
        },

        async Authenticate() {
            const token = Cookies.get('token');
            if (token == undefined) {
                router.push({ path: '/admin/login' });
            } else {
                try {
                    const auth = await authAdmin(token);

                    if (auth !== "Usuário autenticado com sucesso.") {
                        router.push({ path: "/admin/login" })
                    }
                } catch (error) {
                    alert(error);
                }
            }
        }
    },
    async created() {
        await this.Authenticate();
    }
}

</script>

<style lang="scss" scoped></style>