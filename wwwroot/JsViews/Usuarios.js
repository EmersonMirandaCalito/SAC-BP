$(function () {

    var user = sessionStorage.getItem('User');
    var userSession = JSON.parse(user);
    var optionFrom = '';
    var userId = -1;
    const usuarios2 = [
        { ID: 1, Nombre: "Emerson Eduardo Miranda Calito", Rol: "Administrador" },
        { ID: 1, Nombre: "Emerson Eduardo Miranda Calito", Rol: "Administrador" },
        { ID: 1, Nombre: "Emerson Eduardo Miranda Calito", Rol: "Administrador" },
        { ID: 1, Nombre: "Emerson Eduardo Miranda Calito", Rol: "Administrador" }
        
    ];

    function defineVars() {
        this.ids = {
            lbUsuario: '#lbUsuario',
            tabla: '#tablaUsuarios',
            btnSaveUser: '#btnSaveUser',
            frmUser: '#frmUser',
            User_Code: '#User_Code',
            usuarioModal: '#usuarioModal',
            User_Name: '#User_Name',
            User_Phone: '#User_Phone',
            User_Email: '#User_Email',
            User_Login: '#User_Login',
            User_password: '#User_password',
            cmbRol: '#cmbRol',
            cmbStatus: '#cmbStatus',
            usuarioModalLabel: '#usuarioModalLabel',
            btnAddUser: '#btnAddUser'
        }
    }
    defineVars();
    
    $(ids.btnSaveUser).click(function (e) {
        e.preventDefault();
        if (Error()) {
            bootbox.errorAlert("No se pueden dejar campos vacíos");
            return;
        }
        
        let Comp_Id = userSession.Comp_Id;
        let User_Code = $('#User_Code').val();
        let User_Name = $('#User_Name').val();
        let User_Phone = $('#User_Phone').val();
        let User_Email = $('#User_Email').val();
        let Rol_Id = $('#cmbRol option:selected').val();
        let User_Login = $('#User_Login').val();
        let User_password = $('#User_password').val();
        let User_Status = $('#cmbStatus option:selected').val();
        var data = {
            Comp_Id: Comp_Id,
            User_Code: User_Code,
            User_Name: User_Name,
            User_Phone: User_Phone,
            User_Email: User_Email,
            Rol_Id: Rol_Id,
            User_Login: User_Login,
            User_password: User_password,
            User_Status: User_Status,
            User_Id: userId,
            user: User_Login,
            Password: User_password
        };
        if (optionFrom == 'NEW') {
            insertUser(data);
        }
        else {   
            updateUser(data);
        }
        selectTable();
        
    });
    $(ids.btnAddUser).click(function (e) {
        e.preventDefault();
        optionFrom = 'NEW';
        $('#frmUser')[0].reset();
        userId = -1;
        $(ids.User_Login).prop("disabled", false);
        $(ids.usuarioModalLabel).text("NUEVO USUARIO");
        $(ids.usuarioModal).modal("show");
    });
    function updateUser(data) {
        $.ajax({
            url: '/User/updateUser',
            async: false,
            cache: false,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.Success) {
                    bootbox.infoAlert("Proceso exitoso");
                }
                else {
                    bootbox.errorAlert(data.Error);
                }

            },
            error: function (data) {
                bootbox.errorAlert("Ha ocurrido un error");
            }

        });  
    }
    function insertUser(data) {
        $.ajax({
            url: '/User/insertUser',
            async: false,
            cache: false,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.Success) {
                    bootbox.infoAlert("Proceso exitoso");
                    $('#frmUser')[0].reset();
                }
                else {
                    bootbox.errorAlert(data.Error);
                }

            },
            error: function (data) {
                bootbox.errorAlert("Ha ocurrido un error");
            }

        });  
    }
    function selectTable() {
        var data = {
            Comp_Id: userSession.Comp_Id
        };
        $.ajax({
            url: '/User/selectTable',
            async: false,
            cache: false,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.length>0) {
                    showTable(data);
                }
                else {
                    bootbox.errorAlert(data.Error);
                }

            },
            error: function (data) {
                bootbox.errorAlert("Ha ocurrido un error");
            }

        });  
    }
    function showTable(data) {
        
        this.DevExpressUtils = new DXUtils(this);
        let columns = [
                {
                dataField: "user_code",
                    caption: "ID"
                },
                {
                    dataField: "user_Name",
                    caption: "Nombre"
                },
                {
                    dataField: "rol_Name",
                    caption: "Rol"
                },
                {
                    dataField: "user_Status",
                    caption: "Estado"
                },
                {
                    type: "buttons",
                    buttons: [{
                        icon: "fas fa-edit fa-2x",
                        cssClass: "btn-lg",
                        onClick: function (e) {
                            optionFrom = 'UPDATE';
                            $(ids.usuarioModalLabel).text("ACTUALIZAR USUARIO");
                            userId = e.row.data.user_Id;
                            loadUser(e.row.data.user_Id);
                        }
                    },
                    {
                        icon: "fas fa-trash-alt",
                        cssClass: "text-danger btn-lg",
                        onClick: function (e) {
                            bootbox.confirm({
                                message: "Desea inactivar este registro?",
                                buttons: {
                                    confirm: {
                                        label: 'Yes',
                                        className: 'btn-success'
                                    },
                                    cancel: {
                                        label: 'No',
                                        className: 'btn-danger'
                                    }
                                },
                                callback: function (result) {
                                    if (result) {
                                        deleteUser(e.row.data.user_Id);
                                        selectTable();
                                    }
                                }
                            });
                        }
                    }]
                }
            ]
        let gridOptions = {
            dataSource: data,
            columns: columns
        }
        DevExpressUtils.gridControl(ids.tabla, gridOptions);
    }
    function logout() {
        sessionStorage.removeItem('User');
        let url = "/Account/Login";
        window.location.href = url;
    }
    function loadUser(userId) {
        let data = {
            Comp_Id: userSession.Comp_Id,
            User_Id: userId,
            User_code: -1,
            User_Name: '',
            User_Email: '',
            User_Phone: '',
            Rol_Id: -1,
            User_Login: '',
            User_Password: ''
        };
        $.ajax({
            url: '/User/loadUser',
            async: false,
            cache: false,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.Success) {
                    let item = data.item;
                    $(ids.User_Code).val(item.User_Code);
                    $(ids.User_Name).val(item.User_Name);
                    $(ids.User_Phone).val(item.User_Phone);
                    $(ids.User_Email).val(item.User_Email);
                    $(ids.cmbRol).val(item.Rol_Id);
                    $(ids.User_password).val(item.User_Password);
                    if (item.User_Status) {
                        $(ids.cmbStatus).val(1);
                    }
                    else {
                        $(ids.cmbStatus).val(0);
                    }
                    $(ids.User_Login).prop("disabled", true);
                    $(ids.User_Login).val(item.User_Login);
                    $(ids.usuarioModal).modal("show");
                    
                }
                else {
                    bootbox.errorAlert("Error cargando los datos del usuario");
                }

            },
            error: function (data) {
                bootbox.errorAlert("Ha ocurrido un error");
            }

        });
        
    }
    function deleteUser(userId) {
        let data = {
            Comp_Id: userSession.Comp_Id,
            User_Id: userId
        };
        $.ajax({
            url: '/User/deleteUser',
            async: false,
            cache: false,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.Success == false) {
                    bootbox.errorAlert("Error cargando los datos del usuario");
                }
            },
            error: function (data) {
                bootbox.errorAlert("Ha ocurrido un error");
            }

        });
    }
    function checkSession() {
        if (user != null) {
            
            $(ids.lbUsuario).text(userSession.User_Name);
        } else {
            logout();
        }
    }
    function Error() {
        if ($('#User_Code').val() == "") {
            return true;
        }
        if ($('#User_Name').val() == "") {
            return true;
        }
        if ($('#User_Phone').val() == "") {
            return true;
        }
        if ($('#User_Email').val() == "") {
            return true;
        }
        if ($('#User_Login').val() == "") {
            return true;
        }
        if ($('#User_password').val() == "") {
            return true;
        }
        return false;
    }
    checkSession();
    selectTable();
    
});