document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        if (navLinks.classList.contains('nav-active')) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none'; // Or remove property to let CSS handle desktop
            if(window.innerWidth > 768) navLinks.style.display = 'flex';
        }
    });

    // Handle resize to reset nav display
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.classList.remove('nav-active');
        } else {
            if(!navLinks.classList.contains('nav-active')) navLinks.style.display = 'none';
        }
    });


    // --- Feature 1: Accordion ---
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const content = acc.nextElementSibling;
            const icon = acc.querySelector('.icon');
            
            // Close others (optional, keeping for better UX)
            // accordions.forEach(other => {
            //     if(other !== acc) {
            //         other.nextElementSibling.classList.remove('active');
            //         other.querySelector('.icon').textContent = '+';
            //     }
            // });

            content.classList.toggle('active');
            icon.textContent = content.classList.contains('active') ? '-' : '+';
        });
    });


    // --- Feature 2: Topics Modal ---
    const topicData = {
        'budgeting': {
            title: 'Budgeting for Households',
            content: `
                <p><strong>What is it?</strong> A plan for how you will spend your money. It balances income vs expenses.</p>
                <br>
                <p><strong>Example:</strong> The 50/30/20 Rule.</p>
                <ul>
                    <li>50% Needs (Rent, Food)</li>
                    <li>30% Wants (Movies, Dining)</li>
                    <li>20% Savings (Future)</li>
                </ul>
                <br>
                <div style="background:#f0ffff; padding:10px; border-radius:8px;">
                    ✅ <strong>Do:</strong> Track every rupee.<br>
                    ❌ <strong>Don't:</strong> Forget annual payments (insurance).
                </div>
            `
        },
        'saving': {
            title: 'Saving vs Spending',
            content: `
                <p><strong>The Golden Rule:</strong> Save first, spend later. Don't save what is left after spending; spend what is left after saving.</p>
                <br>
                <p><strong>Why?</strong> For emergencies, education, and big goals.</p>
                <br>
                <div style="background:#f0ffff; padding:10px; border-radius:8px;">
                    ✅ <strong>Do:</strong> Automate savings to a separate account.<br>
                    ❌ <strong>Don't:</strong> Dip into savings for luxury items.
                </div>
            `
        },
        'banking': {
            title: 'Banking Basics',
            content: `
                <p><strong>Bank Account:</strong> A safe place to keep money. You get interest (extra money) on savings.</p>
                <p><strong>UPI:</strong> Digital payment system on your phone. Fast & easy.</p>
                <br>
                <div style="background:#f0ffff; padding:10px; border-radius:8px;">
                    ✅ <strong>Do:</strong> Check your passbook/statement monthly.<br>
                    ❌ <strong>Don't:</strong> Share your PIN or OTP with anyone.
                </div>
            `
        },
        'loans': {
            title: 'Loans & EMIs',
            content: `
                <p><strong>Loan:</strong> Money borrowed that must be paid back with <em>Interest</em> (extra cost).</p>
                <p><strong>EMI:</strong> Equated Monthly Installment. A fixed amount you pay every month.</p>
                <br>
                <p>High interest = You pay back MUCH more than you took.</p>
                <div style="background:#f0ffff; padding:10px; border-radius:8px;">
                    ✅ <strong>Do:</strong> Compare interest rates before taking a loan.<br>
                    ❌ <strong>Don't:</strong> Borrow for depreciating assets (like a gadget) if not needed.
                </div>
            `
        },
        'insurance': {
            title: 'Insurance & Emergency Funds',
            content: `
                <p><strong>Emergency Fund:</strong> 3-6 months of expenses kept safe for job loss or medical issues.</p>
                <p><strong>Insurance:</strong> You pay a small amount (premium) to protect against big losses (hospital bills, accidents).</p>
                <br>
                <div style="background:#f0ffff; padding:10px; border-radius:8px;">
                    ✅ <strong>Do:</strong> Get Health Insurance for the family.<br>
                    ❌ <strong>Don't:</strong> Treat insurance as investment. It is for protection.
                </div>
            `
        }
    };

    const modal = document.getElementById('topic-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');
    const topicCards = document.querySelectorAll('.topic-card');

    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.getAttribute('data-topic');
            if (topicData[topic]) {
                modalTitle.textContent = topicData[topic].title;
                modalBody.innerHTML = topicData[topic].content;
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });


    // --- Feature 3: Quiz ---
    const questions = [
        {
            q: "If your monthly income is ₹20,000 and expenses are ₹19,500, what should you do?",
            a: ["Take a loan", "Cut expenses to save at least 10-20%", "Ignore it", "Spend the remaining ₹500 on pizza"],
            correct: 1, // Index
            feedback: "Correct! Saving 10-20% is a healthy financial habit."
        },
        {
            q: "What is an Emergency Fund used for?",
            a: ["Buying a new phone", "Vacation", "Unexpected medical bills or job loss", "Investment in stocks"],
            correct: 2,
            feedback: "Right! It's a safety net for unexpected events."
        },
        {
            q: "Which of these is a 'Need'?",
            a: ["Designer clothes", "Groceries", "Netflix subscription", "Latest iPhone"],
            correct: 1,
            feedback: "Yes, food/groceries are essential needs."
        },
        {
            q: "What does EMI stand for?",
            a: ["Every Month Income", "Easy Money Installment", "Equated Monthly Installment", "Extra Money Interest"],
            correct: 2,
            feedback: "Correct! It's the fixed amount you pay back on a loan."
        },
        {
            q: "Why is compound interest called 'magic'?",
            a: ["It doubles money in 1 day", "You earn interest on your interest", "It is illegal", "Only banks get it"],
            correct: 1,
            feedback: "Exactly! Your interest earns more interest, growing money faster over time."
        }
    ];

    let currentQ = 0;
    let score = 0;
    const quizContainer = document.getElementById('quiz-question');
    const quizResult = document.getElementById('quiz-result');
    const startBtn = document.getElementById('start-quiz-btn');

    startBtn.addEventListener('click', () => {
        document.querySelector('.quiz-start').classList.add('hidden');
        quizContainer.classList.remove('hidden');
        loadQuestion();
    });

    function loadQuestion() {
        if (currentQ >= questions.length) {
            showResult();
            return;
        }
        
        const qData = questions[currentQ];
        let html = `<h3>Question ${currentQ + 1}/${questions.length}</h3>
                    <p style="margin:1rem 0; font-size:1.1rem;">${qData.q}</p>
                    <div class="quiz-options">`;
        
        qData.a.forEach((ans, index) => {
            html += `<button onclick="checkAnswer(${index})">${ans}</button>`;
        });
        html += `</div>`;
        
        quizContainer.innerHTML = html;
    }

    window.checkAnswer = (index) => {
        const qData = questions[currentQ];
        const buttons = quizContainer.querySelectorAll('button');
        
        if (index === qData.correct) {
            score++;
            buttons[index].classList.add('correct');
            buttons[index].innerHTML += " ✅";
        } else {
            buttons[index].classList.add('wrong');
            buttons[qData.correct].classList.add('correct');
        }

        // Disable all buttons
        buttons.forEach(btn => btn.disabled = true);

        // Show feedback delay
        setTimeout(() => {
            currentQ++;
            loadQuestion();
        }, 1500);
    };

    function showResult() {
        quizContainer.classList.add('hidden');
        quizResult.classList.remove('hidden');
        
        let msg = "";
        if (score === 5) msg = "🌟 Financial Genius!";
        else if (score >= 3) msg = "👍 Good Job! Keep learning.";
        else msg = "💪 You can do better! Read the basics again.";

        quizResult.innerHTML = `
            <h3>Quiz Completed!</h3>
            <p style="font-size:1.5rem; margin:1rem 0;">Score: ${score} / 5</p>
            <p>${msg}</p>
            <button class="btn btn-primary" onclick="location.reload()" style="margin-top:1rem;">Restart</button>
        `;
    }


    // --- Feature 4: Calculators ---
    
    // EMI Calculator
    document.getElementById('calc-emi-btn').addEventListener('click', () => {
        const P = parseFloat(document.getElementById('emi-principal').value);
        const R = parseFloat(document.getElementById('emi-rate').value);
        const N = parseFloat(document.getElementById('emi-tenure').value);

        if (!P || !R || !N) {
            alert("Please fill all fields");
            return;
        }

        const r = R / 12 / 100; // Monthly rate
        const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
        const totalPay = emi * N;
        const totalInt = totalPay - P;

        document.getElementById('emi-monthly').textContent = `₹${Math.round(emi).toLocaleString()}`;
        document.getElementById('emi-total-interest').textContent = `₹${Math.round(totalInt).toLocaleString()}`;
        document.getElementById('emi-total-payment').textContent = `₹${Math.round(totalPay).toLocaleString()}`;
        
        document.getElementById('emi-result').classList.remove('hidden');
    });

    // Savings Calculator
    document.getElementById('calc-save-btn').addEventListener('click', () => {
        const amt = parseFloat(document.getElementById('save-monthly').value);
        const yrs = parseFloat(document.getElementById('save-years').value);
        const rate = parseFloat(document.getElementById('save-rate').value);

        if (!amt || !yrs || !rate) {
            alert("Please fill all fields");
            return;
        }

        // Future value of SIP formula: P * ({[1 + i]^n - 1} / i) * (1 + i)
        // i = monthly rate, n = months
        const i = rate / 12 / 100;
        const n = yrs * 12;
        
        const totalValue = amt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const invested = amt * n;

        document.getElementById('save-invested').textContent = `₹${Math.round(invested).toLocaleString()}`;
        document.getElementById('save-total').textContent = `₹${Math.round(totalValue).toLocaleString()}`;
        
        document.getElementById('save-result').classList.remove('hidden');
    });


    // --- Feature 5: AI Guide ---
    const dictionary = {
        "emi": "Equated Monthly Installment. A fixed amount you pay to the bank every month to repay a loan.",
        "interest": " The cost of borrowing money. If you borrow ₹100 at 10% interest, you pay back ₹110.",
        "savings": "Money you put aside for future use. It should be the first thing you do when you get money.",
        "budget": "A plan that helps you track money coming in and money going out.",
        "inflation": "When prices of things go up over time. ₹100 today buys less than ₹100 ten years ago.",
        "asset": "Something that puts money in your pocket (like a house on rent, or stocks).",
        "liability": "Something that takes money out of your pocket (like a car loan, or expensive subscription).",
        "insurance": "Safety net. You pay a small fee to protect yourself from big financial losses.",
        "fd": "Fixed Deposit. You lock money with a bank for some time to get guaranteed interest.",
        "credit score": "A report card of your financial behavior. Paying loans on time improves it.",
        "mf": "Mutual Fund. Many people pool money together to invest in stocks or bonds.",
        "sip": "Systematic Investment Plan. Investing a small fixed amount every month automatically."
    };

    const aiInput = document.getElementById('ai-input');
    const aiBtn = document.getElementById('ai-ask-btn');
    const aiResponse = document.getElementById('ai-response');
    const chips = document.querySelectorAll('.term-chip');

    function getResponse(query) {
        query = query.trim().toLowerCase();
        let answer = "I'm still learning! Try searching for 'EMI', 'Budget', 'Savings', or 'Interest'.";
        
        // Simple fuzzy match check
        for (let key in dictionary) {
            if (query.includes(key)) {
                answer = `<strong>${key.toUpperCase()}:</strong> ${dictionary[key]}`;
                break;
            }
        }
        
        aiResponse.innerHTML = answer;
        aiResponse.classList.remove('hidden');
    }

    aiBtn.addEventListener('click', () => {
        if(aiInput.value) getResponse(aiInput.value);
    });

    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && aiInput.value) getResponse(aiInput.value);
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            aiInput.value = chip.textContent;
            getResponse(chip.textContent);
        });
    });

});
