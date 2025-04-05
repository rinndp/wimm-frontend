import {useEffect, useState} from "react";
import {Debtor} from "../../../domain/entities/Debtor";
import {loadDebtorsUseCase} from "../../../domain/use-cases/home/LoadDebtors";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";


export const homeViewModel = () => {
    const [debtors, setDebtors] = useState<Debtor[]>([]);
    const [totalDebt, setTotalDebt] = useState<number>(0);

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

    return {
        debtors,
        loadDebtors,
        loadTotalDebt,
        totalDebt
    }
}