<template>
    <header>
        <div>
            <img src="" alt="img">
        </div>
        <nav>
            <ul>
                <li>Rankings</li>
                <li>estágios</li>
                <li><img src="" alt="">Perfil</li>
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
    }

    header div{
        width: 100px;
        height: 100%;
    }

    header nav ul{
        display: flex;
        list-style-type: none;
    }

    header nav ul li{
        margin-inline: 10px;
    }
</style>