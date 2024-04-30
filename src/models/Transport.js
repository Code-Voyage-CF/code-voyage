const axios = require('axios');
require('dotenv').config();

class ShoppingActivity {
    constructor(name, type, rating, priceLevel) {
        this.name = name;
        this.type = type;
        this.rating = rating;
        this.priceLevel = priceLevel;
    }
}

class AmadeusShoppingActivities {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://test.api.amadeus.com/v1/shopping/activities';
    }

    async getShoppingActivities(cityCode) {
        try {
            const response = await axios.get(`${this.baseUrl}?cityCode=${cityCode}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            // Map the response data to ShoppingActivity objects
            return response.data.map(activity => new ShoppingActivity(
                activity.name,
                activity.category,
                activity.rating,
                activity.price
            ));
        } catch (error) {
            console.error('Error fetching shopping activities:', error.response.data);
            throw new Error('Failed to fetch shopping activities');
        }
    }
}

// Test scenario
async function test() {
    const apiKey = 'SFW203wyxe4QQeVm5r5rGtrIIWli'; // Replace with your actual Amadeus API key
    const amadeusShoppingActivities = new AmadeusShoppingActivities(apiKey);
    const cityCode = 'PAR'; // Example city code for Paris

    try {
        // Fetch shopping activities
        const shoppingActivities = await amadeusShoppingActivities.getShoppingActivities(cityCode);

        // Print shopping activities
        console.log('Shopping Activities:');
        shoppingActivities.forEach((activity, index) => {
            console.log(`\n${index + 1}. Name: ${activity.name}`);
            console.log(`   Type: ${activity.type}`);
            console.log(`   Rating: ${activity.rating}`);
            console.log(`   Price Level: ${activity.priceLevel}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the test scenario
test();

// Export classes for use in other modules if needed
module.exports = { ShoppingActivity, AmadeusShoppingActivities };