
function fetchHighlights(query) {
    return fetch('highlights.json')
      .then(response => response.json())
      .then(data => {
        const lowerCaseQuery = query.toLowerCase();
        return data.filter(highlight => 
          highlight.Title.toLowerCase().includes(lowerCaseQuery)
        );
      });
  }
  
  function fetchPOTMHighlights(query) {
    return fetch('POTM.json')
      .then(response => response.json())
      .then(data => {
        const lowerCaseQuery = query.toLowerCase();
        return data.filter(potm => 
          potm.Title.toLowerCase().includes(lowerCaseQuery)
        );
      });
  }
  
  function displayHighlights(query) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    const allFetches = [fetchHighlights(query), fetchPOTMHighlights(query)];
    
    Promise.all(allFetches)
      .then(results => {
        const [highlights, potmHighlights] = results;
        const allHighlights = highlights.concat(potmHighlights);
  
        if (allHighlights.length === 0) {
          resultsContainer.innerHTML = '<p>No results found.</p>';
        } else {
          allHighlights.forEach(highlight => {
            const highlightCard = document.createElement('div');
            highlightCard.classList.add('highlight-card');
            highlightCard.innerHTML = `
              <img src="${highlight.Image}" alt="${highlight.Title}" class="highlight-image">
              <h3>${highlight.Title}</h3>
              <p>${highlight.Description}</p>
              <a href="${highlight.Link}" target="_blank">Watch</a>
            `;
            resultsContainer.appendChild(highlightCard);
          });
        }
      })
      .catch(error => {
        console.error('Error fetching highlights:', error);
      });
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query');
  
  if (query) {
    displayHighlights(query);
  }
  


// carousel

document.addEventListener('DOMContentLoaded', function () {
    var carouselElement = document.querySelector('#carouselExample');
    var carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000, // Automatic slide interval in milliseconds (5 seconds)
        ride: 'carousel', // Start the carousel automatically
        pause: false // Do not pause the carousel on hover
    });

    // Pause and resume the carousel on caption hover
    var captions = carouselElement.querySelectorAll('.carousel-caption');
    captions.forEach(function (caption) {
        caption.addEventListener('mouseover', function () {
            carousel.pause();
        });
        caption.addEventListener('mouseout', function () {
            carousel.cycle();
        });
    });

    // Manual navigation control
    carouselElement.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach(function (control) {
        control.addEventListener('click', function () {
            // No additional actions needed; Bootstrap handles navigation
        });
    });
});



// end of carsousel 

// document.addEventListener('DOMContentLoaded', function () {
//     const scrollContainer = document.querySelector('.match-highlights-scroll');
//     const scrollAmount = 300; // Amount to scroll in pixels

//     function scrollLeft() {
//         const scrollPosition = scrollContainer.scrollLeft;
//         if (scrollPosition > 0) {
//             scrollContainer.scrollBy({
//                 left: -scrollAmount,
//                 behavior: 'smooth'
//             });
//         }
//         animateScrollButton('left-button');
//     }

//     function scrollRight() {
//         const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
//         const scrollPosition = scrollContainer.scrollLeft;
//         if (scrollPosition < maxScrollLeft) {
//             scrollContainer.scrollBy({
//                 left: scrollAmount,
//                 behavior: 'smooth'
//             });
//         }
//         animateScrollButton('right-button');
//     }

//     function animateScrollButton(buttonClass) {
//         const button = document.querySelector(`.${buttonClass}`);
//         button.classList.add('active');
//         setTimeout(() => {
//             button.classList.remove('active');
//         }, 300);
//     }

//     // Attach event listeners
//     document.querySelector('.left-button').addEventListener('click', scrollLeft);
//     document.querySelector('.right-button').addEventListener('click', scrollRight);
// });



// function scrollLeft() {
//     document.querySelector('.match-highlights-scroll').scrollBy({
//         left: -300,
//         behavior: 'smooth'
//     });
// }

// function scrollRight() {
//     document.querySelector('.match-highlights-scroll').scrollBy({
//         left: 300,
//         behavior: 'smooth'
//     });
// }

