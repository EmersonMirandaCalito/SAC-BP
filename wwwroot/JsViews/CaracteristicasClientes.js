$(function () {

    function defineVars() {
        this.ids = {
            tabla: '#tablaCaracteristicasClientes',
            lnkCaracteristicasClientes:'#lnkCaracteristicasClientes'
        };
        this.DevExpressUtils = new DXUtils(this);

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

    $(ids.lnkCaracteristicasClientes).click(function (e) {
        e.preventDefault();
        let url = "/Home/CaracteristicasClientes";
        window.location.href = url;
    });
    function showTable()
    {
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
            dataSource: caracteristicasClientes,
            columns: columns
        }
        DevExpressUtils.gridControl(ids.tabla, gridOptions);
    }
    showTable();
});