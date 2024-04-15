<template>
    <div class="register">
      <h1>Registrar Aluno</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Nome:</label>
          <input type="text" id="name" v-model="userAluno.name" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="userAluno.email" required>
        </div>
        <div>
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="userAluno.password" required>
        </div>
        <div>
          <label for="confirmPassword">Confirmar Senha:</label>
          <input type="password" id="confirmPassword" required>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { registerAluno } from '../services/api.js';
  
  export default {
    data() {
      return {
        userAluno: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    methods: {
      async submitForm() {
        if (this.userAluno.password !== this.userAluno.confirmPassword) {
          alert('Senhas não conferem');
        }else{
            try {
                const data = await registerAluno({
                    name: this.userAluno.name,
                    email: this.userAluno.email,
                    password: this.userAluno.password
                });
                alert('Aluno registrado com sucesso');
            } catch (error) {
                alert('Erro ao registrar aluno');
            }
        }
      }
    }
  }
</script>