document.addEventListener('DOMContentLoaded', function() {
    // Highlights Section
    const highlightsContainer = document.getElementById('highlightsContainer');
    const highlightsDotNavigation = document.getElementById('dotNavigation');
    const highlightsLeftButton = document.querySelector('.highlight-left-button');
    const highlightsRightButton = document.querySelector('.highlight-right-button');
    const cardsPerDot = 2; // Number of cards represented by one dot
    let highlightsIndex = 0;

    function createHighlightsDotNavigation() {
        const cards = highlightsContainer.querySelectorAll('.col-md-3');
        const numberOfDots = Math.ceil(cards.length / cardsPerDot);
        
        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i);
            dot.onclick = () => {
                scrollToHighlightCard(i);
                highlightHighlightCardAndDot(i);
            };
            highlightsDotNavigation.appendChild(dot);
        }
        updateHighlightsActiveDot();
    }

    function updateHighlightsActiveDot() {
        const dots = highlightsDotNavigation.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === highlightsIndex);
        });
    }

    function scrollToHighlightCard(index) {
        const cards = highlightsContainer.querySelectorAll('.col-md-3');
        if (index >= 0 && index < Math.ceil(cards.length / cardsPerDot)) {
            const cardWidth = cards[0].offsetWidth;
            highlightsContainer.scrollLeft = cardWidth * cardsPerDot * index;
            highlightsIndex = index;
            updateHighlightsActiveDot();
            highlightHighlightCardAndDot(index);
        }
    }

    function highlightHighlightCardAndDot(index) {
        const cards = highlightsContainer.querySelectorAll('.col-md-3');
        const dots = highlightsDotNavigation.querySelectorAll('.dot');
        cards.forEach((card, cardIndex) => {
            const dotIndex = Math.floor(cardIndex / cardsPerDot);
            if (dotIndex === index) {
                card.classList.add('card-hover');
            } else {
                card.classList.remove('card-hover');
            }
        });
        dots.forEach((dot, dotIndex) => {
            if (dotIndex === index) {
                dot.classList.add('card-hover');
            } else {
                dot.classList.remove('card-hover');
            }
        });
    }

    function scrollLeftHighlights() {
        scrollToHighlightCard(Math.max(0, highlightsIndex - 1));
    }

    function scrollRightHighlights() {
        const cards = highlightsContainer.querySelectorAll('.col-md-3');
        scrollToHighlightCard(Math.min(Math.ceil(cards.length / cardsPerDot) - 1, highlightsIndex + 1));
    }

    createHighlightsDotNavigation();

    highlightsLeftButton.addEventListener('click', scrollLeftHighlights);
    highlightsRightButton.addEventListener('click', scrollRightHighlights);

    highlightsContainer.addEventListener('scroll', () => {
        const cards = highlightsContainer.querySelectorAll('.col-md-3');
        const cardWidth = cards[0].offsetWidth;
        const newIndex = Math.floor(highlightsContainer.scrollLeft / (cardWidth * cardsPerDot));
        if (newIndex !== highlightsIndex) {
            highlightsIndex = newIndex;
            updateHighlightsActiveDot();
            highlightHighlightCardAndDot(highlightsIndex);
        }
    });
});

