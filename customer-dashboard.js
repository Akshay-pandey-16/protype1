const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const productGrid = document.getElementById('product-grid');
const productItems = document.querySelectorAll('.product-item');


const voiceSearchButton = document.getElementById('voice-search-btn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const quantityFilter = document.getElementById('quantity-filter');
const organicFilter = document.getElementById('organic-filter');
const stateFilter = document.getElementById('state-filter');
const cityFilter = document.getElementById('city-filter');


const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        alert('Item added to cart!');
    });
});


searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    filterProducts(query);
});


voiceSearchButton.addEventListener('click', () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const voiceQuery = event.results[0][0].transcript.toLowerCase();
    searchInput.value = voiceQuery;
    filterProducts(voiceQuery);
};


const filterProducts = (query = '') => {
    const selectedCategory = categoryFilter.value;
    const selectedPrice = parseFloat(priceFilter.value);
    const selectedQuantity = quantityFilter.value;
    const isOrganic = organicFilter.checked;
    const selectedState = stateFilter.value;
    const selectedCity = cityFilter.value;

    productItems.forEach((item) => {
        const productName = item.getAttribute('data-name');
        const productCategory = item.getAttribute('data-category');
        const productPrice = parseFloat(item.getAttribute('data-price'));
        const productQuantity = parseInt(item.getAttribute('data-quantity'));
        const productOrganic = item.getAttribute('data-organic') === 'true';
        const productState = item.getAttribute('data-state');
        const productCity = item.getAttribute('data-city');

       
        const isCategoryMatch = selectedCategory === 'all' || productCategory === selectedCategory;
        const isPriceMatch = productPrice <= selectedPrice;
        const isQuantityMatch =
            (selectedQuantity === 'all') ||
            (selectedQuantity === 'below100' && productQuantity < 100) ||
            (selectedQuantity === '100to200' && productQuantity >= 100 && productQuantity <= 200) ||
            (selectedQuantity === 'above50' && productQuantity > 200);
        const isOrganicMatch = !isOrganic || productOrganic;
        const isStateMatch = selectedState === 'all' || productState === selectedState;
        const isCityMatch = selectedCity === 'all' || productCity === selectedCity;

        const isNameMatch = productName.includes(query);

        if (isCategoryMatch && isPriceMatch && isQuantityMatch && isOrganicMatch && isStateMatch && isCityMatch && isNameMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};


categoryFilter.addEventListener('change', () => filterProducts());
priceFilter.addEventListener('input', () => filterProducts());
quantityFilter.addEventListener('change', () => filterProducts());
organicFilter.addEventListener('change', () => filterProducts());
stateFilter.addEventListener('change', () => filterProducts());
cityFilter.addEventListener('change', () => filterProducts());

