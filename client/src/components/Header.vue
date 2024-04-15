<template>
    <header>
        OIIIII
    </header>
</template>

<script>
    import { defineComponent } from 'vue';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        name: 'Header',
        setup() {
            const router = useRouter();

            return {
                router
            }
        }
    });
</script>

<style scoped>
    .header {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 10px;
    }
</style>