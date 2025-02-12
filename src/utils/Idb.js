export class Idb {
    constructor(dbName, version) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    /**
     * Initialize the IndexedDB and create object stores if needed.
     */
    async init(objectStores) {
        return new Promise((resolve, reject) => {
            console.log("Initializing IndexedDB...");
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                console.log("Upgrade needed, creating object stores...");
                objectStores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        db.createObjectStore(store.name, store.options || { keyPath: "id", autoIncrement: true });
                        console.log(`Object store "${store.name}" created.`);
                    }
                });
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log("IndexedDB initialized successfully.");
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error("Error initializing IndexedDB:", event.target.error);
                reject(event.target.error);
            };
        });
    }

    /**
     * Add or update data in an object store.
     * Automatically adds if `id` is undefined and updates otherwise.
     */
    async addOrUpdate(storeName, data) {
        return new Promise((resolve, reject) => {
            console.log(`Adding or updating data in "${storeName}":`, data);

            if (data.id === undefined) {
                console.log("Adding new data (no id provided).");
                delete data.id; // Ensure no `id` is passed for new entries
            }

            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);

            const request = store.put(data); // `put` handles both add and update

            request.onsuccess = () => {
                console.log("Data added/updated successfully with ID:", request.result);
                resolve(request.result);
            };

            request.onerror = (event) => {
                console.error("Error adding/updating data:", event.target.error);
                reject(event.target.error);
            };
        });
    }

    /**
     * Get a specific item by key.
     */
    async get(storeName, key) {
        return new Promise((resolve, reject) => {
            console.log(`Fetching item from "${storeName}" with key:`, key);
            const transaction = this.db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => {
                console.log("Item fetched successfully:", request.result);
                resolve(request.result);
            };

            request.onerror = (event) => {
                console.error("Error fetching item:", event.target.error);
                reject(event.target.error);
            };
        });
    }

    /**
     * Get all items from an object store.
     */
    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            console.log(`Fetching all data from "${storeName}"`);
            const transaction = this.db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                console.log("Data fetched successfully:", request.result);
                resolve(request.result);
            };

            request.onerror = (event) => {
                console.error("Error fetching data:", event.target.error);
                reject(event.target.error);
            };
        });
    }

    /**
     * Delete data from an object store by key.
     */
    async delete(storeName, key) {
        return new Promise((resolve, reject) => {
            console.log(`Deleting item from "${storeName}" with key:`, key);
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => {
                console.log("Data deleted successfully.");
                resolve();
            };

            request.onerror = (event) => {
                console.error("Error deleting data:", event.target.error);
                reject(event.target.error);
            };
        });
    }

    /**
     * Clear all data in an object store.
     */
    async clear(storeName) {
        return new Promise((resolve, reject) => {
            console.log(`Clearing all data from "${storeName}"`);
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => {
                console.log(`All data from "${storeName}" cleared successfully.`);
                resolve();
            };

            request.onerror = (event) => {
                console.error("Error clearing data:", event.target.error);
                reject(event.target.error);
            };
        });
    }
}
