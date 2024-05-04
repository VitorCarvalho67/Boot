import Cookies from 'js-cookie';
import { authAdmin } from '../services/api.js';

export async function isAuthAdmin() {
    var token = Cookies.get('token');
    if (!token) {
        return false;
    } else {
        try {
            const response = await authAdmin(token);
            if (response.data !== "Admin autenticado com sucesso.") {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }
}