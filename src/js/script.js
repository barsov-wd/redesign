window.addEventListener('DOMContentLoaded', () => {
	const MIN_LOAN_AMOUNT = 100000;
	const MAX_LOAN_AMOUNT = 20000000;

    const cards = document.querySelectorAll('.calc__calc-card'),
        payment = document.querySelector('.calc__inner-price'),
        calcInput = document.querySelector('.calc__input');
		calcWarning = document.querySelector('.calc__warning');

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
            calcInput.value.replace(/\D/g, '') >= MIN_LOAN_AMOUNT && +calcInput.value.replace(/\D/g, '') <= MAX_LOAN_AMOUNT ? getPaymentDesktop() : payment.textContent = '₽';
        });
    });

    calcInput.addEventListener('input', () => {
        if (calcInput.value[0] == 0) {
            calcInput.value = calcInput.value.replace(/./g, '');
        }
        calcInput.value = calcInput.value.replace(/\D/g, '');

		calcInput.dataset.value = calcInput.value;
        calcInput.value = prettify(calcInput.value);
        getPaymentDesktop();

        if (+calcInput.value.replace(/\D/g, '') > MAX_LOAN_AMOUNT) {
            calcInput.value = prettify(MAX_LOAN_AMOUNT);
        }

    });

	calcInput.addEventListener('focusout', () => {
		if (parseInt(calcInput.dataset.value) < MIN_LOAN_AMOUNT) {
			calcWarning.style.display = 'block';
		} else {
			calcWarning.style.display = 'none';
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