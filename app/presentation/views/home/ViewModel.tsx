import {useEffect, useState} from "react";
import {AddDebtorDTO, Debtor} from "../../../domain/entities/Debtor";
import {loadDebtorsUseCase} from "../../../domain/use-cases/home/LoadDebtors";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {ApiDelivery} from "../../../data/source/remote/api/ApiDevlivery";
import {addDebtorUseCase} from "../../../domain/use-cases/home/AddDebtor";
import Toast from "react-native-toast-message";


export const homeViewModel = () => {
    const [debtors, setDebtors] = useState<Debtor[]>([]);
    const [totalDebt, setTotalDebt] = useState<number>(0);
    const [addDebtorName, setAddDebtorName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {
        user
    } = UseUserLocalStorage();

    const loadDebtors = async (userSlug: string) => {
        const response = await loadDebtorsUseCase(userSlug)
        setDebtors(response)
    }

    const loadTotalDebt =  () => {
        let sumTotalDebt = 0
        debtors.forEach(debtor => {
            sumTotalDebt += debtor.debt
        })
        setTotalDebt(sumTotalDebt)
    }

    const addDebtor = async (debtor: AddDebtorDTO) => {
        if (validateAddDebtorForm()) {
            const response = await addDebtorUseCase(debtor)
            if (user?.slug != undefined)
                loadDebtors(user?.slug)
        }
    }

    const transformDataIntoAddDebtorDTO = (debtorName: string, userSlug: string) => {
        const Debtor: AddDebtorDTO = {
            name: debtorName,
            user: userSlug,
        }
        return Debtor
    }

    const validateAddDebtorForm = () => {
        if (addDebtorName == "") {
            setErrorMessage("Name is required");
            return false;
        } if (addDebtorName.length == 1) {
            setErrorMessage("Name must be longer than 1 character")
            return false;
        } if (debtors.some(debtor => debtor.name === addDebtorName)) {
            setErrorMessage("Name is already on the list");
            return false;
        }
        return true
    }

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return {
        debtors,
        loadDebtors,
        loadTotalDebt,
        totalDebt,
        addDebtor,
        transformDataIntoAddDebtorDTO,
        errorMessage,
        setErrorMessage,
        addDebtorName,
        setAddDebtorName,
        capitalizeFirstLetter
    }
}