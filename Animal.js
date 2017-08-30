
//  This is a Constructor function taking age and passport
//  as the paramaters
function Animal(age, passport) {
  this.age = age;
  this.passport = passport;
}
// Sets the age
//
Animal.prototype.setAge = function(age) {
    this.age = age;
};
// Checks whether the Animal is Adult based on the age
//
Animal.prototype.isAdult = function() {
    return this.age >= 18? true: false;
};
// Checks whether the Animal can have bank accounts
// based on whether he/she is an adult
//
Animal.prototype.canHaveBankAccounts = function() {
    return this.isAdult()?true:false;
};
// Sets the passport status of the Animal
//
Animal.prototype.passportStatus = function(status) {
    this.passport = status;
};
// Checks whether the Animal has a passport
//
Animal.prototype.hasPassport = function() {
    return this.passport;
};
//  Sets the Animal object to module.exports
//
module.exports = Animal;
