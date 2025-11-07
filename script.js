// ======== Login and Signup ========
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function signup() {
  let user = document.getElementById("signupUser").value;
  let pass = document.getElementById("signupPass").value;
  if (user && pass) {
    localStorage.setItem(user, pass);
    alert("Signup successful! Please login.");
    showLogin();
  } else {
    alert("Please fill in all fields!");
  }
}

function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;
  let storedPass = localStorage.getItem(user);
  
  if (pass === storedPass) {
    localStorage.setItem("loggedInUser", user);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ======== Dashboard ========
window.onload = function() {
  let user = localStorage.getItem("loggedInUser");
  if (user && document.getElementById("userDisplay")) {
    document.getElementById("userDisplay").innerText = user;
    loadTransactions();
  }
};

function addTransaction() {
  let user = localStorage.getItem("loggedInUser");
  let desc = document.getElementById("desc").value;
  let amount = parseFloat(document.getElementById("amount").value);
  let type = document.getElementById("type").value;

  if (!desc || !amount) {
    alert("Please enter valid details!");
    return;
  }

  let transactions = JSON.parse(localStorage.getItem(user + "_transactions")) || [];
  transactions.push({ desc, amount, type });
  localStorage.setItem(user + "_transactions", JSON.stringify(transactions));
  loadTransactions();
}

function loadTransactions() {
  let user = localStorage.getItem("loggedInUser");
  let transactions = JSON.parse(localStorage.getItem(user + "_transactions")) || [];
  let history = document.getElementById("history");
  let balance = 0;
  history.innerHTML = "";

  transactions.forEach(t => {
    let li = document.createElement("li");
    li.textContent = `${t.desc}: ₹${t.amount} (${t.type})`;
    history.appendChild(li);
    balance += t.type === "income" ? t.amount : -t.amount;
  });

  document.getElementById("balance").innerText = balance;
}
