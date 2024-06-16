function make_account(balance, password) {
  let incorrect_trial = 0;
  let passwords = [password];

  function add_password(p) {
    passwords = [...passwords, p];
    return passwords;
  }

  function validate_password(p) {
    return passwords.some((password) => password === p);
  }

  function have_to_call_cops() {
    return incorrect_trial >= 8;
  }

  function call_the_cops() {
    return "cops are coming";
  }

  function incorrect_password() {
    incorrect_trial += 1;
    if (have_to_call_cops()) {
      call_the_cops();
    } else {
      return "incorrect password";
    }
  }

  function withdraw(amount) {
    if (balance >= amount) {
      balance = balance - amount;
      return balance;
    } else {
      return "Insufficient funds";
    }
  }

  function deposit(amount) {
    balance = balance + amount;
    return balance;
  }

  function dispatch(pw, m) {
    return m === "validate_password"
      ? () => validate_password(pw)
      : !validate_password(pw)
      ? incorrect_password
      : m === "withdraw"
      ? withdraw
      : m === "deposit"
      ? deposit
      : m === "add_password"
      ? add_password
      : error(m, "unkown request");
  }

  return dispatch;
}

function make_joint(account, password, new_password) {
  if (!account(password, "validate_password")()) return "invalid password";
  account(password, "add_password")(new_password);

  function dispatch(pw, m) {
    return account(pw, m);
  }

  return dispatch;
}

const account = make_account(300, "hello");
const connected_account = make_joint(account, "hello", "hello2");
console.log(connected_account);

console.log(connected_account("hello", "deposit")(100));
