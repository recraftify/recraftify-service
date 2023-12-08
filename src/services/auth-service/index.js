const { DB, auth } = require('../../clients/google-firestore-client');
const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} = require('firebase/auth');
const JWTMiddleware = require('../../middlewares/jwt');
const { doc, collection, setDoc } = require('firebase/firestore');
class AuthService {
    static async signup(user) {
        const { email, password, name } = user;
        try {
            console.log('user', user);
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const { uid } = userCred.user;
            const userRecord = await doc(collection(DB, 'users'), uid);

            if (userRecord.exists) {
                return {
                    error_message: 'User already exists',
                };
            }
            setDoc(userRecord, {
                id: uid,
                name,
                email,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            const token = JWTMiddleware.createToken({
                id: uid,
            });
            return {
                message: 'Signup successful',
                token,
            };
        } catch (error) {
            return {
                error_message: error.message,
            };
        }
    }

    static async login(user) {
        const { email, password } = user;
        try {
            const userCred = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const { uid } = userCred.user;
            const token = JWTMiddleware.createToken({
                id: uid,
            });
            return {
                message: 'Login successful',
                token,
            };
        } catch (error) {
            return {
                error_message: error.message,
            };
        }
    }
}

module.exports = AuthService;
