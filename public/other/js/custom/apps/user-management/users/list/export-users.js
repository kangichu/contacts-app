"use strict";
var KTModalExportUsers = function() {
    const t = document.getElementById("kt_modal_export_users")
      , e = t.querySelector("#kt_modal_export_users_form")
      , n = new bootstrap.Modal(t);
    return {
        init: function() {
            !function() {
                var o = FormValidation.formValidation(e, {
                    fields: {
                        role: {
                            validators: {
                                notEmpty: {
                                    message: "Member role is required"
                                }
                            }
                        },
                        format: {
                            validators: {
                                notEmpty: {
                                    message: "File format is required"
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
                });
                const i = t.querySelector('[data-kt-users-modal-action="submit"]');
                i.addEventListener("click", (function(t) {
                    t.preventDefault(),
                    o && o.validate().then((function(t) {
                        console.log("validated!"),
                        "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"),
                        i.disabled = !0,
                        setTimeout((function() {
                            i.removeAttribute("data-kt-indicator"),
                            Swal.fire({
                                text: "Request has been created!",
                                icon: "success",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then((function(t) {

                                let values = $('#kt_modal_export_users_form').serializeArray().reduce((map, input) => {
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

                                $.ajax({
                                    url: '/export',
                                    type: 'POST',
                                    data: { '_token' : token, values},
                                    dataType: 'json',
                                    xhrFields: {
                                        responseType: "blob",
                                    },
                                    success: function (response) {
                                        if (response.status === 'success') {
                                            // Handle the success response (e.g., show a success message)
                                            Swal.fire({
                                                text: "Export successful!",
                                                icon: "success",
                                                buttonsStyling: !1,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: {
                                                    confirmButton: "btn btn-primary"
                                                }
                                            });

                                            
                                
                                            // For Excel format
                                            if (values.format === 'excel') {
                                                // Redirect to the download URL returned in the response
                                                window.open(response.url, '_blank');
                                            }
                                
                                            // For CSV format
                                            if (values.format === 'csv') {
                                                // Use Blob and URL.createObjectURL to trigger the file download
                                                var blob = new Blob([response.data], { type: 'text/csv' });
                                                var url = window.URL.createObjectURL(blob);
                                                var a = document.createElement('a');
                                                a.href = url;
                                                a.download = 'Members.csv';
                                                a.click();

                                                // Cleanup
                                                window.URL.revokeObjectURL(url);
                                            }
                                        } else {
                                            // Handle the error response (e.g., show an error message)
                                            Swal.fire({
                                                text: "Sorry, " + response.message,
                                                icon: "error",
                                                buttonsStyling: !1,
                                                confirmButtonText: "Ok, got it!",
                                                customClass: {
                                                    confirmButton: "btn btn-light"
                                                }
                                            });
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        // Handle AJAX errors (e.g., show a generic error message)
                                        Swal.fire({
                                            text: "An error occurred while exporting the data.",
                                            icon: "error",
                                            buttonsStyling: !1,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: {
                                                confirmButton: "btn btn-light"
                                            }
                                        });
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
                                confirmButton: "btn btn-primary"
                            }
                        })
                    }
                    ))
                }
                )),
                t.querySelector('[data-kt-users-modal-action="cancel"]').addEventListener("click", (function(t) {
                    t.preventDefault(),
                    Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {
                            confirmButton: "btn btn-primary",
                            cancelButton: "btn btn-active-light"
                        }
                    }).then((function(t) {
                        t.value ? (e.reset(),
                        n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
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
                t.querySelector('[data-kt-users-modal-action="close"]').addEventListener("click", (function(t) {
                    t.preventDefault(),
                    Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {
                            confirmButton: "btn btn-primary",
                            cancelButton: "btn btn-active-light"
                        }
                    }).then((function(t) {
                        t.value ? (e.reset(),
                        n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
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
                ))
            }()
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTModalExportUsers.init()
}
));
