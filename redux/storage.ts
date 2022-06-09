// import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import localForage from "localforage";

// 定义不在浏览器Client情况下的存储处理(也就是无内容)
function createNoopStorage() {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
}

// 替换redux-persist的WebStorage为localForage，实现自动切换IndexedDB和LocalStorage(默认IndexedDB)
// 使用IndexedDB保证能存储下所有的文章
function createLocalForageStorage(databaseName: string) {
    const database = localForage.createInstance({
        name: databaseName
    });
    return {
        db: database,
        getItem: database.getItem,
        setItem: database.setItem,
        removeItem: database.removeItem
    };
}

// const storage = typeof window !== "undefined" ? createWebStorage("redux") : createNoopStorage();
const storage = typeof window !== "undefined" ? createLocalForageStorage("redux") : createNoopStorage();

export default storage;