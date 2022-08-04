window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.calc__calc-card'),
        payment = document.querySelector('.calc__inner-price'),
        calcInput = document.querySelector('.calc__input');

    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    function getPayment(sum, period, rate) {
        // *
        // * sum - сумма кредита
        // * period - срок в годах
        // * rate - годовая ставка в процентах
        // * 
        let i,
            koef;

        // ставка в месяц
        i = (rate / 12) / 100;

        // коэффициент аннуитета
        koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

        // итог
        
        payment.textContent = (sum * koef).toFixed().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ') + ' ' + '₽';
    };

    function getPaymentDesktop() {
        cards.forEach(card => {
            if (card.classList.contains('calc__calc-card--active')) {
                let sum = +calcInput.value.replace(/\D/g, ''),
                    period = +card.dataset.period;

                getPayment(sum, period, 6.5);
            }
        });
    }

    function getPaymentMobile() {
        let sum = +document.querySelector('.calc__calc-input').value.replace(/\D/g, '');

        getPayment(sum, period, 6.5);
    }

    function clearActiveClass() {
        cards.forEach(card => {
            card.classList.remove('calc__calc-card--active');
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            clearActiveClass();
            card.classList.add('calc__calc-card--active'); +
            calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000 ? getPaymentDesktop() : payment.textContent = 'от 100 000 ₽';
        });
    });

    calcInput.addEventListener('input', () => {
        if (calcInput.value[0] == 0) {
            calcInput.value = calcInput.value.replace(/./g, '');
        }
        calcInput.value = calcInput.value.replace(/\D/g, '');

        calcInput.value = prettify(calcInput.value);
        getPaymentDesktop();

        if (+calcInput.value.replace(/\D/g, '') > 20000000) {
            calcInput.value = prettify(20000000);
        }

    });

    // Accordion
 
    function accordion (buttons, buttonActiveClass, contents) {
        const buttons_ = document.querySelectorAll(buttons);
        const contents_ = document.querySelectorAll(contents);

        buttons_.forEach((button, index) => {
            button.addEventListener('click', () => {
                button.classList.toggle(buttonActiveClass);

                contents_.forEach((content, index2) => {
                    if (index == index2) {
                        if (button.classList.contains(buttonActiveClass)) {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        } else {
                            content.style.maxHeight = '0';
                        }
                    }
                });
            });
        });
    }

    accordion('.questions__question-header', 'questions__question-header--active', '.questions__question-content');

    // Menu

    const menu = document.querySelector('.header__menu'),
        menuItem = document.querySelectorAll('.header__menu-item'),
        humburger = document.querySelector('.humburger');

        humburger.addEventListener('click', () => {
        humburger.classList.toggle('humburger_active');
        menu.classList.toggle('header__menu_active');
        });

        menuItem.forEach(item => {
        item.addEventListener('click', () => {
            humburger.classList.toggle('humburger_active');
            menu.classList.toggle('header__menu_active');
        });
    });

    // Slider 

    new Swiper('.partners-slider',{
        slidesPerView: 1.2,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'progressbar',
        },
    });

});

 