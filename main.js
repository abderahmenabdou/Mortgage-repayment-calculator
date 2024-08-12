let amount = document.getElementById("amount");
let years = document.getElementById("years");
let interest = document.getElementById("interest");

let result = document.getElementById("result");
let repayment = document.getElementById("repayment");
let interestOnly = document.getElementById("interest-only");

let errorAmount = document.getElementById("error-amount");
let errorYears = document.getElementById("error-years");
let errorInterest = document.getElementById("error-interest");
let errorMortgage = document.getElementById("error-mortgage");

let myForm = document.getElementById("myForm");

myForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let isValid = true;
    if (amount.value === "") {
      errorAmount.textContent = "Field must be filled";
      errorAmount.style.color = "red";
      isValid = false;
    } else {
      errorAmount.textContent = "";
      errorAmount.style.color = "";
    }

    if (years.value === "") {
      errorYears.textContent = "Field must be filled";
      errorYears.style.color = "red";
      isValid = false;
    } else {
      errorYears.textContent = "";
      errorYears.style.color = "";
    }

    if (interest.value === "") {
      errorInterest.textContent = "Field must be filled";
      errorInterest.style.color = "red";
      isValid = false;
    } else {
      errorInterest.textContent = "";
      errorInterest.style.color = "";
    }

    if (repayment.checked && interestOnly.checked) {
      errorMortgage.textContent = "You must choose only one";
      errorMortgage.style.color = "red";
      isValid = false;
    } else if (!repayment.checked && !interestOnly.checked) {
      errorMortgage.textContent = "You must choose only one";
      errorMortgage.style.color = "red";
      isValid = false;
    } else {
      errorMortgage.textContent = "";
      errorMortgage.style.color = "";
    }

    if (!isValid) {
      return;
    }

    showData();
    clearAll();
  });

function showData() {
  let loan = Number(amount.value);
  let loanTerm = Number(years.value);
  let interestRate = Number(interest.value / 100);

  //   monthly interest rate
  let monthlyInterestRate = interestRate / 12;

  // the total number of monthly payments
  let numberOfPayments = loanTerm * 12;

  // monthly installment

  let expansion =
    monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfPayments;

  let rank = (1 + monthlyInterestRate) ** numberOfPayments - 1;

  let installment = Number((loan * (expansion / rank)).toFixed(2));

  // Total amount paid
  let totalAmountPaid = installment * numberOfPayments;

  if (repayment.checked) {
    result.innerHTML = `
            <div class="text-content">
                <h3>your results</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, quaerat numquam doloremque eos delectus recusandae.</p>
            </div>
            <div class="card">
                <div class="month">
                    <p>your monthly repayment</p>
                    <h1>$${installment}</h1>
                </div>
                <div class="total">
                    <p>total you'll repay over the term</p>
                    <h2>$${totalAmountPaid}</h2>
                </div>
            </div>
`;
  }

  if (interestOnly.checked) {
    result.innerHTML = `
    <div class="text-content">
        <h3>your results</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, quaerat numquam doloremque eos delectus recusandae.</p>
    </div>
    <div class="card">
        <div class="month">
            <p>your monthly repayment</p>
            <h1>$${installment}</h1>
        </div>
    </div>
`;
  }
}

function clearAll() {
  amount.value = "";
  years.value = "";
  interest.value = "";
}
