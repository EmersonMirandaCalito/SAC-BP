$(function () {

    
    const contacts = [
        { ID: 1, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono:"88-88-88-88" },
        { ID: 2, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 3, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88"},
        { ID: 4, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 5, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 6, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 7, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 8, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 9, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 10, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 12, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 13, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 14, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88"},
        { ID: 25, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 31, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 41, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" },
        { ID: 42, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88"},
        { ID: 43, Nombre: "Sandra", Empresa: "AMPM", Correo: "correo@correo.com", Telefono: "88-88-88-88" }
    ];

    function defineVars() {
        this.ids = {
            tabla: '#tablaContactos'
        }
    }

    $("#lnkContactos").click(function (e) {
        e.preventDefault();
        let url = "/Home/Contactos";
        window.location.href = url;
    });
   
    function showTable() {
        this.DevExpressUtils = new DXUtils(this);
        let columns = [
            {
                dataField: "ID",
                caption: "ID"
            },
            {
                dataField: "Nombre",
                caption: "Nombre"
            },
            {
                dataField: "Empresa",
                caption: "Empresa"
            },
            {
                dataField: "Correo",
                caption: "Correo"
            },
            {
                dataField: "Telefono",
                caption: "Telefono"
            },
            {
                type: "buttons",
                buttons: [{
                    icon: "fas fa-edit fa-2x",
                    cssClass: "btn-lg",
                    onClick: function (e) {
                        alert(e.row.data.ID);
                    }
                }]
            }
        ]
        let gridOptions = {
            dataSource: contacts,
            columns: columns
        }
        DevExpressUtils.gridControl(ids.tabla, gridOptions);

    }
    defineVars();
    showTable(); 
      
    
});