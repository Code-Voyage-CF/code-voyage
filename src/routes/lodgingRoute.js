const amadeus = require('../config/amadeus.js');

// Function to search for hotel offers
function searchHotelOffers(cityCode, checkInDate, checkOutDate, adults) {
  // 1. Hotel List API to get the list of hotels 
  return amadeus.referenceData.locations.hotels.byCity.get({
    cityCode: cityCode
  }).then(function (hotelsList) {
    console.log('Hotels List:', hotelsList); // Log hotelsList
    // 2. Hotel Search API to get the price and offer id
    return amadeus.shopping.hotelOffersSearch.get({
      'hotelIds': hotelsList.data[0].hotelId,
      'adults': adults,
      'checkInDate': checkInDate,
      'checkOutDate': checkOutDate
    });
  }).then(function (pricingResponse) {
    console.log('Pricing Response:', pricingResponse); // Log pricingResponse
    return pricingResponse.data;
  });
}

// Example usage of the function to search for hotel offers in London for specific dates
// searchHotelOffers('LON', '2024-10-10', '2024-10-12', 1)
//   .then(function (offers) {
//     console.log(offers);
//   })
//   .catch(function (error) {
//     console.error("Something went wrong:", error);
//   });


