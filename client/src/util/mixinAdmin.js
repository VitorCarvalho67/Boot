import Cookies from 'js-cookie';
import router from '../router/index.js';

export const mixinAdmin = {
    data() {
        return {
            token: '',
        }
    },
    methods: {
        async getToken() {
            this.token = Cookies.get('token');
            if (!this.token) {
                router.push({ path: '/admin/login' });
            }
        },
        logout() {
            Cookies.remove('token');
            router.push({ path: '/admin/login' });
        }
    }
};