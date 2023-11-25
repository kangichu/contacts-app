"use strict";
var KTCreateApp = function() {
    var e, t, o, r, a, i, n = [];
    return {
        init: function() {
            (e = document.querySelector("#kt_modal_create_app")),
            t = document.querySelector("#kt_modal_create_app_stepper"),
            o = document.querySelector("#kt_modal_create_listing_form"),
            r = t.querySelector('[data-kt-stepper-action="submit"]'),
            a = t.querySelector('[data-kt-stepper-action="next"]'),
            (i = new KTStepper(t)).on("kt.stepper.changed", (function(e) {
                3 === i.getCurrentStepIndex() ? (r.classList.remove("d-none"),
                r.classList.add("d-inline-block"),
                a.classList.add("d-none")) : 4 === i.getCurrentStepIndex() ? (r.classList.add("d-none"),
                a.classList.add("d-none")) : (r.classList.remove("d-inline-block"),
                r.classList.remove("d-none"),
                a.classList.remove("d-none"))
            }
            )),
            i.on("kt.stepper.next", (function(e) {
                // console.log("stepper.next");
                var t = n[e.getCurrentStepIndex() - 1];
                t ? t.validate().then((function(t) {
                    // console.log("validated!"),
                    "Valid" == t ? e.goNext() : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-light"
                        }
                    }).then((function() {}
                    ))
                }
                )) : (e.goNext(),
                KTUtil.scrollTop())
            }
            )),
            i.on("kt.stepper.previous", (function(e) {
                // console.log("stepper.previous"),
                e.goPrevious(),
                KTUtil.scrollTop()
            }
            )),
            r.addEventListener("click", (function(e) {
                n[2].validate().then((function(t) {
                    // console.log("validated!"),
                    "Valid" == t ? (e.preventDefault(),
                    r.disabled = !0,
                    r.setAttribute("data-kt-indicator", "on"),
                    setTimeout((function() {
                        Swal.fire({
                            text: "Form has been successfully submitted!",
                            icon: "success",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then((function(t) {
                            // r.removeAttribute("data-kt-indicator"),
                            // r.disabled = !1,

                            let values = $('#kt_modal_create_listing_form').serializeArray().reduce((map, input) => {
                                let value;
                                if (map.hasOwnProperty(input.name)) {
                                    value = Array.isArray(map[input.name]) ?
                                        map[input.name] : [map[input.name]];
                                    value.push(input.value);
                                } else {
                                    value = input.value;
                                }
                                map[input.name] = value;
                                return map;
                            }, {});

                            var token = $('meta[name="csrf-token"]').attr('content');

                            let route = $('input[name = route]').val();

                            let subscription_id = $('input[name = subscription_id]').val();


                            var final_url = (route == "create") ? '/subscription' : '/subscription/'+subscription_id;
                            var final_type = (route == "create") ? 'POST' : 'PUT';

                            $.ajax({
                                url: final_url,
                                type: final_type,
                                data: { '_token' : token, values},
                                success: function(response) 
                                {
                                    if(response.status == 200)
                                        i.goNext();
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
                    }
                    ), 2e3)) : Swal.fire({
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
            )),
            
            n.push(FormValidation.formValidation(o, {
                fields: {
                    name: {
                        validators: {
                            notEmpty: {
                                message: "Subscription name is required"
                            }
                        }
                    },
                    category: {
                        validators: {
                            notEmpty: {
                                message: "Category is required"
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
            n.push(FormValidation.formValidation(o, {
                fields: {
                    account_type: {
                        validators: {
                            notEmpty: {
                                message: "An account type is required",
                            }

                        }
                    },
                    description: {
                        validators: {
                            notEmpty: {
                                message: "A description is required",
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
            n.push(FormValidation.formValidation(o, {
                fields: {
                    charge: {
                        validators: {
                            notEmpty: {
                                message: "Your subscription charge is required"
                            }
                        }
                    },
                    recommend: {
                        validators: {
                            notEmpty: {
                                message: "This is required"
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
            }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTCreateApp.init()
}
));
