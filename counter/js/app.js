const app = (function () {
    let counter;
    let output;
    let next;
    let prev;

    function nextClick() {
        counter.countUp();
        output.innerHTML = counter.getCount();
    }
    function prevClick() {
        counter.countDown();
        output.innerHTML = counter.getCount();
    }
    function bindAndRun(doc, count) {
        output = doc.querySelector('.counter__subtitle');
        next = doc.querySelector('.button-next');
        next.addEventListener('click', nextClick);
        prev = doc.querySelector('.button-prev');
        prev.addEventListener('click', prevClick);

        counter = count;
        const result = counter.getCount();
        if (result !== '0') {
            output.innerHTML = result;
        }
    }
    return {run: bindAndRun}
})();

export default app;