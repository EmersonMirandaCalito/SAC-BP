$(function () {

    
    const clientes = [
        { ID: 1, FirstName: "Sandra", LastName: "Johnson" },
        { ID: 2, FirstName: "James", LastName: "Scott" },
        { ID: 3, FirstName: "Nancy", LastName: "Smith" },
        { ID: 4, FirstName: "Sandra", LastName: "Johnson" },
        { ID: 5, FirstName: "James", LastName: "Scott" },
        { ID: 6, FirstName: "Nancy", LastName: "Smith" },
        { ID: 7, FirstName: "Sandra", LastName: "Johnson" },
        { ID: 8, FirstName: "James", LastName: "Scott" },
        { ID: 9, FirstName: "Nancy", LastName: "Smith" },
        { ID: 10, FirstName: "Sandra", LastName: "Johnson" },
        { ID: 12, FirstName: "James", LastName: "Scott" },
        { ID: 13, FirstName: "Nancy", LastName: "Smith" },
        { ID: 14, FirstName: "Sandra", LastName: "Johnson" },
        { ID: 25, FirstName: "James", LastName: "Scott" },
        { ID: 31, FirstName: "Nancy", LastName: "Smith" },
        { ID: 41, FirstName: "Sandra", LastName: "Johnson" },
        { ID: 42, FirstName: "James", LastName: "Scott" },
        { ID: 43, FirstName: "Nancy", LastName: "Smith" }
    ];

    function defineVars() {
        this.ids = {
            tabla: '#tablaClientes'
        }
    }

    $("#lnkClientes").click(function (e) {
        e.preventDefault();
        let url = "/Home/Clientes";
        window.location.href = url;
    });
    function showTable()
    {
        this.DevExpressUtils = new DXUtils(this);
        let columns= [
                {
                    dataField: "ID",
                    caption: "ID"
                },
                {
                    dataField: "FirstName",
                    caption: "Nombre"
                },
                {
                    dataField: "LastName",
                    caption: "Apellidos"
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
            dataSource: clientes,
            columns: columns
        }
        DevExpressUtils.gridControl(ids.tabla, gridOptions);
    }
    defineVars();
    showTable();
});