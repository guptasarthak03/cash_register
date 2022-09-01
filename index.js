const billInputDOM = document.querySelector('#bill-amount');
const depositInputDOM = document.querySelector('#cash-deposit');
const outputBoxDOM
const calculateButton = document.querySelector('.btn-calculate');
const errorMsgDOM = document.querySelector('.error-msg');
const noteListDOM = document.querySelectorAll('.currency-note');

const currencyList = [2000, 500, 100, 50, 10, 5, 2, 1];

calculateButton.addEventListener('click', () => {
  const bill = Number(billInputDOM.value);
  const deposit = Number(depositInputDOM.value);

  // validation: empty, negative or 0. (if )
  const isInputValidated = validateInput(bill, deposit);

  // logic
  if (isInputValidated) {
    const change = deposit - bill;
    calculateChange(change);
  }
});

const showError = msg => {
  errorMsgDOM.style.display = 'block';
  errorMsgDOM.innerText = `Error: ${msg}`;
};

const validateInput = (bill, deposit) => {
  // validation: empty, negative or 0.
  switch (true) {
    case !bill:
      showError('Bill Amount cannot be empty');
      return false;
    case bill <= 0:
      showError('Bill Amount cannot be zero or negative');
      return false;
    case !deposit:
      showError('Cash Deposit cannot be empty');
      return false;
    case deposit <= 0:
      showError('Cash Deposit cannot be zero or negative');
      return false;
    case bill > deposit:
      showError('Cash Deposit must atleast be equal to the Bill Amount');
      return false;
    default:
      errorMsgDOM.style.display = 'none';
  }
  return true;
};

const calculateChange = change => {
  // if no change then return
  if (change === 0) {
    console.log('no cash to be returned');
    return;
  }

  for (let i = 0; i < currencyList.length; i++) {
    let notes = 0;
    let currency = currencyList[i];
    let check = change % currency; // remainder or same

    // case where currency note is bigger than the change
    if (check == change) {
      continue;
    }

    if (check != change || check == 0) {
      notes = Math.trunc(change / currency);
      noteListDOM[i].innerText = notes;

      change = check;
    }
  }
};
