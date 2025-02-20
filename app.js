
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        const totalIncomeEl = document.getElementById('total-income');
        const totalExpensesEl = document.getElementById('total-expenses');
        const balanceEl = document.getElementById('balance');
        const listEl = document.getElementById('list');
        const descriptionEl = document.getElementById('description');
        const amountEl = document.getElementById('amount');
        const addBtn = document.getElementById('add-btn');

        function updateSummary() {
            const totalIncome = transactions
                .filter(t => t.amount > 0)
                .reduce((acc, t) => acc + t.amount, 0);
            const totalExpenses = transactions
                .filter(t => t.amount < 0)
                .reduce((acc, t) => acc + t.amount, 0);
            const balance = totalIncome + totalExpenses;

            totalIncomeEl.textContent = totalIncome;
            totalExpensesEl.textContent = totalExpenses;
            balanceEl.textContent = balance;
        }

        function renderTransactions() {
            listEl.innerHTML = '';
            transactions.forEach((transaction, index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-item');
                listItem.innerHTML = `
                    ${transaction.description} <span>${transaction.amount}</span>
                    <button onclick="deleteTransaction(${index})">x</button>
                `;
                listEl.appendChild(listItem);
            });
        }

        function addTransaction() {
            const description = descriptionEl.value;
            const amount = parseFloat(amountEl.value);

            if (description && !isNaN(amount)) {
                transactions.push({ description, amount });
                localStorage.setItem('transactions', JSON.stringify(transactions));
                descriptionEl.value = '';
                amountEl.value = '';
                updateSummary();
                renderTransactions();
            }
        }

        function deleteTransaction(index) {
            transactions.splice(index, 1);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            updateSummary();
            renderTransactions();
        }

        addBtn.addEventListener('click', addTransaction);

        updateSummary();
        renderTransactions();