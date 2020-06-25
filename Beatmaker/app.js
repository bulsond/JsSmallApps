class DrumKit {
    constructor() {
        this._pads = document.querySelectorAll('.pad');
        this._kickAudio = document.querySelector('.kick-sound');
        this._currentKick = './sounds/kick-classic.wav';
        this._snareAudio = document.querySelector('.snare-sound');
        this._currentSnare = './sounds/snare-acoustic01.wav';
        this._hihatAudio = document.querySelector('.hihat-sound');
        this._currentHihat = './sounds/hihat-acoustic01.wav';
        this._playButton = document.querySelector('.play');
        this._index = 0; //счетчик
        this._bpm = 150; //удары в минуту
        this._isPlaying = null; //флаг запуска воспроизведения
        this._selects = document.querySelectorAll('select');
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
        //назначаем анимацию для квадратов
        activeBars.forEach(bar => {
            bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
            const tokens = bar.classList;
            // console.log(tokens);
            //если квадрат был выделен
            if (tokens.contains('active')) {
                //определяем какой звуковой файл проиграть
                // и воспроизводим нужный звуковой файл
                // перед запуском воспроизведения требуется сброс времени воспроизведения
                if (tokens.contains('kick-pad')) {
                    this._kickAudio.currentTime = 0;
                    this._kickAudio.play();
                } else if (tokens.contains('snare-pad')) {
                    this._snareAudio.currentTime = 0;
                    this._snareAudio.play();
                } else {
                    this._hihatAudio.currentTime = 0;
                    this._hihatAudio.play();
                }
            }
        });
        this._index++;
    }

    //запуск отчета и прохождения по квадратам
    start() {
        const interval = (60 / this._bpm) * 1000;
        //проверяем, что ранее не было запущено воспроизведение
        if (!this._isPlaying) {
            this._isPlaying = window.setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            //удаляем предыдущий запуск воспроизведения
            window.clearInterval(this._isPlaying);
            this._isPlaying = null;
        }
    }

    //надпись на кнопке воспроизведения
    updateButton() {
        if (!this._isPlaying) {
            this._playButton.innerText = 'Стоп';
            this._playButton.classList.add('active');
        } else {
            this._playButton.innerText = 'Играть';
            this._playButton.classList.remove('active');
        }
    }

    //при выборе звука в select
    changeSound(event) {
        const selectionName = event.target.name;
        const selectionValue = event.target.value;
        //в зависимости от select
        // присваиваем выбранный путь к файлу звука
        switch (selectionName) {
            case 'kick-select':
                this._kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this._snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this._hihatAudio.src = selectionValue;
                break;
        }
    }
}


//!!! Создаем экемпляр Ударной Установки
const drumKit = new DrumKit();

//>>События

//подписка на события у квадратов
drumKit._pads.forEach(pad => {
    //подписка на событие клика по квадрату (для выделения)
    pad.addEventListener('click', drumKit.activePad);
    //подписка на событие окончания анимации, сброс значения анимации
    //для последуещего возобновления
    pad.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

//подписка на клик по кнопке
drumKit._playButton.addEventListener('click', () => {
    drumKit.updateButton();
    drumKit.start();
});

//
drumKit._selects.forEach(select => {
    select.addEventListener('change', function (event) {
        drumKit.changeSound(event);
    });
});