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
const slots = [
    { element: document.getElementById('slot1'), key: 'hören' },
    { element: document.getElementById('slot2'), key: 'lesen' },
    { element: document.getElementById('slot3'), key: 'schreiben' },
    { element: document.getElementById('slot4'), key: 'sprechen' }
];

let activeUrls = { hören: null, lesen: null, schreiben: null, sprechen: null };

function getRandomNumber() {
    return Math.floor(Math.random() * 7) + 1;
}

// Click events for individual slots
slots.forEach(slot => {
    slot.element.addEventListener('click', () => {
        if (slot.element.classList.contains('clickable') && activeUrls[slot.key]) {
            window.open(activeUrls[slot.key], '_blank');
        }
    });
});

// Authentic Decelerating, Staggered Slot Machine Spin Engine
spinButton.addEventListener('click', () => {
    spinButton.disabled = true;
    
    slots.forEach(slot => {
        slot.element.classList.remove('clickable');
        slot.element.classList.add('spinning');
        activeUrls[slot.key] = null;
    });

    // TIMING MATH:
    // Slot 1 stops at 10s mark.
    // Slot 2 stops 4s later (14s).
    // Slot 3 stops 4s later (18s).
    // Slot 4 stops 6s later (24s) -> providing that extra 2 seconds of runtime!
    const stopTimes = [10000, 14000, 18000, 24000]; 
    let completedSlots = 0;

    slots.forEach((slot, index) => {
        let currentIntervalDelay = 40; // Initial ultra-fast baseline pace
        const targetDuration = stopTimes[index];
        let elapsedTime = 0;

        function runSpinLoop() {
            slot.element.innerText = getRandomNumber();
            elapsedTime += currentIntervalDelay;

            // Deceleration Curve: Smoothly adjusted to adapt to the ultra-long 30s timeline
            if (elapsedTime > targetDuration * 0.85) {
                currentIntervalDelay += 35; // Sharp brake at the very end
            } else if (elapsedTime > targetDuration * 0.65) {
                currentIntervalDelay += 15; // Noticeable slow down
            } else if (elapsedTime > targetDuration * 0.4) {
                currentIntervalDelay += 4;  // Gentle velocity reduction
            } else if (elapsedTime > targetDuration * 0.15) {
                currentIntervalDelay += 1;  // Micro adjustments
            }

            if (elapsedTime < targetDuration) {
                setTimeout(runSpinLoop, currentIntervalDelay);
            } else {
                // Lock down final result for this specific wheel
                const finalNum = getRandomNumber();
                
                // Stripping the visual blur target wrapper class BEFORE loading text 
                // so the text-shadow disappears and snaps to a crisp solid tone instantly.
                slot.element.classList.remove('spinning');
                slot.element.innerText = finalNum;
                
                activeUrls[slot.key] = formLinks[slot.key][finalNum];
                slot.element.classList.add('clickable');

                completedSlots++;
                if (completedSlots === slots.length) {
                    spinButton.disabled = false; // Re-enable click accessibility when last wheel settles
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