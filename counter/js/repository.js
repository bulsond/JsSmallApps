const repository = (function () {
    const key = 'counter';
    let storage;
    function read() {
        if (Boolean(storage.getItem(key)) === false) {
            return String(0);
        }
        return storage.getItem(key);
    }
    function write(counter) {
        storage.setItem(key, String(counter));
    }
    function initialization(lStorage) {
        storage = lStorage;
    }
    return {init: initialization, readCounter: read, writeCounter: write}
})();

export default repository;