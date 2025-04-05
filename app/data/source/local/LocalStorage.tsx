import AsyncStorage from "@react-native-async-storage/async-storage";

export const LocalStorage = () => {
    const save = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error("Error while saving local storage "+ error)
        }
    }

    const getItem = async (key: string) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error("Error while getting item local storage "+ error)
        }
    }

    const removeItem = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error("Error while deleting local storage "+ error)
        }
    }

    return {save, getItem, removeItem}

}