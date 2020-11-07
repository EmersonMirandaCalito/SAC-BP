$(function () {

    function defineVars() {
        this.ids = {
            tabla: '#tablaCaracteristicaProyectos',
            lnkCaracteristicasProyectos:'#lnkCaracteristicasProyectos'
        };
        this.DevExpressUtils = new DXUtils(this);
    }
    defineVars();
    const caracteristicasProyectos = [
        { ID: 1, Nombre: "Financiero", Estado: "Activo" },
        { ID: 2, Nombre: "Facturación", Estado: "Activo" },
        { ID: 3, Nombre: "Control inventario", Estado: "Activo" },
        { ID: 4, Nombre: "Manejo de personal", Estado: "Activo" },
        { ID: 5, Nombre: "Toma física", Estado: "Activo" },
        { ID: 6, Nombre: "Ventas", Estado: "Activo" },
        { ID: 13, Nombre: "Administración general", Estado: "Activo" }
    ];

    $(ids.lnkCaracteristicasProyectos).click(function (e) {
        e.preventDefault();
        let url = "/Home/CaracteristicasProyectos";
        window.location.href = url;
    });
    function showTable() {
       
        let columns= [
                {
                    dataField: "ID",
                    caption: "ID"
                },
                {
                    dataField: "Nombre",
                    caption: "Nombre"
                },
                {
                    dataField: "Estado",
                    caption: "Estado"
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
            dataSource: caracteristicasProyectos,
            columns: columns
        }
        DevExpressUtils.gridControl(ids.tabla, gridOptions);
    }
    showTable();
});