// 1. Tab Switching Logic
function switchTab(tabName) {
    // Remove 'active' class from all tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    // Hide all contents
    document.getElementById('content-upload').style.display = 'none';
    document.getElementById('content-link').style.display = 'none';
    document.getElementById('content-idea').style.display = 'none';

    // Activate selected tab
    if (tabName === 'upload') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('content-upload').style.display = 'flex';
    } else if (tabName === 'link') {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('content-link').style.display = 'flex';
    } else if (tabName === 'idea') {
        document.querySelectorAll('.tab')[2].classList.add('active');
        document.getElementById('content-idea').style.display = 'flex';
    }
}

// 2. Generation Logic (Simulated for UI Demo)
function generateViralIdeas() {
    const btn = document.querySelector('.generate-btn');
    const dashboard = document.getElementById('results-dashboard');
    const list = document.getElementById('titles-list');

    // Simple Animation
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing AI Magic...';
    
    setTimeout(() => {
        btn.innerText = 'Generate Viral Ideas';
        dashboard.style.display = 'block';

        // Example Data (later we connect this to Gemini API)
        const titles = [
            "1. (FREE) How to Code on Your Phone for Free",
            "2. (LOCKED) The Ultimate Guide to Mobile Web Dev",
            "3. (LOCKED) Stop Buying Laptops! Use This Instead",
            "4. (LOCKED) Build a SaaS Business from Bed"
        ];

        // Clear list
        list.innerHTML = '';

        // Create list items
        titles.forEach((title, index) => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerText = title;
            
            // Lock items 2, 3, and 4
            if(index > 0) {
                div.classList.add('locked');
            }
            list.appendChild(div);
        });

        // Scroll to results
        dashboard.scrollIntoView({behavior: "smooth"});

    }, 2000); // 2 second fake delay
}

// 3. Ad Watch Logic
function watchAd() {
    const unlockBtn = document.getElementById('unlock-btn');
    unlockBtn.innerHTML = '<i class="fas fa-clock"></i> Playing Ad (Wait 3s)...';
    
    setTimeout(() => {
        // Unlock everything
        document.querySelectorAll('.locked').forEach(el => {
            el.classList.remove('locked');
        });
        unlockBtn.style.display = 'none';
        alert("Success! All ideas unlocked.");
    }, 3000);
}
const API_KEY = 'AIzaSyARJS7m88i2TyLGAx1Y5InGh-6UWM5i2U8'; //
async function generateViralIdeas() {
    const input = document.getElementById('ideaInput').value || document.getElementById('linkInput').value;
    const btn = document.querySelector('.generate-btn');

    if (!input) return alert("Please enter a link or idea!");

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing AI Magic...';

    // 1. Prompt (यह AI को बताता है कि क्या करना है)
    const prompt = `
    Act as a YouTube Expert. For the video idea: "${input}", return EXACTLY 
    a JSON object with four arrays named 'titles', 'descriptions', 'tags', and 'thumbnails'. 
    Each array must have exactly 4 strings. The thumbnails array must contain 4 specific 
    visual prompts for an image generation AI.
    `;

    try {
        // 2. The API Call (Key का उपयोग यहाँ होता है)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                contents: [{ parts: [{ text: prompt }] }],
                config: { temperature: 0.8 } 
            })
        });

        const data = await response.json();
        
        // 3. Extracting the JSON Text from the API response
        const rawText = data.candidates[0].content.parts[0].text.trim();
        const jsonContent = JSON.parse(rawText.match(/\{[\s\S]*\}/)[0]); // Finds and parses the JSON block
        
        // 4. Display Results (This function will use jsonContent.titles, etc.)
        displayResults(jsonContent); 

    } catch (error) {
        console.error("Gemini API Error:", error);
        alert("Failed to connect to AI. Check your API Key or Network.");
    }

    btn.innerText = 'Generate Viral Ideas';
}

// (बाकी का displayResults() फंक्शन जिसमें लॉक/अनलॉक लॉजिक है, वह नीचे होगा)
    
