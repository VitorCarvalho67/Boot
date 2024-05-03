<template>
    <Header />
    <main>
        <div class="register">
            <form @submit.prevent="submitForm">
                <h1>Registro de funcionário</h1>
                <div>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="funcionario.name" required>
                </div>
                <div>
                    <label for="cargo">Cargo de:</label>
                    <select id="cargo" name="cargo" v-model="funcionario.cargo" required>
                        <option value="GESTAO">Gestão</option>
                        <option value="ADMINISTRACAO">Administração</option>
                        <option value="DIRECAO">Direção</option>
                        <option value="ORIENTACAO">Orientação</option>
                    </select>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="funcionario.email" @input="checkData" required>
                </div>
                <br>
                <div>
                    <label for="password">Senha:</label>
                    <input type="text" id="password" v-model="funcionario.password" @input="checkData" required>
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
                    <input type="text" id="confirmPassword" v-model="funcionario.confirmPassword" @input="checkData"
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
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Cookies from 'js-cookie';
import router from '../../router/index.js'
import { registerFuncionario } from '../../services/api';
import { authMixin } from '../../util/mixinAdmin.js';

export default {
    name: 'RegisterFuncionario',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            token: '',
            funcionario: {
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
            const password = this.funcionario.password;
            const passwordConfirm = this.funcionario.confirmPassword;
            const email = this.funcionario.email;
            this.confirmPass = (password == passwordConfirm);
            this.uppercase = /[A-Z]/.test(password);
            this.lowercase = /[a-z]/.test(password);
            this.number = /[0-9]/.test(password);
            this.specialCharacter = /[*!@#$%&\./\\-]/.test(password);
            this.length = password.length >= 8;
        },

        async submitForm() {
            if (this.funcionario.password !== this.funcionario.confirmPassword) {
                alert('Senhas não conferem');
            } else {
                try {
                    const data = await registerFuncionario(
                        {
                            name: this.funcionario.name,
                            email: this.funcionario.email,
                            password: this.funcionario.password,
                            cargo: this.funcionario.cargo
                        }, 
                        this.token
                    );
                    alert("tudo certo 😂")
                } catch (error) {
                    alert('Erro ao registrar funcionário');
                }
            }
        }
    },
    mixins: [authMixin],
    async created() {
        this.authenticate();
        await this.Authenticate();
    }
}

</script>

<style lang="scss" scoped></style>