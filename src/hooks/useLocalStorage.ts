const useLocalStorage = () => {
    const getItem = (item: string) => {
        if (item === null) return;
        return JSON.parse(localStorage.getItem(item) as string)
    }
    const setItem = (item: string, value: any) => {
        localStorage.setItem(item, JSON.stringify(value))
    }
    const removeItem = (item: string) => {
        localStorage.removeItem(item)
    }
    return {
        getItem,
        setItem,
        removeItem
    }
}

export default useLocalStorage;