function Validation() {
    //check empty
    this.checkEmpty = function (value) {
        if (value.trim() === "") {
            return true;
        }
        return false;
    };

    //check email
    this.checkEmail = function (value) {
        var regexEmail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regexEmail.test(value);
    };

    //check phoneNumber
    this.checkNumber = function (value) {
        var regexNumber = /^\d+$/;
        return regexNumber.test(value);
    };
}
