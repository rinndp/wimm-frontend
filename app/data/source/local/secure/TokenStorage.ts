import * as SecureStore from 'expo-secure-store';

export async function saveTokens(access: string|undefined, refresh: string|undefined, email: string|undefined) {
    await SecureStore.setItemAsync("authTokens", JSON.stringify({ access, refresh, email }));
}

export async function loadTokens() {
    const stored = await SecureStore.getItemAsync("authTokens");
    return stored ? JSON.parse(stored) : null;
}

export async function clearTokens() {
    await SecureStore.deleteItemAsync("authTokens");
}
