import Cookies from 'js-cookie';
import router from '../router/index.js';
import { authAdmin } from '../services/api';

export const authMixin = {
    data() {
        return {
            token: ''
        }
    },
    methods: {
        async authenticate() {
            this.token = Cookies.get('token');
            if (!this.token) {
                router.push({ path: '/admin/login' });
            } else {
                try {
                    const response = await authAdmin(this.token);
                    if (response.data !== "Admin autenticado com sucesso.") {
                        router.push({ path: "/admin/login" });
                    }
                } catch (error) {
                    alert(error);
                }
            }
        }
    }
};