const counter = (function () {
    let repo;
    let c;
    function countUp() {
        ++c;
        repo.writeCounter(c);
    }
    function countDown() {
        --c;
        repo.writeCounter(c);
    }
    function getCount() {
        return repo.readCounter();
    }
    function initialization(repository) {
        repo = repository;
        c = Number(repo.readCounter());
    }
    return {init: initialization, countUp: countUp, countDown: countDown, getCount: getCount}
})();

export default counter;