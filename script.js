// --- PASTE YOUR GOOGLE FORM LINKS HERE ---
const formLinks = {
    hören: {
        1: "https://forms.gle/ZqYTRpyNj8ZcVfnL9",
        2: "https://forms.gle/beMXs2daEzUemu2YA",
        3: "https://forms.gle/bwdELZCufNJQsoD76",
        4: "https://forms.gle/QvfaSqxXD8STDtVJ9",
        5: "https://forms.gle/cHgBn5U29yZ8fK8c9",
        6: "https://forms.gle/GDzfnEhZ7pg2xGs77",
        7: "https://forms.gle/SdVVudNmGvsxGMBM8",
    },
    lesen: {
        1: "https://forms.gle/rpFcB4U9GjcgtUn27",
        2: "https://forms.gle/b1PaNCHgMEtrH2DcA",
        3: "https://forms.gle/FqbS9g9wpWKQnQHj6",
        4: "https://forms.gle/JTuNReSUwLJyJKxc7",
        5: "https://forms.gle/ebzVdJ4WL4BZ9XTB8",
        6: "https://forms.gle/RbTTANduezPjiACe7",
        7: "https://forms.gle/uZyPUcN3NQUmL4G99",
    },
    schreiben: {
        1: "https://forms.gle/GocziSkucob4VZgs5",
        2: "https://forms.gle/tkee5Fmogrk1MUBQ8",
        3: "https://forms.gle/bpFaMqcjT63fAFYN7",
        4: "https://forms.gle/PzM4v84aD3WXX6g78",
        5: "https://forms.gle/1HmQhfEsdzaYGdbQ6",
        6: "https://forms.gle/hj3STibRCpd2wJRY7",
        7: "https://forms.gle/gF6RWo6N76KPpGYx7",
    },
    sprechen: {
        1: "https://forms.gle/17kwqDYGTjgQMGvE8",
        2: "https://forms.gle/vbF65ioSJZbSdZuu7",
        3: "https://forms.gle/tbAG74vwZWpYV1dy7",
        4: "https://forms.gle/5sARUYpNWZcExkYYA",
        5: "https://forms.gle/1sYNkoM3ncxjpyKUA",
        6: "https://forms.gle/Ks5fd58GmptEdJDb8",
        7: "https://forms.gle/F2NYZcLjgtWNtr1Q6",
    }
};

const spinButton = document.getElementById('spinButton');

// UPDATED: Now maps the refresh wrappers and buttons to their respective slots
const slots = [
    { element: document.getElementById('slot1'), key: 'hören', refreshWrap: document.getElementById('refresh1') },
    { element: document.getElementById('slot2'), key: 'lesen', refreshWrap: document.getElementById('refresh2') },
    { element: document.getElementById('slot3'), key: 'schreiben', refreshWrap: document.getElementById('refresh3') },
    { element: document.getElementById('slot4'), key: 'sprechen', refreshWrap: document.getElementById('refresh4') }
];

let activeUrls = { hören: null, lesen: null, schreiben: null, sprechen: null };

function getRandomNumber() {
    return Math.floor(Math.random() * 7) + 1;
}

// ---------------------------------------------------------
// NEW: Individual Slot Spin Engine (10 Seconds)
// ---------------------------------------------------------
function spinSingleSlot(slot) {
    slot.element.classList.add('spinning');
    
    const targetDuration = 10000; // Locked 10 seconds for individual spin
    let currentIntervalDelay = 40;
    let elapsedTime = 0;

    function runSingleSpinLoop() {
        slot.element.innerText = getRandomNumber();
        elapsedTime += currentIntervalDelay;

        // Deceleration curve isolated for a 10s run
        if (elapsedTime > targetDuration * 0.85) {
            currentIntervalDelay += 35; 
        } else if (elapsedTime > targetDuration * 0.65) {
            currentIntervalDelay += 15;
        } else if (elapsedTime > targetDuration * 0.4) {
            currentIntervalDelay += 4;  
        } else if (elapsedTime > targetDuration * 0.15) {
            currentIntervalDelay += 1;  
        }

        if (elapsedTime < targetDuration) {
            setTimeout(runSingleSpinLoop, currentIntervalDelay);
        } else {
            const finalNum = getRandomNumber();
            slot.element.classList.remove('spinning');
            slot.element.innerText = finalNum;
            
            activeUrls[slot.key] = formLinks[slot.key][finalNum];
            slot.element.classList.add('clickable');
            
            // Animates the refresh button into view when finished!
            slot.refreshWrap.classList.add('active');
        }
    }
    setTimeout(runSingleSpinLoop, currentIntervalDelay);
}

