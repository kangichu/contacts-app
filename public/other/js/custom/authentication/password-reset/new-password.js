"use strict";
var KTPasswordResetNewPassword = function() {
    var e, t, r, o, s = function() {
        return 100 === o.getScore()
    };
    return {
        init: function() {
            e = document.querySelector("#kt_new_password_form"),
            t = document.querySelector("#kt_new_password_submit"),
            o = KTPasswordMeter.getInstance(e.querySelector('[data-kt-password-meter="true"]')),
            r = FormValidation.formValidation(e, {
                fields: {
                	email: {
                        validators: {
                            notEmpty: {
                                message: "Email address is required"
                            },
                            emailAddress: {
                                message: "The value is not a valid email address"
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: "The password is required"
                            },
                            callback: {
                                message: "Please enter valid password",
                                callback: function(e) {
                                    if (e.value.length > 0)
                                        return s()
                                }
                            }
                        }
                    },
                    "password_confirmation": {
                        validators: {
                            notEmpty: {
                                message: "The password confirmation is required"
                            },
                            identical: {
                                compare: function() {
                                    return e.querySelector('[name="password"]').value
                                },
                                message: "The password and its confirm are not the same"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger({
                        event: {
                            password: !1
                        }
                    }),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            }),
            t.addEventListener("click", (function(s) {
                s.preventDefault(),
                r.revalidateField("password"),
                r.validate().then((function(r) {
                    "Valid" == r ? (t.setAttribute("data-kt-indicator", "on"),
                    t.disabled = !0,
                    setTimeout((function() {
                        t.removeAttribute("data-kt-indicator"),
                        t.disabled = !1,
                        Swal.fire({
                            text: "You have successfully reset your password!",
                            icon: "success",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then((function(t) {
                            $('#kt_new_password_form').submit();
                        }
                        ))
                    }
                    ), 1500)) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    })
                }
                ))
            }
            )),
            e.querySelector('input[name="password"]').addEventListener("input", (function() {
                this.value.length > 0 && r.updateFieldStatus("password", "NotValidated")
            }
            ))
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTPasswordResetNewPassword.init()
}
));
