class Entry {
  constructor(amount, category, date, type) {
    this.amount = amount;
    this.category = category;
    this.date = new Date(date);
    this.type = type;
  }

  updateAmount(newAmount) {
    this.amount = newAmount;
  }

  updateCategory(newCategory) {
    this.category = newCategory;
  }
}

const entries = [];

function addEntry(amount, category, date, type) {
  const entry = new Entry(amount, category, date, type);
  entries.push(entry);
}

function calculateBalance() {
  let income = 0;
  let outlay = 0;

  for (const entry of entries) {
    if (entry.type === "income") {
      income += entry.amount;
    } else {
      outlay += entry.amount;
    }
  }

  return {
    income,
    expenses: outlay,
    balance: income - outlay,
  };
}

const addInfo = document.getElementById("addInfo");

addInfo.addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;

  if (!amount || !category || !date) {
    alert("fields are empty");
    return;
  }
  addEntry(amount, category, date, type);
  financeInfo();
});

function financeInfo() {
  const { income, expenses, balance } = calculateBalance();
  document.getElementById(
    "balanceDisplay"
  ).innerText = `income: ${income}  | outlay: ${expenses} | Balance: ${balance}`;

  const list = document.getElementById("entryList");
  list.innerHTML = "";

  for (const entry of entries) {
    const li = document.createElement("li");
    li.textContent = `${entry.date.toLocaleDateString()} | ${
      entry.category
    } | ${entry.amount} | ${entry.type === "income" ? "income" : "outlay"}`;
    list.appendChild(li);
  }
}
