document.querySelector('.play').addEventListener('click', (e) => {
    document.querySelector('.play').style.display = 'none';
    document.querySelector('.start').style.display = 'none';

    let divs = document.querySelectorAll('div');

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    class Bird {
        constructor(obj) {
            this.score = obj.score;
            this.speed = obj.speed;
            this.img = obj.img;
            this.selector = document.querySelector(obj.selector);
            this.interval = setInterval(this.setCoord.bind(this), this.speed);
        }
        setCoord() {
            this.selector.style.top = getRandomInt(document.body.clientHeight - this.selector.clientHeight) + 'px';
            this.selector.style.left = getRandomInt(document.body.clientWidth - this.selector.clientWidth) + 'px';
        }
        die() {
            this.selector.firstElementChild.src = "images/bang.png";
            setTimeout(() => {
                this.selector.firstElementChild.src = this.img;
            }, 700);
        }
        stop() {
            clearInterval(this.interval)
        }
    }

    let birds = [new Bird({ score: 10, speed: 1000, img: 'images/bird_10_points.png', selector: '#green' }),
        new Bird({ score: 20, speed: 800, img: 'images/bird_20_points.png', selector: '#red' }),
        new Bird({ score: 50, speed: 500, img: 'images/bird_50_points.png', selector: '#blue' }),
        new Bird({ score: -20, speed: 800, img: 'images/pig_minus_100_points.png', selector: '#yellow' })
    ]

    let time = document.querySelectorAll('p span');

    let interval = setInterval(function() {
        time[1].textContent -= 1;
        if (time[1].textContent == 0) {
            clearInterval(interval);
            for (let bird of birds) {
                bird.stop()
            }
            let el = document.querySelector('p span');
            if (el.textContent < 100)
                document.getElementById('over').style.display = 'block';
            else
                document.getElementById('win').style.display = 'block';
        }
    }, 1000);

    for (let bird of birds) {
        bird.selector.addEventListener('click', (e) => {
            let el = document.querySelector('p span');
            bird.die();
            el.textContent = +el.textContent + bird.score;

        });
    }
})