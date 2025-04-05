import {useState} from "react";
import {loginUseCase} from "../../../domain/use-cases/auth/LoginUseCase";
import {LoginUserInterface} from "../../../domain/entities/User";
import {saveUSerUserUseCase} from "../../../domain/use-cases/local-user/SaveUserUseCase";
import {getUserUseCase} from "../../../domain/use-cases/local-user/GetUserUseCase";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";


export const loginViewModel = () => {
    const [loginValues, setLoginValues] = useState({
        email: '',
        password: ''
    })

    const {
        getUserSession,
    } = UseUserLocalStorage()

    const [errorMessage, setErrorMessage] = useState<string>("")

    const onChangeLogin = (property: string, value: string) => {
        setLoginValues({
            ...loginValues, [property]: value
        })
    }

    const validateForm = () => {
        if (loginValues.email == "") {
            setErrorMessage("Email is required")
            return false
        } if (loginValues.password == "") {
            setErrorMessage("Password is required")
            return false
        }
        return true
    }

    const login = async () => {
        if (validateForm()) {
            const response = await loginUseCase(loginValues as LoginUserInterface)
            await saveUSerUserUseCase(response)
            await getUserSession()
        }
    }

    return {
        onChangeLogin,
        loginValues,
        login,
        errorMessage,
        setErrorMessage
    }
}