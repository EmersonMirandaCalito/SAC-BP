﻿$(function () {

    var user = sessionStorage.getItem('User');
    var userSession = JSON.parse(user);

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
            frmUser: '#frmUser'
        }
    }
    defineVars();
    
    $(ids.btnSaveUser).click(function (e) {
        e.preventDefault();
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
            User_Id: -1,
            user: User_Login,
            Password: User_password 
        };
        insertUser(data);
    });

    function insertUser(data) {
        $.ajax({
            url: '/User/insertUser',
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
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.length>0) {
                    //bootbox.infoAlert("Proceso exitoso");
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
                    dataField: "rol_Id",
                    caption: "Rol"
                },
                {
                    type: "buttons",
                    buttons: [{
                        icon: "fas fa-edit fa-2x",
                        cssClass: "btn-lg",
                        onClick: function (e) {
                            alert(e.row.data.ID);
                        }
                    },
                    {
                        icon: "fas fa-trash-alt",
                        cssClass: "text-danger btn-lg",
                        onClick: function (e) {
                            alert(e.row.data.ID);
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
    function checkSession() {
        if (user != null) {
            
            $(ids.lbUsuario).text(userSession.User_Name);
        } else {
            logout();
        }
    }
    checkSession();
    selectTable();
});