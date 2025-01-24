export class IndexedDBWrapper {
    constructor(dbName, version) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    async init(objectStores) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                objectStores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, store.options || { keyPath: "id", autoIncrement: true });
                    }
                });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => reject(event.target.error);
        });
    }

    async add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }

    async getByIndex(storeName, indexName, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName).index(indexName);
            const request = store.get(value);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    }
}
