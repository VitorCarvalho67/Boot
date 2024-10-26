<template>
    <transition name="slide">
        <div class="overlay" @click="handleOutsideClick" v-if="visible">
            <aside @click.stop>
                <ul>
                    <li>
                        <router-link to="/admin">
                            Formulários
                        </router-link>

                        <router-link to="/admin/register/coordenador">
                            Coordenadores
                        </router-link>

                        <router-link to="/admin/register/funcionario">
                            Funcionários
                        </router-link>

                        <router-link to="/admin/register/curso">
                            Cursos
                        </router-link>

                        <router-link to="/admin/register/turma">
                            Turmas
                        </router-link>

                        <router-link to="/admin/register/professor">
                            Professores
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/admin">
                            Tabelas
                        </router-link>

                        <router-link to="/admin/table/coordenador">
                            Coordenadores
                        </router-link>

                        <router-link to="/admin/table/funcionario">
                            Funcionários
                        </router-link>

                        <router-link to="/admin/table/curso">
                            Cursos
                        </router-link>

                        <router-link to="/admin/table/turma">
                            Turmas
                        </router-link>

                        <router-link to="/admin/table/professor">
                            Professores
                        </router-link>

                        <router-link to="/admin/table/estagio">
                            Estágios
                        </router-link>

                        <router-link to="/admin/table/empresa">
                            Empresas
                        </router-link>

                        <router-link to="/admin">
                            Rankings
                        </router-link>

                        <router-link to="/admin">
                            Geral
                        </router-link>

                        <router-link to="/admin">
                            Nota
                        </router-link>

                        <router-link to="/admin">
                            Atividade
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/config">
                            Configurações
                        </router-link>
                    </li>
                </ul>


            </aside>
        </div>
    </transition>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import logo from '../../assets/imgs/logoHeader.png';

export default defineComponent({
    name: 'Aside',
    emits: ['close'],
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    setup(props, { emit }) {
        const router = useRouter();
        const spanView = ref(false);

        function toggleSpanView() {
            spanView.value = !spanView.value;
        }

        function handleOutsideClick() {
            spanView.value = false;
            closeAside();
        }

        function closeAside() {
            emit('close');
        }

        watch(() => props.visible, (newVal) => {
            if (!newVal) spanView.value = false;
        });

        return {
            router,
            imagem: logo,
            spanView,
            toggleSpanView,
            handleOutsideClick,
            closeAside,
        };
    }
});
</script>

<style lang="scss" scoped>
@import "../../scss/layouts/admin/_aside.scss";
</style>