$(function () {

    var user = sessionStorage.getItem('User');
    var userSession = JSON.parse(user);
    var optionFrom = '';
    var featureId = -1;

    function defineVars() {
        this.ids = {
            tabla: '#tablaCaracteristicasClientes',
            btnAddFeatureClient: '#btnAddFeatureClient',
            frmFeatureClient: '#frmFeatureClient',
            nuevaCaracteristicaClienteModal: '#nuevaCaracteristicaClienteModal',
            nuevaCaracteristicaClienteModalLabel: '#nuevaCaracteristicaClienteModalLabel',
            btnSaveFeature: '#btnSaveFeature',
            Nombre_Caracteristica: '#Nombre_Caracteristica',
            Detalle_Caracteristica: '#Detalle_Caracteristica',
            Feature_Status: '#cmbEstadoCaracteristica option:selected'
        }
    }
    defineVars();
    const caracteristicasClientes = [
        { ID: 1, Nombre: "Supermercado", Estado: "Activo",},
        { ID: 2, Nombre: "Bancos", Estado: "Activo" },
        { ID: 3, Nombre: "Publidad", Estado: "Activo" },
        { ID: 4, Nombre: "Ferreterías", Estado: "Activo" },
        { ID: 5, Nombre: "Venta comida", Estado: "Activo" },
        { ID: 6, Nombre: "Productos de belleza", Estado: "Activo" },
        { ID: 7, Nombre: "Desarrollo de software", Estado: "Activo" },
        { ID: 8, Nombre: "Comercial general", Estado: "Activo" },
        { ID: 9, Nombre: "Despacho contable", Estado: "Activo" },
        { ID: 10, Nombre: "Ventas al detalle", Estado: "Activo" },
        { ID: 12, Nombre: "Venta de servicios", Estado: "Activo" },
        { ID: 13, Nombre: "Ventas exrpess", Estado: "Activo" }
    ];

    $(ids.btnAddFeatureClient).click(function (e) {
        e.preventDefault();
        optionFrom = 'NEW';
        featureId = -1;
        //$('#nuevaCaracteristicaClienteModal')[0].reset();
        $(nuevaCaracteristicaClienteModalLabel).text("NUEVA CARACTERÍSTICA");
        $(ids.nuevaCaracteristicaClienteModal).modal("show");
    });
    $(ids.btnSaveFeature).click(function (e) {
        e.preventDefault();
        if (Error()) {
            bootbox.errorAlert("No se pueden dejar campos vacíos");
            return;
        }
        let Feature_Id = featureId; 
        let Feature_Name = $(ids.Nombre_Caracteristica).val();
        let Feature_Detail = $(ids.Detalle_Caracteristica).val();
        let Feature_Status = $(ids.Feature_Status).val();

        let data = {
            Feature_Id: Feature_Id,
            Feature_Name: Feature_Name,
            Feature_Detail: Feature_Detail,
            Feature_Status: Feature_Status
        };
        if (optionFrom == 'NEW') {
            $('#frmFeatureClient')[0].reset();
            insertFeature(data);
        }
        else {
            
        }
    });
    function selectTable() {
        var data = {
           Feature_Id: -1
        };
        $.ajax({
            url: '/featureClient/selectTable',
            async: false,
            cache: false,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
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
    function showTable(data)
    {
        this.DevExpressUtils = new DXUtils(this);
        let columns= [
                {
                    dataField: "feature_Id",
                    caption: "ID",
                    dataType: "string"
                },
                {
                    dataField: "feature_Name",
                    caption: "Nombre"
                },
                {
                    dataField: "feature_Detail",
                    caption: "Estado"
                },
                {
                    dataField: "feature_Status",
                    caption: "Estado"
                },
                {
                    type: "buttons",
                    buttons: [{
                        icon: "fas fa-edit fa-2x",
                        cssClass: "btn-lg",
                        onClick: function (e) {
                            optionFrom = 'UPDATE';
                            $(nuevaCaracteristicaClienteModalLabel).text("ACTUALIZAR CARACTERÍSTICA");
                            featureId= e.row.data.ID;
                            loadFeature(e.row.data.ID);
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
    function Error() {
        if ($(ids.Nombre_Caracteristica).val() == '') {
            return true;
        }
        if ($(ids.Detalle_Caracteristica).val()=='') {
            return true;
        }
        return false;
    }
    function loadFeature(idFeature) {
        $(ids.nuevaCaracteristicaClienteModal).modal("show");
    }
    function insertFeature(data) {
        $.ajax({
            url: '/featureClient/insertFeature',
            async: false,
            cache: false,
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.Success) {
                    bootbox.infoAlert("Proceso exitoso");
                    $('#frmFeatureClient')[0].reset();
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