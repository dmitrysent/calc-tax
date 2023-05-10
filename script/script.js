const navigationLinks = document.querySelectorAll(".navigation__link")
const calcElems = document.querySelectorAll(".calc")
const ausn = document.querySelector(".ausn")
const formAusn = ausn.querySelector(".calc__form")
const resultTaxTotal = document.querySelector(".result__tax_total")
const calcLabelExpenses = document.querySelector(".calc__label__expenses")

const formatCurrency = (num) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 2
  }).format(num);
}


for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", () => {
    for (let j = 0; j < calcElems.length; j++) {
      if (navigationLinks[i].dataset.tax === calcElems[j].dataset.tax) {
        calcElems[j].classList.add('calc_active')
        navigationLinks[j].classList.add('navigation__link_active')
      } else {
        calcElems[j].classList.remove('calc_active')
        navigationLinks[j].classList.remove('navigation__link_active')
      }
    }
  })
}
calcLabelExpenses.style.display = "none"
formAusn.addEventListener("input", () => {

  if (formAusn.type.value === "income") {
    calcLabelExpenses.style.display = "none"
    resultTaxTotal.textContent = formatCurrency(formAusn.income.value * 0.08)
  }

  if (formAusn.type.value === "expenses") {
    calcLabelExpenses.style.display = "block"
    resultTaxTotal.textContent = formatCurrency((formAusn.income.value - formAusn.expenses.value) * 0.2)
  }
})


//самозанятый и НПД

const selfEmployment = document.querySelector(".self-employment")
const formSelfEmployment = selfEmployment.querySelector(".calc__form")
const resultTaxSelfEmployment = selfEmployment.querySelector(".result__tax")
const calcCompensation = selfEmployment.querySelector(".calc__label_compensation")
const resultBlockCompensation = selfEmployment.querySelectorAll(".result__block_compensation")

const resulTaxCompensation = selfEmployment.querySelector('.result__tax_compensation')
const resulTaxRestCompensation = selfEmployment.querySelector('.result__tax_rest-compensation')
const resultTaxResul = selfEmployment.querySelector('.result__tax_resul')

const checkCompensation = () => {
  const setDisplay = formSelfEmployment.addCompensation.checked ?
    "block" : "none"
  calcCompensation.style.display = setDisplay;
  resultBlockCompensation.forEach((elem) => {
    elem.style.display = setDisplay;
  })
}

checkCompensation()

formSelfEmployment.addEventListener("input", () => {
  const resIndividual = formSelfEmployment.individual.value * 0.04
  const resEntity = formSelfEmployment.entity.value * 0.06

  checkCompensation()

  const tax = resIndividual + resEntity;
  formSelfEmployment.compensation.value =
    formSelfEmployment.compensation.value > 10_000
    ? 10_000
    : formSelfEmployment.compensation.value;
  const benefit = formSelfEmployment.compensation.value;
  const resBenefit = formSelfEmployment.individual.value * 0.01 +
    formSelfEmployment.individual.value * 0.02;

  const finalBenefit = benefit - resBenefit > 0 ? benefit - resBenefit : 0; ;
  const finalTax = tax - (benefit - finalBenefit);

  resultTaxSelfEmployment.textContent = formatCurrency(tax);
  resulTaxCompensation.textContent = formatCurrency(benefit - finalBenefit);
  resulTaxRestCompensation.textContent = formatCurrency(finalBenefit);
  resultTaxResul.textContent = formatCurrency(finalTax);
})