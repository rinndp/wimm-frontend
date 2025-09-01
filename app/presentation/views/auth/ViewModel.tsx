import {useState} from "react";
import {loginUseCase} from "../../../domain/use-cases/auth/LoginUseCase";
import {LoggedUserInterface, LoginUserInterface} from "../../../domain/entities/User";
import {saveUserUserUseCase} from "../../../domain/use-cases/local-user/SaveUserUseCase";
import {getUserUseCase} from "../../../domain/use-cases/local-user/GetUserUseCase";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {registerUseCase} from "../../../domain/use-cases/auth/RegisterUseCase";
import Toast from "react-native-toast-message";
import {Asset} from "expo-asset";
import {useTranslation} from "react-i18next";



export const loginViewModel = () => {
    const {t} = useTranslation();

    const [loginValues, setLoginValues] = useState({
        email: '',
        password: ''
    })

    const {
        getUserSession,
        user
    } = UseUserLocalStorage()

    const [errorMessage, setErrorMessage] = useState<string>("")

    const onChangeLogin = (property: string, value: string) => {
        setLoginValues({
            ...loginValues, [property]: value
        })
    }

    // const signInWithGoogle = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log('Usuario:', userInfo);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const validateForm = () => {
        if (loginValues.email == "") {
            setErrorMessage(t("email is required"))
            return false
        } if (loginValues.password == "") {
            setErrorMessage(t("password is required"))
            return false
        }
        return true
    }

    const login = async () => {
        if (validateForm()) {
            const response = await loginUseCase(loginValues as LoginUserInterface, t)
            await saveUserUserUseCase(response as LoggedUserInterface)
            await getUserSession()
            return loginValues as LoginUserInterface
        }
    }

    return {
        onChangeLogin,
        loginValues,
        login,
        errorMessage,
        setErrorMessage,
        user,
        // signInWithGoogle
    }
}

export const registerViewModel = () => {
    const {t} = useTranslation();

    const [errorMessage, setErrorMessage] = useState<string>("")
    const [registerValues, setRegisterValues] = useState({
        email: "",
        password: "",
        password2: "",
    })

    const [userCreated, setUserCreated] = useState<boolean>(false);

    const onChangeRegister = (property: string, value: string) => {
        setRegisterValues({
            ...registerValues, [property]: value
        })
    }

    const register = async (user: LoginUserInterface) => {
        if (validateForm()) {
            const response = await registerUseCase(user, t)
            setUserCreated(true)
            Toast.show({
                "type": "success",
                "text1": t(response.message),
            })
        }
    }

    const validateForm = () => {
        if (registerValues.email == "") {
            setErrorMessage(t("email is required"))
            return false
        } if (!validateEmail(registerValues.email)) {
            setErrorMessage(t("email is not valid"))
            return false
        } if (registerValues.password == "") {
            setErrorMessage(t("password is required"))
            return false
        } if (registerValues.password !== registerValues.password2) {
            setErrorMessage(t("passwords do not match"))
            return false
        } if (registerValues.password.length < 8) {
            setErrorMessage(t("password must be at least 8 characters long"))
            return false
        }

        return true;
    }

    const transformValuesIntoUserDTO = (email: string, password: string) => {
        const user: LoginUserInterface = {
            email: email,
            password: password,
        }
        return user
    }

    const validateEmail = (email: string) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!reg.test(email)) {
            return false;
        } else {
            return true
        }
    }

    return {
        errorMessage,
        setErrorMessage,
        register,
        onChangeRegister,
        registerValues,
        transformValuesIntoUserDTO,
        userCreated
    }
}