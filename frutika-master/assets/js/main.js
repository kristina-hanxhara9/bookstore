(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });
    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });


}(jQuery));

// Add this to assets/js/main.js or create a new JS file and link it in the HTML

$(document).ready(function() {
    // Check if there's a hash in the URL
    if(window.location.hash) {
        var hash = window.location.hash.substring(1); // Remove the # symbol
        
        // Scroll to the products section
        $('html, body').animate({
            scrollTop: $("#all-books").offset().top - 100
        }, 800);
        
        // Apply the filter
        setTimeout(function() {
            if(hash === 'all-books') {
                // Show all products
                $('.product-filters ul li[data-filter="*"]').click();
            } else {
                // Apply the specific filter
                $('.product-filters ul li[data-filter=".' + hash + '"]').click();
            }
        }, 900); // Delay to ensure isotope is initialized
    }
});


// Shopping Cart JavaScript

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Cart management
const cart = {
    // Get cart from localStorage
    getCart: function() {
        return JSON.parse(localStorage.getItem('mudiviliCart')) || [];
    },
    
    // Save cart to localStorage
    saveCart: function(cartData) {
        localStorage.setItem('mudiviliCart', JSON.stringify(cartData));
    },
    
    // Add item to cart
    addItem: function(id, title, price, cover) {
        const cartData = this.getCart();
        
        // Check if item already exists in cart
        const existingItem = cartData.find(item => item.id === id);
        
        if (existingItem) {
            // If item exists, increment quantity
            existingItem.quantity += 1;
        } else {
            // If item doesn't exist, add it to cart
            cartData.push({
                id: id,
                title: title,
                price: price,
                cover: cover,
                quantity: 1
            });
        }
        
        // Save updated cart
        this.saveCart(cartData);
        
        // Update cart count
        updateCartCount();
        
        // Show success message
        showCartNotification(title + ' added to cart');
    },
    
    // Get total number of items in cart
    getItemCount: function() {
        const cartData = this.getCart();
        return cartData.reduce((total, item) => total + item.quantity, 0);
    }
};

// Update cart count in header
function updateCartCount() {
    const count = cart.getItemCount();
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = count > 0 ? count : '';
        
        if (count > 0) {
            cartCountElement.style.display = 'flex';
        } else {
            cartCountElement.style.display = 'none';
        }
    }
}

// Show notification when item is added to cart
function showCartNotification(message) {
    // Check if notification element exists
    let notification = document.getElementById('cart-notification');
    
    // Create notification if it doesn't exist
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cart-notification';
        notification.style.position = 'fixed';
        notification.style.top = '100px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#F28123';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease-in-out';
        document.body.appendChild(notification);
    }
    
    // Update notification message
    notification.textContent = message;
    
    // Show notification
    notification.style.opacity = '1';
    
    // Hide notification after 3 seconds
    setTimeout(function() {
        notification.style.opacity = '0';
    }, 3000);
}

// Add event listeners to all Add to Cart buttons
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product details
            const productItem = this.closest('.single-product-item');
            const id = productItem.getAttribute('data-product-id');
            const title = productItem.querySelector('h3').textContent;
            const price = productItem.querySelector('.product-price').getAttribute('data-price');
            const cover = productItem.querySelector('.product-image img').getAttribute('src');
            
            // Add item to cart
            cart.addItem(id, title, price, cover);
        });
    });
});