class DrumKit {
    constructor() {
        this._pads = document.querySelectorAll('.pad'); // треки ударных
        this._kickAudio = document.querySelector('.kick-sound'); //звук первого ударного
        this._currentKick = './sounds/kick-classic.wav';
        this._snareAudio = document.querySelector('.snare-sound'); //звук второго ударного
        this._currentSnare = './sounds/snare-acoustic01.wav';
        this._hihatAudio = document.querySelector('.hihat-sound'); //звук третьего ударного
        this._currentHihat = './sounds/hihat-acoustic01.wav';
        this._playButton = document.querySelector('.play'); // кнопка запуска/останова
        this._index = 0; //счетчик
        this._bpm = 150; //удары в минуту
        this._isPlaying = null; //флаг запуска воспроизведения
        this._selects = document.querySelectorAll('select'); //комбобоксы
        this._muteButtons = document.querySelectorAll('.mute'); //кнопки выкл.звука
        this._tempoSlider = document.querySelector('.tempo-slider'); // регулятор темпа
        this._tempoText = document.querySelector('.tempo-nr'); //надпись темпа
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

    //выключение того или иного ударника
    mute(event) {
        //функция для регулирования громкости звука
        const setSoundVolume = (index, volume) => {
            switch (index) {
                case '0':
                    this._kickAudio.volume = volume;
                    break;
                case '1':
                    this._snareAudio.volume = volume;
                    break;
                case '2':
                    this._hihatAudio.volume = volume;
                    break;
            }
        }
        //с помощью кастомного атрибута определяем индекс кнопки
        const buttonIndex = event.target.getAttribute('data-track');
        //делаем кнопу серой
        event.target.classList.toggle('active');
        //устанавливаем нужную громкость звука
        if (event.target.classList.contains('active')) {
            setSoundVolume(buttonIndex, 0);
        } else {
            setSoundVolume(buttonIndex, 1);
        }
    }

    //изменение темпа воспроизведения
    changeTempo(event) {
        this._bpm = event.target.value;
        this._tempoText.innerText = event.target.value;
    }

    //обновление темпа воспроизведения
    updateTempo() {
        //если воспроизведение было запущено то перезапускаем его
        if (this._playButton.classList.contains('active')) {
            //останавливаем воспроизведение
            window.clearInterval(this._isPlaying);
            this._isPlaying = null;
            //стартуем заново
            this.start();
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

//событие выбора звука в одном из select
drumKit._selects.forEach(select => {
    select.addEventListener('change', function (event) {
        drumKit.changeSound(event);
    });
});

//событие клика по одной из кнопок выкл.звука
drumKit._muteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        drumKit.mute(event);
    });
});

//события изменения положения регулятора темпа
drumKit._tempoSlider.addEventListener('input', function (event) {
    drumKit.changeTempo(event);
});
drumKit._tempoSlider.addEventListener('change', function (event) {
    drumKit.updateTempo();
});