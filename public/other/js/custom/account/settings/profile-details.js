"use strict";
var KTAccountSettingsProfileDetails = function() {
    var e, t, o;
    return {
        init: function() {
            e = document.getElementById("kt_account_profile_details_form"),
            o = e.querySelector('[data-kt-stepper-action="submit"]'),
            t = FormValidation.formValidation(e, {
                fields: {
                    fname: {
                        validators: {
                            notEmpty: {
                                message: "First name is required"
                            }
                        }
                    },
                    lname: {
                        validators: {
                            notEmpty: {
                                message: "Last name is required"
                            }
                        }
                    },
                    phone: {
                        validators: {
                            notEmpty: {
                                message: "Contact phone number is required"
                            }
                        }
                    },
                    email: {
                        validators: {
                            notEmpty: {
                                message: "Your Email Account is required"
                            },
                            emailAddress: {
                                message: "The value is not a valid email address"
                            }
                        }
                    },
                    account_type: {
                        validators: {
                            notEmpty: {
                                message: "Please select an account type"
                            }
                        }
                    },
                    business_name: {
                        validators: {
                            notEmpty: {
                                message: "Business name is required"
                            }
                        }
                    },
                    business_email: {
                        validators: {
                            notEmpty: {
                                message: "Business Email Account is required"
                            },
                            emailAddress: {
                                message: "The value is not a valid email address"
                            }
                        }
                    },
                    business_description: {
                        validators: {
                            notEmpty: {
                                message: "Provide a description of your business"
                            }
                        }
                    },
                    website: {
                        validators: {
                            notEmpty: {
                                message: "Business website is required"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    submitButton: new FormValidation.plugins.SubmitButton,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            }),
            
            o.addEventListener("click", (function(e) {
                t.validate().then((function(t) {
                    console.log("validated!"),
                    "Valid" == t ? (e.preventDefault(),
                    o.disabled = !0,
                    o.setAttribute("data-kt-indicator", "on"),
                    setTimeout((function() {
                        o.removeAttribute("data-kt-indicator"),
                        o.disabled = !1,
                        Swal.fire({
                            text: "Form has been successfully submitted!",
                            icon: "success",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then((function(t) {
                            $("#kt_account_profile_details_form").submit();
                        }
                        ))
                    }), 2e3)) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-light"
                        }
                    }).then((function() {
                        KTUtil.scrollTop()
                    }
                    ))
                }
                ))
            }
            ))
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTAccountSettingsProfileDetails.init()
}
));
