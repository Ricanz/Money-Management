'use strict';

var avatar1 = new KTImageInput('kt_image_1');
var KTSummernoteDemo = function() {
    // Private functions
    var demos = function() {
        $('.summernote').summernote({
            height: 150,
            callbacks: {
                onChange: function(contents, $editable) {
                    $("#description").val(contents);
                }
            }
        });
    }

    return {
        // public functions
        init: function() {
            demos();
        }
    };
}();

// Initialization
jQuery(document).ready(function() {
    KTSummernoteDemo.init();
});

var KTDatatablesDataSourceAjaxClient = function() {

	var initTable1 = function() {
		var table = $('#kt_datatable');

		// begin first table
		table.DataTable({
			responsive: true,
			ajax: {
				url: '/client/data',
				type: 'GET',
				data: {
					pagination: {
						perpage: 20,
					},
				},
			},
			columns: [
				{data: 'title'},
				{data: 'image'},
				{data: 'code'},
				{data: 'status'},
				{data: 'created_at'},
				{data: 'id', responsivePriority: -1},
			],
			columnDefs: [
				{
                    targets: 1,
                    class: 'text-left',
					render: function(data, type, full, meta) {
                        return `<img alt="Logo" src="${APP_URL}${data}" class="max-h-35px" />`
					},
				},
				{
                    targets: 2,
                    class: 'text-left',
                    render: function (data, type, full, meta) {
                        return '<a href="/client/edit/'+full.id+'">'+data+'</a>'
                    }
				},
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
                    class: 'remove-client',
					render: function(data, type, full, meta) {
						return `
                            <a class="nav-link" href="client/destroy/${full.id}"><i class="nav-icon la la-trash"></i><span class="nav-text"></span></a>
						`;
					},
				},
				{
					width: '75px',
					targets: -3,
					render: function(data, type, full, meta) {
						var status = {
							"active": {'title': 'Active', 'class': 'label-light-success'},
							"deleted": {'title': 'Deleted', 'class': ' label-light-danger'},
							"inactive": {'title': 'Inactive', 'class': ' label-light-warning'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
					},
				},

				{
					targets: -2,
					render: function(data, type, full, meta) {
                        return to_date_time(data)
					},
				},
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

var KTDatatablesDataSourceAjaxClientAdmin = function() {

	var initTable1 = function() {
		var table = $('#kt_datatable_admin');

		// begin first table
		table.DataTable({
			responsive: true,
			ajax: {
				url: '/client/data',
				type: 'GET',
				data: {
					pagination: {
						perpage: 20,
					},
				},
			},
			columns: [
				{data: 'title'},
				{data: 'image'},
				{data: 'code'},
				{data: 'status'},
				{data: 'created_at'}
			],
			columnDefs: [
				{
                    targets: 1,
                    class: 'text-left',
					render: function(data, type, full, meta) {
                        return `<img alt="Logo" src="${APP_URL}${data}" class="max-h-35px" />`
					},
				},
				{
                    targets: 2,
                    class: 'text-left',
                    render: function (data, type, full, meta) {
                        return '<a href="/client/edit/'+full.id+'">'+data+'</a>'
                    }
				},
				{
					width: '75px',
					targets: -2,
					render: function(data, type, full, meta) {
						var status = {
							"active": {'title': 'Active', 'class': 'label-light-success'},
							"deleted": {'title': 'Deleted', 'class': ' label-light-danger'},
							"inactive": {'title': 'Inactive', 'class': ' label-light-warning'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
					},
				},

				{
					targets: -1,
					render: function(data, type, full, meta) {
                        return to_date_time(data)
					},
				},
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();


var KTDatatablesDataClientEmployee = function() {

	var initTable1 = function() {
		var table = $('#table_client_employee');
        const path = window.location.pathname;
        const segments = path.split("/");
        const id = segments[segments.length - 1];
		// begin first table
		table.DataTable({
			responsive: true,
			ajax: {
				url: `/client/employee/data/${id}`,
				type: 'GET',
				data: {
					pagination: {
						perpage: 20,
					},
				},
			},
			columns: [
				{data: 'fullname'},
				{data: 'image'},
				{data: 'user.email'},
				{data: 'is_kabeng'},
				{data: 'status'},
				{data: 'created_at'},
				{data: 'id', responsivePriority: -1},
			],
			columnDefs: [
				{
                    targets: 1,
                    class: 'text-left',
					render: function(data, type, full, meta) {
                        return `<img alt="Logo" src="${APP_URL}${data}" class="max-h-35px" />`
					},
				},
				{
                    targets: 2,
                    class: 'text-left',
                    render: function (data, type, full, meta) {
                        return '<a href="/employee/show/'+full.id+'">'+data+'</a>'
                    }
				},
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
                    class: 'remove-client',
					render: function(data, type, full, meta) {
						return `
                            <a class="nav-link" href="client/destroy/${full.id}"><i class="nav-icon la la-trash"></i><span class="nav-text"></span></a>
						`;
					},
				},
				{
					width: '75px',
					targets: -3,
					render: function(data, type, full, meta) {
						var status = {
							"active": {'title': 'Active', 'class': 'label-light-success'},
							"deleted": {'title': 'Deleted', 'class': ' label-light-danger'},
							"inactive": {'title': 'Inactive', 'class': ' label-light-warning'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
					},
				},

				{
					targets: -2,
					render: function(data, type, full, meta) {
                        return to_date_time(data)
					},
				},
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

function to_date_time(date) {
    let tanggal = new Date(date);
    return tanggal.getFullYear()+"-"
        + (tanggal.getMonth()+ 1 > 9 ? (tanggal.getMonth()+ 1).toString() : "0" + (tanggal.getMonth()+ 1).toString())
        +"-"
        +(tanggal.getDate() > 9 ? tanggal.getDate().toString() : "0" + tanggal.getDate().toString())
        + " "
        +(tanggal.getHours().toString() > 9 ? tanggal.getHours().toString() : "0" + tanggal.getHours().toString())
        + ":" + (tanggal.getUTCMinutes().toString() > 9 ? tanggal.getUTCMinutes().toString() : "0" + tanggal.getUTCMinutes().toString())
        + ":" + (tanggal.getUTCSeconds().toString() > 9 ? tanggal.getUTCSeconds().toString() : "0" + tanggal.getUTCSeconds().toString());
}

jQuery(document).ready(function() {
	KTDatatablesDataSourceAjaxClient.init();
    KTDatatablesDataClientEmployee.init();
    KTDatatablesDataSourceAjaxClientAdmin.init();
});

$("#create_client_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/clients',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function() {
            swal.showLoading();
        },
        success: function(data){
            swal.hideLoading();
            if(data.status === true) {
                swal.fire({
                    text: data.message,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() {
                    location.href = "clients";
                });
            }else {
                var values = '';
                jQuery.each(data.message, function (key, value) {
                    values += value+"<br>";
                });

                swal.fire({
                    html: values,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() { });
            }
        }
    });
});

$("#update_client_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/client/update',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function() {
            swal.showLoading();
        },
        success: function(data){
            swal.hideLoading();
            if(data.status === true) {
                swal.fire({
                    text: data.message,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() {
                    location.reload()
                });
            }else {
                var values = '';
                jQuery.each(data.message, function (key, value) {
                    values += value+"<br>";
                });

                swal.fire({
                    html: values,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() { });
            }
        }
    });
});

$("#create_employee_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    var formData = new FormData(this);
    formData.append('filter', filter)
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/employee/store',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function() {
            swal.showLoading();
        },
        success: function(data){
            swal.hideLoading();
            if(data.status === true) {
                swal.fire({
                    text: data.message,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() {
                    location.reload()
                });
            }else {
                var values = '';
                jQuery.each(data.message, function (key, value) {
                    values += value+"<br>";
                });

                swal.fire({
                    html: values,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() { });
            }
        }
    });
});