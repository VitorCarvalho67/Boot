<template>
    <header>
        <div>
            <img src="" alt="Img">
        </div>
        <nav>
            <ul>
                <li><router-link to="/">Rankings</router-link></li>
                <li><router-link to="/">Estágios</router-link></li>
                <li><router-link to="/"><img src="" alt="">Perfil</router-link></li>
            </ul>
        </nav>
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
    header {
        background-color: transparent;
        padding: 10px 20px;
        height: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-family: "Raleway", sans-serif;
        font-weight: 400;
    }

    header div {
        width: 100px;
        height: 100%;
    }

    header div img {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    header nav ul {
        display: flex;
        list-style-type: none;
    }

    header nav ul li a {
        margin-inline: 10px;
        text-decoration: none;
    }
</style>