// moments
document.addEventListener('DOMContentLoaded', function() {
    const highlightsContainer = document.getElementById('MomentsContainer');
    const dotNavigation = document.getElementById('momentsDotNavigation');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const cardsPerDot = 3; // Number of cards represented by one dot
    let currentIndex = 0;

    function createDotNavigation() {
        const cards = highlightsContainer.querySelectorAll('.col-md-3');
        const numberOfDots = Math.ceil(cards.length / cardsPerDot);
        
        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i);
            dot.onclick = () => {
                scrollToCard(i);
                updateActiveDot();
            };
            dotNavigation.appendChild(dot);
            
            // Add hover effect to card and corresponding dot
            const startIndex = i * cardsPerDot;
            const endIndex = Math.min(startIndex + cardsPerDot, cards.length);
            for (let j = startIndex; j < endIndex; j++) {
                const card = cards[j];
                card.addEventListener('mouseenter', () => {
                    dot.classList.add('dot-hover');
                    card.classList.add('card-hover');
                });
                card.addEventListener('mouseleave', () => {
                    dot.classList.remove('dot-hover');
                    card.classList.remove('card-hover');
                });

                dot.addEventListener('mouseenter', () => {
                    card.classList.add('card-hover');
                    dot.classList.add('dot-hover');
                });
                dot.addEventListener('mouseleave', () => {
                    card.classList.remove('card-hover');
                    dot.classList.remove('dot-hover');
                });
            }
        }
        updateActiveDot();
    }

    function updateActiveDot() {
        const dots = dotNavigation.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function scrollToCard(index) {
        const cards = highlightsContainer.querySelectorAll('.col-md-3');
        if (index >= 0 && index < Math.ceil(cards.length / cardsPerDot)) {
            const cardWidth = cards[0].offsetWidth;
            highlightsContainer.scrollLeft = cardWidth * cardsPerDot * index;
            currentIndex = index;
            updateActiveDot();
        }
    }

    function scrollLeftMoments() {
        scrollToCard(Math.max(0, currentIndex - 1));
    }

    function scrollRightMoments() {
        const cards = highlightsContainer.querySelectorAll('.col-md-3');
        scrollToCard(Math.min(Math.ceil(cards.length / cardsPerDot) - 1, currentIndex + 1));
    }

    createDotNavigation();

    leftButton.addEventListener('click', scrollLeftMoments);
    rightButton.addEventListener('click', scrollRightMoments);

    highlightsContainer.addEventListener('scroll', () => {
        const cards = highlightsContainer.querySelectorAll('.col-md-3');
        const cardWidth = cards[0].offsetWidth;
        const newIndex = Math.floor(highlightsContainer.scrollLeft / (cardWidth * cardsPerDot));
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateActiveDot();
        }
    });
});


// POTM
document.addEventListener('DOMContentLoaded', function () {
    const POTMContainer = document.getElementById('POTMContainer');
    const dotsContainer = document.getElementById('POTMDotNavigation');
    const leftButton = document.querySelector('.POTM-button.left-button');
    const rightButton = document.querySelector('.POTM-button.right-button');
    const cardWidth = document.querySelector('.col-md-3').offsetWidth; // Width of a single card
    const cardCount = POTMContainer.children.length;
    const cardsPerDot = 3; // Number of cards per dot

    // Create dots
    const dotCount = Math.ceil(cardCount / cardsPerDot);
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        const scrollLeft = POTMContainer.scrollLeft;
        const containerWidth = POTMContainer.offsetWidth;
        const scrollIndex = Math.floor(scrollLeft / (cardWidth * cardsPerDot)); // Determine the card index

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === scrollIndex);
        });
    }

    function scrollToIndex(index) {
        const scrollTo = index * cardWidth * cardsPerDot; // Scroll to the appropriate position
        POTMContainer.scrollLeft = scrollTo;
        updateDots();
    }

    // Event listeners for dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            scrollToIndex(index);
        });
    });

    // Event listeners for scroll buttons
    leftButton.addEventListener('click', function () {
        POTMContainer.scrollLeft -= cardWidth * cardsPerDot;
        updateDots();
    });

    rightButton.addEventListener('click', function () {
        POTMContainer.scrollLeft += cardWidth * cardsPerDot;
        updateDots();
    });

    // Update dots on scroll
    POTMContainer.addEventListener('scroll', updateDots);

    // Initialize dots
    updateDots();
});


// Scroll function for moments
// function prevCard() {
//     document.querySelector('.moment-scroll').scrollBy({
//         left: -300,
//         behavior: 'smooth'
//     });
// }

// function nextCard() {
//     document.querySelector('.moment-scroll').scrollBy({
//         left: 300,
//         behavior: 'smooth'
//     });
// }
