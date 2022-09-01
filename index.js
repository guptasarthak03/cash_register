const billInputDOM = document.querySelector('#bill-amount');
const depositInputDOM = document.querySelector('#cash-deposit');
const outputBoxDOM = document.querySelector('.output-container');
const tableCaptionDOM = document.querySelector('caption');
const calculateButton = document.querySelector('.btn-calculate');
const messageDOM = document.querySelector('.error-msg');
const noteListDOM = document.querySelectorAll('.currency-note');

const currencyList = [2000, 500, 100, 50, 10, 5, 1];

calculateButton.addEventListener('click', () => {
  // value setup for first time and reset for the reset next time
  const bill = Number(billInputDOM.value);
  const deposit = Number(depositInputDOM.value);
  let showResult = false;

  // validation: empty, negative or 0. (if )
  const isInputValidated = validateInput(bill, deposit);

  // logic
  if (isInputValidated) {
    const change = deposit - bill;
    showResult = calculateChange(change);
  }

  // display results (conditional)
  outputBoxDOM.style.display = showResult ? 'block' : 'none';
});

const showMessage = msg => {
  messageDOM.style.display = 'block';
  messageDOM.innerText = `${msg}`;
};

const validateInput = (bill, deposit) => {
  // validation: empty, negative or 0.
  switch (true) {
    case !bill:
      showMessage('Error: Bill Amount cannot be empty');
      return false;
    case bill <= 0:
      showMessage('Error: Bill Amount cannot be zero or negative');
      return false;
    case !deposit:
      showMessage('Error: Cash Deposit cannot be empty');
      return false;
    case deposit <= 0:
      showMessage('Error: Cash Deposit cannot be zero or negative');
      return false;
    case bill > deposit:
      showMessage(
        'Error: Cash Deposit must atleast be equal to the Bill Amount'
      );
      return false;
    default:
      messageDOM.style.display = 'none';
  }
  return true;
};

const calculateChange = change => {
  // if no change then return
  if (change === 0) {
    showMessage('No change to be returned');
    return false;
  }

  // show total amount in caption
  tableCaptionDOM.innerText = `Change to be returned: ₹${change} `;

  // Calculate change in currency
  for (let i = 0; i < currencyList.length; i++) {
    debugger;
    let notes = 0;
    let currency = currencyList[i];
    let check = change % currency; // remainder or same

    // case where currency note is  &enspbigger than the change
    if (check == change) {
      noteListDOM[i].innerText = '';
      continue;
    }

    if (check != change || check == 0) {
      notes = Math.trunc(change / currency);
      noteListDOM[i].innerText = notes; // populate no of currency notes in table

      change = check;
    }
  }

  return true;
};
