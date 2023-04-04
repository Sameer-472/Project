import { useCallback, useEffect, useState } from "react";
import Validator from "validatorjs";

export default class Validation {
  validationObj = {};
  errors = {};
  constructor(fields, rules) {
    this.validation = new Validator(fields, rules);
    this.#setErrors();
  }

  fails() {
    if (this.validation?.fails()) {
      this.#setErrors();
    }
    return this.validation?.fails();
  }
  passes() {
    if (this.validation?.passes()) {
      this.setErrors();
    }
    return this.validation?.passes();
  }

  #setErrors() {
    this.errors = this.validation.errors;
  }

  all(attribute) {
    return this.errors;
  }

  has(attribute) {
    return this.errors?.has(attribute);
  }

  first(attribute) {
    console.log(this.errors.hasOwnProperty(attribute));
    if (this.errors.hasOwnProperty(attribute)) {
      return this.errors;
    }
  }
}
