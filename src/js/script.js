$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="./img/chevron_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./img/chevron_right.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
      });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
            $('.catalog-item__product').addClass('catalog-item__product_active');
            $('.catalog-item__list').removeClass('catalog-item__list_active');
        });
    function toggleSlide(link) {
        $('.catalog-item__' + link).each(function (i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__product').eq(i).toggleClass('catalog-item__product_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('link');
    toggleSlide('back');

    //Модальные окна
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thank_you').fadeOut();
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите адрес электронной почты",
                    email: "Адрес почты должен быть введен в формате name@example.com"
                }
            }
        });
    }
    validateForm('#consultation form');
    validateForm('#order form');
    validateForm('.consultation form');

    // Маска номера телефона
    $('input[name=phone]').mask('+7 (999) 999-99-99');
    
    //Отправка писем на почту

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thank_you').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });
  });