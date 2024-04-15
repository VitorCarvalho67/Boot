<template>
    <Header />
    <div id="app">
        Login
    </div>
    <Footer />

</template>

<script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';

    export default {
        name: 'Login',
        components: {
            Header,
            Footer
        }
    }
</script>