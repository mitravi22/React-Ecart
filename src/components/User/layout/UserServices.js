
import jwtDecode from 'jwt-decode'


export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('userDetails');
        console.log(jwt,"jjj");
        return jwtDecode(jwt)
    } catch (error) {
        return null
    }
}