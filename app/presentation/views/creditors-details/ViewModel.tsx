import {useContext, useState} from "react";
import {AddDebtDTO, Debt} from "../../../domain/entities/Debt";
import {loadDebtsUseCase} from "../../../domain/use-cases/debtor-details/LoadDebts";
import {deleteDebtUseCase} from "../../../domain/use-cases/debtor-details/DeleteDebt";
import Toast from "react-native-toast-message";
import {RouteProp, useRoute} from "@react-navigation/native";
import {RootStackParamsList} from "../../../../App";
import {debtorScreenViewModel} from "../debtors/ViewModel";
import {AuthContext} from "../auth/AuthProvider";
import {addDebtUseCase} from "../../../domain/use-cases/debtor-details/AddDebt";
import {deleteCreditUseCase} from "../../../domain/use-cases/creditor-details/DeleteCredit";
import {AddCreditDTO, Credit} from "../../../domain/entities/Credit";
import {loadCreditsUseCase} from "../../../domain/use-cases/creditor-details/LoadCredits";
import {addCreditUseCase} from "../../../domain/use-cases/creditor-details/AddCredit";

type CreditorDetailsRouteProp = RouteProp<RootStackParamsList, "CreditorDetails">;

export const creditorDetailsViewModel = () => {
    const [credits, setCredits] = useState<Credit[]>([]);
    const route = useRoute<CreditorDetailsRouteProp>()
    const {creditor} = route.params
    const [totalCredit, setTotalCredit] = useState(0);
    const [addCreditValues, setAddCreditValues] = useState({
        description: "",
        credit: 0,
        creditor: creditor.id,
    });
    const [errorMessageDesc, setErrorMessageDesc] = useState("");
    const [errorMessageCredit, setErrorMessageCredit] = useState("");
    const [showLoading, setShowLoading] = useState<boolean>(true)

    const loadCredits = async (creditorId: number) => {
        const response = await loadCreditsUseCase(creditorId)
        console.log(response);
        setCredits(response);
        setShowLoading(false);
    }

    const deleteCredit = async (creditId: number) => {
        const response = await deleteCreditUseCase(creditId)
        credits.forEach(credit => {
            if (credit.id === creditId) {
                credits.splice(credits.indexOf(credit), 1)
            }
        })
        await loadCredits(creditor.id)
        Toast.show({
            "type": "success",
            "text1": response.message,
            "position": "bottom"
        })
    }

    const loadTotalCredit =  () => {
        let sumTotalCredit = 0
        credits.forEach(credit => {
            sumTotalCredit += credit.credit
        })
        setTotalCredit(sumTotalCredit)
    }

    const addCredit = async (credit: AddCreditDTO) => {
        if (validateAddCreditForm()) {
            const response = await addCreditUseCase(credit)
            await loadCredits(creditor.id)
            Toast.show({
                "type": "success",
                "text1": response.message,
                "position": "bottom"
            })
        }
    }

    const onChangeAddCreditForm = (property: string, value: string) => {
        if (property === "description") {
            setErrorMessageDesc("")
        } else {
            setErrorMessageCredit("")
        }

        setAddCreditValues({
            ...addCreditValues, [property]: property === "debt" ? Number(value) : value
        })
    }

    const validateAddCreditForm = () => {
        console.log(addCreditValues.credit)
        if (addCreditValues.description == "") {
            setErrorMessageDesc("Empty fields are not allowed")
        } if (addCreditValues.credit == 0) {
            setErrorMessageCredit("Empty fields are not allowed")
            return false;
        } if (addCreditValues.credit < 0) {
            setErrorMessageCredit("Invalid field. It must be greater than 0")
            return false;
        } if (isNaN(addCreditValues.credit)) {
            setErrorMessageCredit("Invalid format. Should be like -> 12.34")
            return false
        }
        return true;
    }


    const resetForm = () => {
        onChangeAddCreditForm("description", "")
        onChangeAddCreditForm("debt", "0")
        setErrorMessageCredit("");
        setErrorMessageDesc("");
    }

    return {
        credits,
        loadCredits,
        deleteCredit,
        totalCredit,
        loadTotalCredit,
        errorMessageCredit,
        errorMessageDesc,
        setErrorMessageCredit,
        setErrorMessageDesc,
        addCredit,
        onChangeAddCreditForm,
        addCreditValues,
        validateAddCreditForm,
        resetForm,
        showLoading
    }
}