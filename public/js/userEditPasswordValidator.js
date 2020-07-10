const formPassword = document.getElementById("contact-form-password");

const fieldsPassword = ["password", "rePassword"];

formPassword.onsubmit = (evt) => {

    evt.preventDefault();
    const errors = [];

    for (let fieldName of fieldsPassword) {
        clearErrors(fieldName);
        validateNotEmpty(fieldName, errors);
    }

    validateIsEquals("password", "rePassword", errors);

    minCharacters("password", 8, errors);
    if (errors.length == 0) {
        formPassword.submit();
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

    if (field.value != "" && field.value.length < min) {
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
    if (field.value == "") {
        field.classList.add("is-invalid");
        const msg = "no puede estar vacio";
        displayInvalidFeedback(fieldId, msg, invalidFeedback, errors);
    }
}

function validateIsEquals(fieldAId, fieldBId, errors) {
    const fieldA = getFieldAndInvalidFeedback(fieldAId);
    const fieldB = getFieldAndInvalidFeedback(fieldBId);

    if (fieldA.field.value != fieldB.field.value) {
        fieldA.field.classList.add("is-invalid");
        fieldB.field.classList.add("is-invalid");
        const msgA = `debe ser el mismo valor que ${fieldBId}`;
        const msgB = `debe ser el mismo valor que ${fieldAId}`;
        displayInvalidFeedback(fieldAId, msgA, fieldA.invalidFeedback, errors);
        displayInvalidFeedback(fieldBId, msgB, fieldB.invalidFeedback, errors);
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