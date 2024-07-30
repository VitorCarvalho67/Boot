<template>
    <div class="boxSucess">
        <div class="img">
            <!-- img -->
        </div>
        <div class="info">
            <h1>{{ dataSucess.title }}</h1>
            <p class="p">{{ dataSucess.description }}</p>
            <span class="code">Obrigado por fazer parte da plataforma</span>
            <router-link :to="dataSucess.routerLink">{{ dataSucess.buttonName }}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sucess',
    props: {
        dataSucess: {
            type: Object,
            required: true,
            default: () => ({
                title: '',
                description: '',
                routerLink: '',
                buttonName: ''
            })
        }
    }
};
</script>

<style scoped>
@import "../scss/layouts/_sucess.scss";
</style>