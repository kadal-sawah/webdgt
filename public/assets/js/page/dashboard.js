$(document).ready(function () {
    moveRoom('home');
    initHero();
    initFetch();
});

function initHero() {
    let heroCarouselIndicators = select("#hero-carousel-indicators");
    let heroCarouselItems = select('#heroCarousel .carousel-item', true);

    heroCarouselItems.forEach((item, index) => {
        (index === 0) ?
            heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>" :
            heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>";
    });
};

function initSlick() {
    $('.clientSlick').not('.slick-initialized').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        dots: false,
        autoplay: true,
        mobileFirst: true,
        pauseOnFocus: true,
        autoplaySpeed: 6000,
        speed: 2000,
        centerMode: false,
    });
};

function reloadSlick() {
    $("#clientsData").addClass('d-none');
    $('#clientsData').slick('unslick');
    $('.clientSlick').slick('unslick');
    getClients();
};

function getClients() {
    return new Promise(resolve => {
        var clientsAPI = `${API_PATH}/public/get/clients`;
        $.getJSON(clientsAPI, {
            format: 'json'
        }).done(function (response) {
            let clients = '';
            $.each(response.data, function (i, items) {
                clients += `
                            <div class="col-lg-3 col-md-4 col-6">
                                <div class="client-logo">
                                    <img src="${BASE_URL}/uploads/clients/${items.icon}" class="img-fluid" alt="${items.name}" title="${items.description}">
                                </div>
                            </div>
                            `;
                $('#clientsData').html(clients);
                // $('#clientsData').removeClass('d-none');
                resolve(true);
            });
        });
    });
};

async function initFetch() {
    await getClients();
    await initSlick();
};