window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.calc__calc-card'),
        payment = document.querySelector('.calc__calc-sum'),
        select = document.querySelector('.calc__select'),
        calcInput = document.querySelector('.calc__calc-input');

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
        payment.textContent = (sum * koef).toFixed();
    };

    function getPaymentDesktop() {
        cards.forEach(card => {
            if (card.classList.contains('calc__calc-card--active')) {
                let sum = +calcInput.value.replace(/\D/g, ''),
                    period = +card.dataset.period;

                getPayment(sum, period, 4);
            }
        });
    }

    function getPaymentMobile() {
        let sum = +document.querySelector('.calc__calc-input').value.replace(/\D/g, ''),
            period = +select.value;

        getPayment(sum, period, 4);
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
            calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000 ? getPaymentDesktop() : payment.textContent = '0';
        });
    });

    // select.addEventListener('input', () => {
    //     +calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000 ? getPaymentMobile() : payment.textContent = '0';
    // });

    // calcInput.addEventListener('input', () => {
    //     if (calcInput.value[0] == 0) {
    //         calcInput.value = calcInput.value.replace(/./g, '');
    //     }
    //     calcInput.value = calcInput.value.replace(/\D/g, '');

    //     calcInput.value = prettify(calcInput.value);
    //     getPaymentDesktop();

    //     if (+calcInput.value.replace(/\D/g, '') > 20000000) {
    //         calcInput.value = prettify(20000000);
    //     }

    //     if (+calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000) {
    //         if (select.value != '') {
    //             getPaymentMobile()
    //         }
    //         getPaymentDesktop();
    //     } else {
    //         payment.textContent = '0';
    //     }

    // });

    // Accordion
    const questions = document.querySelectorAll('.questions__question-header');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            question.nextElementSibling.classList.toggle('questions__question-content--active');
        });
    });

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
        slidesPerView: 1.3,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'progressbar',
        },
    });

});

 