// Click events for individual slots AND their refresh buttons
slots.forEach(slot => {
    // 1. Slot Click Handler
    slot.element.addEventListener('click', () => {
        // If it holds a final link, open it
        if (slot.element.classList.contains('clickable') && activeUrls[slot.key]) {
            window.open(activeUrls[slot.key], '_blank');
        } 
        // If it's a "?" (not spinning and not clickable), spin ONLY this slot!
        else if (!slot.element.classList.contains('spinning') && !slot.element.classList.contains('clickable')) {
            spinSingleSlot(slot);
        }
    });

// 2. Refresh Button Click Handler
    const refreshBtn = slot.refreshWrap.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stops click from accidentally triggering other elements
            
            // Remove the old clickable state and reset the active URL
            slot.element.classList.remove('clickable');
            activeUrls[slot.key] = null;
            
            // Hide the refresh button immediately
            slot.refreshWrap.classList.remove('active');
            
            // Instantly trigger a new 10-second spin for this specific slot!
            spinSingleSlot(slot);
        });
    }
});

// ---------------------------------------------------------
// Original Global Spin Engine (START Button)
// ---------------------------------------------------------
spinButton.addEventListener('click', () => {
    spinButton.disabled = true;
    
    slots.forEach(slot => {
        slot.element.classList.remove('clickable');
        slot.element.classList.add('spinning');
        slot.refreshWrap.classList.remove('active'); // Hide refresh buttons while global spin runs
        activeUrls[slot.key] = null;
    });

    const stopTimes = [10000, 14000, 18000, 24000]; 
    let completedSlots = 0;

    slots.forEach((slot, index) => {
        let currentIntervalDelay = 40; 
        const targetDuration = stopTimes[index];
        let elapsedTime = 0;

        function runSpinLoop() {
            slot.element.innerText = getRandomNumber();
            elapsedTime += currentIntervalDelay;

            if (elapsedTime > targetDuration * 0.85) {
                currentIntervalDelay += 35; 
            } else if (elapsedTime > targetDuration * 0.65) {
                currentIntervalDelay += 15; 
            } else if (elapsedTime > targetDuration * 0.4) {
                currentIntervalDelay += 4;  
            } else if (elapsedTime > targetDuration * 0.15) {
                currentIntervalDelay += 1;  
            }

            if (elapsedTime < targetDuration) {
                setTimeout(runSpinLoop, currentIntervalDelay);
            } else {
                const finalNum = getRandomNumber();
                
                slot.element.classList.remove('spinning');
                slot.element.innerText = finalNum;
                
                activeUrls[slot.key] = formLinks[slot.key][finalNum];
                slot.element.classList.add('clickable');
                
                // Show refresh button for this specific slot once it locks in
                slot.refreshWrap.classList.add('active'); 

                completedSlots++;
                if (completedSlots === slots.length) {
                    spinButton.disabled = false; 
                }
            }
        }
        setTimeout(runSpinLoop, currentIntervalDelay);
    });
});

// Handle Collapsible Directory Component Interactions
document.getElementById('accordionToggle').addEventListener('click', function() {
    const wrapper = this.parentElement;
    wrapper.classList.toggle('active');
});

// Auto-generate link columns inside the folder menu
window.addEventListener('DOMContentLoaded', () => {
    const allLinksContainer = document.getElementById('allLinksContainer');
    
    // FIX: Explicitly forces the container to declare the layout class name
    if (allLinksContainer) {
        allLinksContainer.className = 'all-links-grid';
    }
    
    const categories = [
        { key: 'hören', title: 'Hören' },
        { key: 'lesen', title: 'Lesen' },
        { key: 'schreiben', title: 'Schreiben' },
        { key: 'sprechen', title: 'Sprechen' }
    ];

    categories.forEach(category => {
        const column = document.createElement('div');
        column.className = 'link-column';
        
        let html = `<h3>${category.title}</h3><ul>`;
        for (let i = 1; i <= 7; i++) {
            const linkUrl = formLinks[category.key][i];
            html += `<li><a href="${linkUrl}" target="_blank">${category.key}_${i}</a></li>`;
        }
        html += `</ul>`;
        
        column.innerHTML = html;
        allLinksContainer.appendChild(column);
    });
});