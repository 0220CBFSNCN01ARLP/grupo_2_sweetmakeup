// const {
//    userUpdatePassword
// } = require("../../controllers/usersController");

const form = document.getElementById("contact-form");

const fields = ["firstName", "lastName", "email", "password", "rePassword", "avatar"];

form.onsubmit = (evt) => {
    debugger;
    evt.preventDefault();
    const errors = [];

    for (let fieldName of fields) {
        clearErrors(fieldName);
        validateNotEmpty(fieldName, errors);
    }

    validateEmail("email",
        errors);


    validateIsEquals("password", "rePassword",
        errors);


    minCharacters("firstName", 2, errors);
    minCharacters("lastName", 2, errors);
    minCharacters("password", 8, errors);

    if (errors.length == 0) {
        form.submit();
    } else {
        document.documentElement.scrollTop = 0;
    }
    return false;

};

function minCharacters(fieldId, min, errors) {
    const {
        field,
        invalidFeedback
    } = getFieldAndInvalidFeedback(fieldId);

    if (field.value.trim() != "" && field.value.trim().length < min) {
        field.classList.add("is-invalid");
        const msg = `${fieldId} tiene menos de ${min} caracteres`;
        displayInvalidFeedback(fieldId, msg, invalidFeedback, errors);
    }
}

function clearErrors(fieldId) {
    const {
        field,
        invalidFeedback
    } = getFieldAndInvalidFeedback(fieldId);
    field.classList.remove("is-invalid");
    invalidFeedback.innerHTML = "";
}

function validateNotEmpty(fieldId, errors) {
    const {
        field,
        invalidFeedback
    } = getFieldAndInvalidFeedback(fieldId);
    if (field.value.trim() == "") {
        field.classList.add("is-invalid");
        const msg = "no puede estar vacio";
        displayInvalidFeedback(fieldId, msg, invalidFeedback, errors);
    }
}

function validateEmail(fieldId, errors) {
    const {
        field,
        invalidFeedback
    } = getFieldAndInvalidFeedback(fieldId);
    const isEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!isEmailFormat.test(field.value)) {
        field.classList.add("is-invalid");
        const msg = "debe ser un email valido";
        displayInvalidFeedback(fieldId, msg, invalidFeedback, errors);
    }
}

function validateIsNumeric(fieldId, errors) {
    const {
        field,
        invalidFeedback
    } = getFieldAndInvalidFeedback(fieldId);
    const isNumericField = /^\d+$/;
    if (!isNumericField.test(field.value)) {
        field.classList.add("is-invalid");
        const msg = "debe ser un numero valido";
        displayInvalidFeedback(fieldId, msg, invalidFeedback, errors);
    }
}

function validateIsEquals(fieldAId, fieldBId, errors) {
    const fieldA = getFieldAndInvalidFeedback(fieldAId);
    const fieldB = getFieldAndInvalidFeedback(fieldBId);

    if (fieldA.field.value != fieldB.field.value) {
        fieldA.field.classList.add("is-invalid");
        fieldB.field.classList.add("is-invalid");
        const msgA = `Las contraseñas no coinciden`;
        displayInvalidFeedback(fieldAId, msgA, fieldA.invalidFeedback, errors);
    }
}

function displayInvalidFeedback(fieldId, msg, invalidFeedback, errors) {
    invalidFeedback.innerHTML += "<li>" + msg + "</li>";
    errors.push(`El campo '${fieldId}' ${msg}`);
}

function getFieldAndInvalidFeedback(fieldId) {
    const field = document.getElementById(fieldId);
    const invalidFeedback = document.querySelector(
        `.${fieldId}.invalid-feedback`
    );
    return {
        field,
        invalidFeedback
    };
}

////// Login

const formLogin = document.getElementById("contact-form-login");

const fieldsLogin = ["loginEmail", "loginPassword"];

formLogin.onsubmit = (evt) => {

    evt.preventDefault();
    const errors = [];

    for (let fieldName of fieldsLogin) {
        clearErrors(fieldName);
        validateNotEmpty(fieldName, errors);
    }

    validateEmail("loginEmail", errors);
    // validateIsEquals("loginPassword", errors);


    if (errors.length == 0) {
        formLogin.submit();
    } else {
        document.documentElement.scrollTop = 0;
    }
    return false;

};