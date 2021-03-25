'use strict';

// Код валидации формы
(function () {
	window.validateForm = function (params) {
		var form = document.getElementById(params.formId);

		form.addEventListener('blur', blurHandler, true);
		form.addEventListener('focus', focusHandler, true);
		form.addEventListener('submit', submitHandler);

		function blurHandler (event) {
			if (event.target.tagName === "INPUT") {
				checkInput(event.target)
			}
		}

		function focusHandler (event) {
			if (event.target.tagName === "INPUT" && event.target.classList.contains(params.inputErrorClass)) {
				event.target.classList.remove(params.inputErrorClass);
			}
		}

		function submitHandler (event) {
			event.preventDefault();

			if (form.classList.contains(params.formValidClass)) {
				form.classList.remove(params.formValidClass);
			}
			if (form.classList.contains(params.formInvalidClass)) {
				form.classList.remove(params.formInvalidClass);
			}

			var elems = Array.from(form.querySelectorAll("input"));
			var isValid = true;
			elems.forEach(function (elem) {
				checkInput(elem);
				isValid = (isValid && !elem.classList.contains(params.inputErrorClass)) ? true : false;
			});
			if (isValid) {
				form.classList.add(params.formValidClass);
			}
			else {
				form.classList.add(params.formInvalidClass);
			}
		}

		function checkInput (elem) {
			var isValid = (elem.hasAttribute("data-required") && !elem.value) ? false : true;
			switch (elem.dataset.validator) {
				case "letters":
					isValid = (isValid && /^[a-z]*$|^[а-яё]*$/i.test(elem.value)) ? true : false;
					break;
				case "number":
					isValid = (isValid && /^\d*$/.test(elem.value)) ? true : false;
					if (elem.hasAttribute("data-validator-min")) {
						isValid = (isValid && elem.value >= Number(elem.dataset.validatorMin)) ? true : false;
					}
					if (elem.hasAttribute("data-validator-max")) {
						isValid = (isValid && elem.value <= Number(elem.dataset.validatorMax)) ? true : false;
					}
					break;
				case "regexp":
					var re = new RegExp(elem.dataset.validatorPattern);
					isValid = (isValid && re.test(elem.value)) ? true : false;
					break;
				}
			if (!isValid) {
				elem.classList.add(params.inputErrorClass);
			}
		}
	}
})();