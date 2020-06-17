class DrumKit {
    constructor() {
        this._pads = document.querySelectorAll('.pad');
        this._kickAudio = document.querySelector('.kick-sound');
        this._snareAudio = document.querySelector('.snare-sound');
        this._hihatAudio = document.querySelector('.hihat-sound');
        this._playButton = document.querySelector('.play');
        this._index = 0; //счетчик
        this._bpm = 150; //удары в минуту
    }

    //визуальное выделение квадрата после клика по нему
    activePad() {
        //this === <div> квадтара
        this.classList.toggle('active');
    }

    //выделение квадратов по счетчику
    repeat() {
        const step = this._index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        console.log(activeBars);
        this._index++;
    }

    //запуск отчета и прохождения по квадратам
    start() {
        const interval = (60 / this._bpm) * 1000;
        window.setInterval(() => {
            this.repeat();
        }, interval);
    }
}

const drumKit = new DrumKit();
//подписка на событие клика по квадрату (для выделения)
drumKit._pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
});
//подписка на клик по кнопке
drumKit._playButton.addEventListener('click', () => {
    drumKit.start();
});