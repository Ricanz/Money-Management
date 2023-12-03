var avatar1 = new KTImageInput('kt_image_1');

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

$("#update_employee_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    console.log(formData);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/employee/update',
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

var KTDatatablesDataClientEmployee = function() {

	var initTable1 = function() {
		var table = $('#table_employee');
        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter');

		// begin first table
		table.DataTable({
			responsive: true,
			ajax: {
				url: `/employee/data`,
				type: 'GET',
				data: {
					pagination: {
						perpage: 20,
					},
                    filter : filter
				},
			},
			columns: [
				{data: 'fullname'},
				{data: 'is_kabeng'},
				{data: 'code'},
				{data: 'image'},
				{data: 'client.title'},
				{data: 'created_at'},
				{data: 'id', responsivePriority: -1},
			],
			columnDefs: [
				{
                    targets: 3,
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
                            <a class="nav-link" href="employee/destroy/${full.id}"><i class="nav-icon la la-trash"></i><span class="nav-text"></span></a>
						`;
					},
				},
				{
					width: '75px',
					targets: 1,
					render: function(data, type, full, meta) {
						var status = {
							1: {'title': 'Kabeng', 'class': 'label-light-warning'},
							0: {'title': 'Karyawan', 'class': ' label-light-info'},
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

var KTDatatablesDataClientAdmin = function() {

	var initTable1 = function() {
		var table = $('#table_admin');

		// begin first table
		table.DataTable({
			responsive: true,
			ajax: {
				url: `/employee/data`,
				type: 'GET',
				data: {
					pagination: {
						perpage: 20,
					},
				},
			},
			columns: [
				{data: 'id'},
				{data: 'name'},
				{data: 'email'},
				{data: 'created_at'},
				{data: 'id', responsivePriority: -1},
			],
			columnDefs: [
				{
                    targets: 0,
                    class: 'text-center',
                    render: function (data, type, full, meta) {
                        return 'View'
                    }
				},
				{
                    targets: 1,
                    class: 'text-left',
                    render: function (data, type, full, meta) {
                        return '<a href="/user-profile">'+data+'</a>'
                    }
				},
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
                    class: 'remove-client',
					render: function(data, type, full, meta) {
						return `
                            <a class="nav-link" href="employee/destroy/${full.id}"><i class="nav-icon la la-trash"></i><span class="nav-text"></span></a>
						`;
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

var KTDatatablesDataAccess = function() {
	var initTable1 = function() {
		var table = $('#table_access');
        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter');

		// begin first table
		table.DataTable({
			responsive: true,
			ajax: {
				url: `/access/data`,
				type: 'GET',
				data: {
					pagination: {
						perpage: 20,
					},
                    filter : filter
				},
			},
			columns: [
				{data: 'fullname'},
				{data: 'code'},
				{data: 'client.title'},
			],
			columnDefs: [
				{
                    targets: 1,
                    class: 'text-left',
                    render: function (data, type, full, meta) {
                        return '<a href="/access/show/'+full.id+'">'+data+'</a>'
                    }
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


$("#update_access_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    console.log(formData);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/access/update',
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

$("#update_user_profile_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    console.log(formData);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/user-profile',
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
    KTDatatablesDataClientEmployee.init();
    KTDatatablesDataClientAdmin.init();
    KTDatatablesDataAccess.init();
});