'use strict';
var avatar1 = new KTImageInput('kt_image_1');
var avatar2 = new KTImageInput('kt_image_2');

$(document).ready(function() {
    // Menggunakan event click pada tombol "Tambah Check"
    $("#addCheckButton").click(function() {
        // Clone elemen form-group dan tambahkan ke dalam form-container
        var clonedFormGroup = $(".check-group").first().clone();
        
        $("#form-container").append(clonedFormGroup);

        // Kosongkan nilai input yang telah diclone
        clonedFormGroup.find("input[type='text']").val("");
    });
});

function hapusCheck(e){
    var countCheckGroups = $(".check-group").length;
    if (countCheckGroups <=1 ) {
        return swal.fire({
            text: "Gagal hapus! Minimal harus ada 1 data",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
                confirmButton: "btn font-weight-bold btn-light-primary"
            }
        }).then(function() {
             
        });
    }
    // var idx = countCheckGroups - 1;
    // $(".check-group").eq(idx).remove();

    const clickedButton = e.target;

    // Get the parent container of the button
    const parentContainer = clickedButton.closest('.check-group');

    if (parentContainer) {
        // Find the index of the parent container among its siblings
        const index = Array.from(parentContainer.parentElement.children).indexOf(parentContainer);
        
        // Output the index (you can use it as needed)
        console.log('Clicked button index:', index);

        // Remove the parent container if needed
        parentContainer.remove();
    }
}
var KTDatatablesDataSourceAjaxClient = function() {

	var initTable1 = function() {
		var table = $('#kt_datatable');

		// begin first table
		table.DataTable({
            order: [9, 'desc'],
			responsive: true,
			ajax: {
				url: '/complete/data',
				type: 'GET',
				data: {
					pagination: {
						perpage: 20,
					},
				},
			},
			columns: [
				{data: 'plat_number'},
				{data: 'wo'},
				{data: 'checking_type'},
				{data: 'employee.fullname'},
				{data: 'advisor.name'},
				{data: 'types.name'},
				{data: 'status'},
				{data: 'status'},
				{data: 'created_at'},
				{data: 'id', responsivePriority: -1},
			],
			columnDefs: [
				{
                    targets: 1,
                    class: 'text-left',
                    render: function (data, type, full, meta) {
                        return '<a href="/complete/edit/'+full.id+'">'+data+'</a>'
                    }
				},
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
                    class: 'remove-client',
					render: function(data, type, full, meta) {
						return `
                            <a class="nav-link" href="/checking/destroy/${full.id}"><i class="nav-icon la la-trash"></i><span class="nav-text"></span></a>
						`;
					},
				},
				{
					targets: -4,
					title: 'Post Check',
					orderable: false,
                    class: 'remove-client',
					render: function(data, type, full, meta) {
                        if (full.has_post) {
                            return `
                                <a href="/complete/pro/view/post/${full.id}" class="btn btn-success font-weight-bolder">Lihat</a>
                            `;
                        } else {
                            return `
                                <a href="/complete/pro/view/post/${full.id}" class="btn btn-warning font-weight-bolder">Tambah</a>
                            `;
                        }
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

var KTDatatablesDataSourceAjaxImage = function() {

	var initTable1 = function() {
		var table = $('#table_image');
        var tableImage = document.getElementById('table_image');
        var dataId = tableImage.getAttribute('data-id');
        var dataType = tableImage.getAttribute('data-type');
        var dataCheckingType = tableImage.getAttribute('data-checkingType');
		// begin first table
		table.DataTable({
			responsive: true,
			ajax: {
				url: '/complete/image',
				type: 'GET',
				data: {
					pagination: {
						perpage: 20,
					},
                    id: dataId,
                    type: dataType,
                    checkingType: dataCheckingType
				},
			},
			columns: [
				{data: 'image'},
				{data: 'master.description'},
				{data: 'id', responsivePriority: -1},
			],
			columnDefs: [
                {
                    targets: 0,
                    class: 'text-left',
					render: function(data, type, full, meta) {
                        return `<img alt="Image" src="${APP_URL}${data}" class="max-h-35px" />`
					},
				},
				{
                    targets: 1,
                    class: 'text-left edit_image',
                    render: function (data, type, full, meta) {
                        return `<p id="edit_image" data-image="${full.image}" onclick="test">${data}</p>`
                    }
				},{
					targets: -1,
					title: 'Actions',
					orderable: false,
                    class: 'remove-client',
					render: function(data, type, full, meta) {
						return `
                            <a class="nav-link" href="javascript:void()" onclick="myFunction('${full.image}', '${full.master.description}', '${full.id}')" data-toggle="modal"
                            data-target="#editImage"><i class="nav-icon la la-edit"></i><span class="nav-text"></span></a>
                            <a class="nav-link" href="javascript:void()" onclick="deleteFunction('${full.id}')"><i class="nav-icon la la-trash"></i><span class="nav-text"></span></a>
						`;
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

jQuery(document).ready(function() {
	KTDatatablesDataSourceAjaxClient.init();
	KTDatatablesDataSourceAjaxImage.init();
});

function myFunction(data, desc, id) {
    $('#checkImage').css('background-image', `url(${data})`);
    $('#editLabel').html(`${desc}`);
    $('#editId').val(`${id}`);
}

function deleteFunction(id){
    window.location.href = `/complete/image/destroy/${id}`
}

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

$("#create_checking_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/complete/store',
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
                    window.location.href = '/checking/complete' 
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

$("#update_checking_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/complete/update',
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

$("#create_image_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/complete/image',
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

$("#update_image_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/complete/image/update',
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

$("#finishCheck").on("click", function (event) {
    alert("halo")
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'GET',
        // data: formData,
        url  : '/check-pdf/20',
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
                    location.href = data.data
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

$("#create_checking_post_form").on("submit", function (event) {
    event.preventDefault();
    var token = $('meta[name="csrf-token"]').attr('content');
    var formData = new FormData(this);
    $.ajax({
        headers: { 'X-CSRF-TOKEN': token },
        type : 'POST',
        data: formData,
        url  : '/completes/post',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function() {
            swal.showLoading();
        },
        success: function(data){
            swal.hideLoading()
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
                    window.location.href = '/checking/complete' 
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