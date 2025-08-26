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
import {Asset} from "expo-asset";

type DebtorDetailsRouteProp = RouteProp<RootStackParamsList, "DebtorDetails">;

export const debtorDetailsViewModel = () => {
    const [debts, setDebts] = useState<Debt[]>([]);
    const route = useRoute<DebtorDetailsRouteProp>()
    const {debtor} = route.params
    const [totalDebt, setTotalDebt] = useState(0);
    const [addDebtValues, setAddDebtValues] = useState({
        description: "",
        debt: 0,
        debtor: debtor.id,
    });
    const [errorMessageDesc, setErrorMessageDesc] = useState("");
    const [errorMessageDebt, setErrorMessageDebt] = useState("");
    const [showLoading, setShowLoading] = useState<boolean>(true)

    const loadDebts = async (debtorId: number) => {
        const response = await loadDebtsUseCase(debtorId);
        console.log(response);
        setDebts(response);
        loadTotalDebt(response)
        await Asset.fromModule(require("../../../../assets/details-icon.png")).downloadAsync();
        await Asset.fromModule(require("../../../../assets/delete-debtor-icon.png")).downloadAsync();
        await Asset.fromModule(require("../../../../assets/add-icon.png")).downloadAsync();
        setShowLoading(false);
    }

    const deleteDebt = async (debtId: number) => {
        const response = await deleteDebtUseCase(debtId);
        debts.forEach(debt => {
            if (debt.id === debtId) {
                debts.splice(debts.indexOf(debt), 1)
            }
        })
        await loadDebts(debtor.id)
    }

    const loadTotalDebt =  (debts: Debt[]) => {
        let sumTotalDebt = 0
        debts.forEach(debt => {
            sumTotalDebt += debt.debt
        })
        setTotalDebt(sumTotalDebt)
    }

    const addDebt = async (debt: AddDebtDTO) => {
        if (validateAddDebtForm()) {
            const response = await addDebtUseCase(debt)
            await loadDebts(debtor.id)
        }
    }

    const onChangeAddDebtForm = (property: string, value: string) => {
        if (property === "description") {
            setErrorMessageDesc("")
        } else {
            setErrorMessageDebt("")
        }

        setAddDebtValues({
            ...addDebtValues, [property]: property === "debt" ? Number(value) : value
        })
    }

    const validateAddDebtForm = () => {
        console.log(addDebtValues.debt)
        if (addDebtValues.description == "") {
            setErrorMessageDesc("Empty fields are not allowed")
        } if (addDebtValues.debt == 0) {
            setErrorMessageDebt("Empty fields are not allowed")
            return false;
        } if (addDebtValues.debt < 0) {
            setErrorMessageDebt("Invalid field. It must be greater than 0")
            return false;
        } if (isNaN(addDebtValues.debt)) {
            setErrorMessageDebt("Invalid format. Should be like -> 12.34")
            return false
        }
        return true;
    }


    const resetForm = () => {
        onChangeAddDebtForm("description", "")
        onChangeAddDebtForm("debt", "0")
        setErrorMessageDebt("");
        setErrorMessageDesc("");
    }

    return {
        debts,
        loadDebts,
        deleteDebt,
        totalDebt,
        loadTotalDebt,
        errorMessageDebt,
        errorMessageDesc,
        setErrorMessageDebt,
        setErrorMessageDesc,
        addDebt,
        onChangeAddDebtForm,
        addDebtValues,
        validateAddDebtForm,
        resetForm,
        showLoading
    }
}