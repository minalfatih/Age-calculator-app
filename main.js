let input = document.querySelectorAll("input");
let arr = ["day", "month", "past"];

for (let i = 0; i < input.length; i++) {
  let empty = document.createElement("p");
  empty.className = "empty-error";
  empty.textContent = "This field is required";
  input[i].parentElement.appendChild(empty);

  let valid = document.createElement("p");
  valid.className = "valid-error";
  valid.textContent = `Must be a valid ${arr[i]}`;
  input[i].parentElement.appendChild(valid);
}

let year = new Date().getFullYear();
let month = new Date().getMonth() + 1;
let day = new Date().getDate();

let num = [31, 12, year];
let reg = [/[0-9]{1,}/gi, /[0-9]{1,}/gi, /[0-9]{4,}/gi];
let checkCount = 0;

document.querySelector(".btn").onclick = function () {
  input.forEach((inp) => {
    if (inp.value === "") {
      inp.previousElementSibling.classList.add("active");
      inp.classList.add("active");
      inp.nextElementSibling.classList.add("active");
    } else {
      inp.previousElementSibling.classList.remove("active");
      inp.classList.remove("active");
      inp.nextElementSibling.classList.remove("active");
    }
  });

  for (let i = 0; i < input.length; i++) {
    if (input[i].value !== "") {
      if (
        input[i].value.match(reg[i]) &&
        +input[i].value <= num[i] &&
        +input[i].value > 0
      ) {
        input[i].classList.add("check");
        removeActive(input[i]);
      } else {
        addActive(input[i]);
      }
    }
  }

  if (
    input[0].classList.contains("check") &&
    input[1].classList.contains("check") &&
    input[2].classList.contains("check")
  ) {
    checkCount++;
  }

  // check if all input validition true
  if (checkCount > 0) {
    let checkMonth = false;
    let checkYear = false;

    let resultYear = 0;
    let resultMonth = 0;
    let resultDay = 0;

    if (day > +input[0].value) {
      let counterDay = setInterval(countDay, 100);
      function countDay() {
        resultDay++;
        if (resultDay === day - +input[0].value) {
          clearInterval(counterDay);
        }
        document.querySelector("#ageOfDay").textContent = resultDay;
      }
    } else {
      let counterDay = setInterval(countDay, 100);
      function countDay() {
        resultDay++;
        if (resultDay === day + 30 - +input[0].value) {
          clearInterval(counterDay);
        }
        document.querySelector("#ageOfDay").textContent = resultDay;
      }
      checkMonth = true;
    }
    if (checkMonth === true) {
      if (month - 1 > +input[1].value) {
        let counterMonth = setInterval(countMonth, 100);
        function countMonth() {
          resultMonth++;
          if (resultMonth === month - 1 - +input[1].value) {
            clearInterval(counterMonth);
          }
          document.querySelector("#ageOfMonth").textContent = resultMonth;
        }
      } else {
        let counterMonth = setInterval(countMonth, 100);
        function countMonth() {
          resultMonth++;
          if (resultMonth === month - 1 + 12 - +input[1].value) {
            clearInterval(counterMonth);
          }
          document.querySelector("#ageOfMonth").textContent = resultMonth;
        }
        checkYear = true;
      }
    } else {
      document.querySelector("#ageOfMonth").textContent =
        month - +input[1].value;
    }
    if (checkYear === true) {
      let counterYear = setInterval(countYear, 100);
      function countYear() {
        resultYear++;
        if (resultYear === year - 1 - +input[2].value) {
          clearInterval(counterYear);
        }
        document.querySelector("#ageOfYear").textContent = resultYear;
      }
    } else {
      let counterYear = setInterval(countYear, 100);
      function countYear() {
        resultYear++;
        if (resultYear === year - +input[2].value) {
          clearInterval(counterYear);
        }
        document.querySelector("#ageOfYear").textContent = resultYear;
      }
    }
  }
};

function addActive(inp) {
  inp.previousElementSibling.classList.add("active");
  inp.classList.add("active");
  inp.nextElementSibling.nextElementSibling.classList.add("active");
}

function removeActive(inp) {
  inp.previousElementSibling.classList.remove("active");
  inp.classList.remove("active");
  inp.nextElementSibling.nextElementSibling.classList.remove("active");
}
