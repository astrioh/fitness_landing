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
  });