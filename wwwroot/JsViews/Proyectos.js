$(function () {


    const proyectos = [
        { ID: 1, Proyectos: "BP Turquesa", Estado: "Activo" },
        { ID: 2, Proyectos: "BP Blanco", Estado: "Activo" },
        { ID: 3, Proyectos: "LinkPro", Estado: "Activo" },
        { ID: 4, Proyectos: "TaxPro", Estado: "Activo" },
        { ID: 5, Proyectos: "Investor", Estado: "Activo" },
        { ID: 6, Proyectos: "ABPro", Estado: "Activo" },
        { ID: 43, Proyectos: "BP Mobile", Estado: "Activo" }
    ];

    function defineVars() {
        this.ids = {
            tabla: '#tablaProyectos'
        };
        this.DevExpressUtils = new DXUtils(this);
    }

    $("#lnkProyectos").click(function (e) {
        e.preventDefault();
        let url = "/Home/Proyectos";
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
                    dataField: "Proyectos",
                    caption: "Nombre del proyecto"
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
            dataSource: proyectos,
            columns: columns
        }
        DevExpressUtils.gridControl(ids.tabla, gridOptions);
    }
    defineVars();
    showTable();
});