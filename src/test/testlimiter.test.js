import fetch from 'node-fetch';

const URL = "http://localhost:8000";

async function sendRequests() {
    console.log(`🚀 Testing Rate Limiter on ${URL}...`);
    
    const requests = [];
    for (let i = 1; i <= 15; i++) {
        requests.push(
            fetch(URL).then(async (response) => {
                const status = response.status;
                const data = status === 429 ? "Too Many Requests" : "Success";
                console.log(`Request #${i}: Status ${status} -> ${data}`);
            })
        );
    }

    await Promise.all(requests);
    console.log("✅ Test Complete");
}

sendRequests();