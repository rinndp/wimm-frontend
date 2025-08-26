import {useEffect, useState} from "react";
import {Creditor} from "../../../domain/entities/Creditor";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {ApiDelivery} from "../../../data/source/remote/api/ApiDevlivery";
import Toast from "react-native-toast-message";
import {loadCreditorsUseCase} from "../../../domain/use-cases/creditor-screen/LoadCreditors";
import {deleteCreditorUseCase} from "../../../domain/use-cases/creditor-screen/DeleteCreditor";
import {addCreditorUseCase} from "../../../domain/use-cases/creditor-screen/AddCreditor";
import {AddDebtorDTO} from "../../../domain/entities/Debtor";


export const creditorScreenViewModel = () => {
    const [creditors, setCreditors] = useState<Creditor[]>([]);
    const [totalCredit, setTotalCredit] = useState<number>(0);
    const [addCreditorName, setAddCreditorName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showLoading, setShowLoading] = useState(true);

    const {
        user
    } = UseUserLocalStorage();

    const loadCreditors = async (userSlug: string) => {
        const response = await loadCreditorsUseCase(userSlug)
        setCreditors(response)
        loadTotalCredit(response)
        setShowLoading(false)
    }

    const loadTotalCredit =  (creditors: Creditor[]) => {
        let sumTotalCredit = 0
        creditors.forEach(creditor => {
            sumTotalCredit += creditor.credit
        })
        setTotalCredit(sumTotalCredit)
    }

    const deleteCreditor = async (creditorId: number) => {
        const response = await deleteCreditorUseCase(creditorId)
        creditors.forEach(creditor => {
            if (creditor.id === creditorId) {
                creditors.splice(creditors.indexOf(creditor), 1)
            }
        })
        if (user?.slug != undefined) {
            loadCreditors(user?.slug)
        }
    }

    const addCreditor = async (creditor: AddDebtorDTO) => {
        if (validateAddCreditorForm()) {
            const response = await addCreditorUseCase(creditor)
            if (user?.slug != undefined)
                loadCreditors(user?.slug)
        }
    }

    const transformDataIntoAddCreditorDTO = (creditorName: string, userSlug: string) => {
        const Creditor: AddDebtorDTO = {
            name: creditorName,
            user: userSlug,
        }
        return Creditor
    }

    const validateAddCreditorForm = () => {
        if (addCreditorName == "") {
            setErrorMessage("Name is required");
            return false;
        } if (addCreditorName.length == 1) {
            setErrorMessage("Name must be longer than 1 character")
            return false;
        } if (creditors.some(creditor => creditor.name === addCreditorName)) {
            setErrorMessage("Name is already on the list");
            return false;
        }
        return true
    }

    const capitalizeFirstLetter = (str: string): string => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const resetForm = () => {
        setAddCreditorName("")
        setErrorMessage("")
    }

    return {
        creditors,
        loadCreditors,
        loadTotalCredit,
        totalCredit,
        addCreditor,
        transformDataIntoAddCreditorDTO,
        errorMessage,
        setErrorMessage,
        addCreditorName,
        setAddCreditorName,
        capitalizeFirstLetter,
        deleteCreditor,
        validateAddCreditorForm,
        resetForm,
        showLoading,
        setShowLoading
    }
}