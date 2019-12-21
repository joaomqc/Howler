export default class UserRepository {

    private static isUserLoggedIn = false;

    public static logUserIn = (username: string, password: string): boolean => {
        if(username === 'admin' && password === 'admin') {
            UserRepository.isUserLoggedIn = true;
            return true;
        }
        return false;
    }

    public static isLoggedIn = () => {
        return UserRepository.isUserLoggedIn;
    }
}