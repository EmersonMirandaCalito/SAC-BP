$(function () {

    const tickets = [
        { "ID": 1, Ticket: "Seguimiento Empresa 1", Empresa: "Empresa 1", Estado: "Contacto inicial", Usuario:"Emerson Miranda", Proyecto: "BP Turquesa" },
        { "ID": 2, Ticket: "Seguimiento Empresa 2", Empresa: "Empresa 2", Estado: "Contacto inicial", Usuario: "Emerson Miranda", Proyecto: "BP Turquesa" },
        { "ID": 3, Ticket: "Seguimiento Empresa 3", Empresa: "Empresa 3", Estado: "Contacto inicial", Usuario: "Juan Pérez", Proyecto: "BP Turquesa" },
        { "ID": 4, Ticket: "Seguimiento Empresa 1", Empresa: "Empresa 1", Estado: "Contacto inicial", Usuario: "Carlos Ramirez", Proyecto: "BP Blanco" },
        { "ID": 5, Ticket: "Seguimiento Empresa 5", Empresa: "Empresa 5", Estado: "Contacto inicial", Usuario: "Carlos Ramirez", Proyecto: "BP Blanco" },
        { "ID": 6, Ticket: "Seguimiento Empresa 6", Empresa: "Empresa 6", Estado: "Contacto inicial", Usuario: "Emerson Miranda", Proyecto: "BP Turquesa" },
        { "ID": 1, Ticket: "Seguimiento Empresa 1", Empresa: "Empresa 1", Estado: "Contacto inicial", Usuario: "Emerson Miranda", Proyecto: "BP Turquesa" },
        { "ID": 2, Ticket: "Seguimiento Empresa 2", Empresa: "Empresa 2", Estado: "Contacto inicial", Usuario: "Emerson Miranda", Proyecto: "BP Turquesa" },
        { "ID": 3, Ticket: "Seguimiento Empresa 3", Empresa: "Empresa 3", Estado: "Contacto inicial", Usuario: "Juan Pérez", Proyecto: "BP Turquesa" },
        { "ID": 4, Ticket: "Seguimiento Empresa 1", Empresa: "Empresa 1", Estado: "Contacto inicial", Usuario: "Carlos Ramirez", Proyecto: "BP Blanco" },
        { "ID": 5, Ticket: "Seguimiento Empresa 5", Empresa: "Empresa 5", Estado: "Contacto inicial", Usuario: "Carlos Ramirez", Proyecto: "BP Blanco" },
        { "ID": 6, Ticket: "Seguimiento Empresa 6", Empresa: "Empresa 6", Estado: "Contacto inicial", Usuario: "Emerson Miranda", Proyecto: "BP Turquesa" },
        { "ID": 7, Ticket: "Seguimiento Empresa 7", Empresa: "Empresa 7", Estado: "Contacto inicial", Usuario: "Emerson Miranda", Proyecto: "LinkPro" }
    ];

    function defineVars() {
        this.ids = {
            tabla: '#tablaTicket',
            lnkTickets: '#lnkTickets',
            cmbSeguimiento: '#cmbSeguimiento',
            notificacion: '#notificacion',
            cmbDocumentos: '#cmbDocumentos',
            subirArchivo: '#subirArchivo'
        }
    }
    defineVars();
    $(ids.lnkTickets).click(function (e) {
        e.preventDefault();
        let url = "/Home/Ticket";
        window.location.href = url;
    });
    $(ids.cmbSeguimiento).change(function (e) {
        e.preventDefault();
        opcionRecordatorio($(ids.cmbSeguimiento).val());
    });
    $(ids.cmbDocumentos).change(function (e) {
        e.preventDefault();
        opcionDocumentos($(ids.cmbDocumentos).val());
    });
    function showTable() {
        this.DevExpressUtils = new DXUtils(this);
        let columns = [{
                dataField: "ID",
                caption: "ID"
            },
            {
                dataField: "Ticket",
                caption: "Ticket"
            },
            {
                dataField: "Empresa",
                caption: "Empresa"
            },
            {
                dataField: "Estado",
                caption: "Estado"
            },
            {
                dataField: "Usuario",
                caption: "Usuario"
            },
            {
                dataField: "Proyecto",
                caption: "Proyecto"
            },
            {
                type: "buttons",
                buttons: [{
                    icon: "fa fa-plus",
                    cssClass: "btn-lg",
                    onClick: function (e) {
                        $('#nuevoTrakingModal').modal('show');
                    }
                },
                {
                    icon: "fas fa-file-alt",
                    cssClass: "text-danger btn-lg",
                    onClick: function (e) {
                        alert(e.row.data.ID);
                    }
                },
                {
                    icon: "far fa-eye",
                    cssClass: "btn-lg",
                    onClick: function (e) {
                        //alert(e.row.data.ID);
                        getUser2()
                    }
                }
                ]
            }
        ]
        let gridOptions = {
            dataSource: tickets,
            columns: columns
        }
        DevExpressUtils.gridControl(ids.tabla, gridOptions);
          
    }
    function getUser() {
        var data = {
            Comp_Id: 1,
            User_Id: 1,
            User_code: 1,
            User_Name: 'emerson',
            User_Email: 'correo@correo.com',
            User_Phone: '83373921',
            Rol_Id: 1,
            user: 'emiranda',
            Password: 'calito'
        };
        $.ajax({
            url: '/Ticket/getUser',
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                var nData = JSON.parse(data);
                alert(nData.user_Name);
            },
            error: function (data) {
                alert("no data");
            }

        });
    }
    function getUser2() {
        var data = {
            Comp_Id: 1,
            User_Id: 1,
            User_code: 1,
            User_Name: 'emerson',
            User_Email: 'correo@correo.com',
            User_Phone: '83373921',
            Rol_Id: 1,
            user: 'emiranda',
            Password: 'calito'
        };
        let url = '/Ticket/getUser'
        var successCallback = function (data) {
            data = JSON.parse(data);
            alert(data.user_Name);
        }
        var errorCallback = function (e, x, y) {
            alert("no");
        }
        $.doPostAndWait(url,data,successCallback,errorCallback);
    }
   
    function opcionRecordatorio(opcion) {
        if (opcion == 1) {
            $(ids.notificacion).hide();
        }
        else {
            $(ids.notificacion).show();
        }
    }
    function opcionDocumentos(opcion) {
        if (opcion == 1) {
            $(ids.subirArchivo).hide();
        }
        else {
            $(ids.subirArchivo).show();
        }
    }
    function iniciar() {
        $(ids.notificacion).hide();
        $(ids.subirArchivo).hide();
    }
    iniciar();
    showTable();
});