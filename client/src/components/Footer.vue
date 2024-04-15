<!-- Componente Cubo3D.vue -->
<template>
    <footer>
       Boot - 2024 Copyright
    </footer>
</template>
  
<script>
    import { defineComponent } from 'vue';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        name: 'Footer',
        setup() {
                const router = useRouter();

                return {
                    router
                }
            }
    });

</script>
  
<style scoped>
 /* CSS */
</style>
  