/**
 * Slider object
 */

// Slider constructor
function Slider(id, delay) {
    this.delay = delay;
    this.slides = document.querySelectorAll('#'+id+' .slide');
    this.currentSlide = 0;
    this.slideInterval = setInterval(this.nextSlide.bind(this), this.delay);
    this.playing = true;
    this.pauseButton = document.getElementById(id+'-pause-button');
    this.next = document.getElementById(id+'-next-button');
    this.previous = document.getElementById(id+'-previous-button');

    this.pauseButton.addEventListener('click', function() {
        if (this.playing) {
            this.pauseSlideshow();
        } else {
            this.playSlideshow();
        }
    }.bind(this), false);
    
    this.next.addEventListener('click', function() {
        this.pauseSlideshow();
        this.nextSlide();
    }.bind(this), false);
    
    this.previous.addEventListener('click', function() {
        this.pauseSlideshow();
        this.previousSlide();
    }.bind(this), false);
}

// goToSlide method of Slider object
Slider.prototype.goToSlide = function(n) {
    this.slides[this.currentSlide].className = 'slide';
    this.currentSlide = (n + this.slides.length) % this.slides.length;
    this.slides[this.currentSlide].className = 'slide slide-showing';
}

// nextSlide method of Slider object
Slider.prototype.nextSlide = function() {
    this.goToSlide(this.currentSlide + 1);
}

// previousSlide method of Slider object
Slider.prototype.previousSlide = function() {
    this.goToSlide(this.currentSlide - 1);
}

// pauseSlideshow method of Slider object
Slider.prototype.pauseSlideshow = function() {
    this.pauseButton.innerHTML = '&#9658;';
    this.playing = false;
    clearInterval(this.slideInterval);
}

// playSlideshow method of Slider object
Slider.prototype.playSlideshow = function() {
    this.pauseButton.innerHTML = '&#10074;&#10074;';
    this.playing = true;
    this.slideInterval = setInterval(this.nextSlide.bind(this), this.delay);
}

// controlSliderWithKeyboard method of Slider object
Slider.prototype.controlSliderWithKeyboard = function(event) {
    // Left arrow key
    if (event.keyCode == '37') {
        this.pauseSlideshow();
        this.previousSlide();
    // Right arrow key
    } else if (event.keyCode == '39') {
        this.pauseSlideshow();
        this.nextSlide();
    }
}