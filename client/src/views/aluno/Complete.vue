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
import logo from '../../assets/imgs/imageMain.png';

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
    @import "../../scss/pages/aluno/_complete.scss";
</style>