<template>
    <Header />
    <div id="app">
        Hello World!
    </div>
    <Footer />

</template>

<script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';

    export default {
        name: 'Home',
        components: {
            Header,
            Footer
        }
    }
</script>