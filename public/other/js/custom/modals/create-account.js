"use strict";
var KTCreateAccount = function() {
    var e, t, p, i, o, s, r, a = [];
    return {
        init: function() {
            (e = document.querySelector("#kt_modal_create_account")) && new bootstrap.Modal(e),
            t = document.querySelector("#kt_create_account_stepper"),
            i = t.querySelector("#kt_create_account_form"),
            p = document.querySelectorAll('.accounts'),
            o = t.querySelector('[data-kt-stepper-action="submit"]'),
            s = t.querySelector('[data-kt-stepper-action="next"]'),
            (r = new KTStepper(t)).on("kt.stepper.changed", (function(e) {
                3 === r.getCurrentStepIndex() ? (o.classList.remove("d-none"),
                o.classList.add("d-inline-block"),
                s.classList.add("d-none")) : 4 === r.getCurrentStepIndex() ? (o.classList.add("d-none"),
                s.classList.add("d-none")) : (o.classList.remove("d-inline-block"),
                o.classList.remove("d-none"),
                s.classList.remove("d-none"))
            }
            )),
           
            r.on("kt.stepper.next", (function(e) {
                console.log("stepper.next");
                var t = a[e.getCurrentStepIndex() - 1];
                t ? t.validate().then((function(t) {
                    console.log("validated!"),
                    "Valid" == t ? (e.goNext(),
                    KTUtil.scrollTop()) : Swal.fire({
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
                )) : (e.goNext(),
                KTUtil.scrollTop())
            }
            )),
            r.on("kt.stepper.previous", (function(e) {
                console.log("stepper.previous"),
                e.goPrevious(),
                KTUtil.scrollTop()
            }
            )),  

            a.push(FormValidation.formValidation(i, {
                fields: {
                    account_type: {
                        validators: {
                            notEmpty: {
                                message: "Account type is required"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),
            
            a.push(FormValidation.formValidation(i, {
                fields: {
                    first: {
                        validators: {
                            notEmpty: {
                                message: "Your First Name is required"
                            }
                        }
                    },
                    last: {
                        validators: {
                            notEmpty: {
                                message: "Your Last Name is required"
                            }
                        }
                    },
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
                    mobile: {
                        validators: {
                            notEmpty: {
                                message: "Your Phone Number is required"
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: "Please create a secure password"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),

            a.push(FormValidation.formValidation(i, {
                fields: {
                    business_name: {
                        validators: {
                            notEmpty: {
                                message: "Busines name is required"
                            }
                        }
                    },
                    business_descriptor: {
                        validators: {
                            notEmpty: {
                                message: "Busines descriptor is required"
                            }
                        }
                    },
                    business_description: {
                        validators: {
                            notEmpty: {
                                message: "Busines description is required"
                            }
                        }
                    },
                    business_site: {
                        validators: {
                            notEmpty: {
                                message: "Busines site is required"
                            }
                        }
                    },
                    business_email: {
                        validators: {
                            notEmpty: {
                                message: "Busines email is required"
                            },
                            emailAddress: {
                                message: "The value is not a valid email address"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            })),

            o.addEventListener("click", (function(e) {
                a[2].validate().then((function(t) {
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

                            function password_generator( len ) 
                            {
                                var length = (len)?(len):(10);
                                var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
                                var numeric = '0123456789';
                                var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
                                var password = "";
                                var character = "";
                                var crunch = true;
                                while( password.length<length ) {
                                    var entity1 = Math.ceil(string.length * Math.random()*Math.random());
                                    var entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
                                    var entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
                                    var hold = string.charAt( entity1 );
                                    hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
                                    character += hold;
                                    character += numeric.charAt( entity2 );
                                    character += punctuation.charAt( entity3 );
                                    password = character;
                                }
                                password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
                                return password.substr(0,len);
                            }

                            let first = $('input[name = first]').val();
                            let last = $('input[name = last]').val();
                            let mobile = $('input[name = mobile]').val();
                            let email = $('input[name = email]').val();
                            let password = $('input[name = password]').val();
                            let account_type = $('input[name = account_type]').val();
                            let business_name = $('input[name = business_name]').val();
                            let business_descriptor = $('input[name = business_descriptor]').val();
                            let business_description = $('textarea[name = business_description]').val();
                            let business_site = $('input[name = business_site]').val();
                            let business_email = $('input[name = business_email]').val();
                            

                            $.ajaxSetup({
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                }
                            });

                            $.ajax({
                                url:'register',
                                type:'POST',
                                data: {
                                    'first': first,
                                    'last': last,
                                    'mobile': mobile,
                                    'email': email,
                                    'account_type': account_type,
                                    'password': password,
                                    'business_name': business_name,
                                    'business_descriptor': business_descriptor,
                                    'business_description': business_description,
                                    'business_site': business_site,
                                    'business_email': business_email,
                                },
                                success: function(data) {
                                    r.goNext();
                                },
                                error:function (e) {
                                    Swal.fire({
                                        text: "Sorry, looks like there are some errors detected, please try again.",
                                        icon: "error",
                                        buttonsStyling: !1,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-light"
                                        }
                                    }).then((function() {
                                        KTUtil.scrollTop()
                                    }));
                                }
                            });
                                                     
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
    KTCreateAccount.init()
}
));
