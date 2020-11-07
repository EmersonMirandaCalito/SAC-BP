$(function () {

    function defineVars() {
        this.ids = {
            username: '#username',
            password: '#password'
        }
    }
    defineVars();
    $("#btnIngresar").click(function (e) {
        e.preventDefault();
        let user = $(ids.username).val();
        let pass = $(ids.password).val();

        if (user == "" || pass == "") {
            bootbox.errorAlert("No se permiten campos vacíos");
            return;
        }
        var data = {
            Comp_Id: -1,
            User_Id: -1,
            User_code: -1,
            User_Name: '',
            User_Email: '',
            User_Phone: '',
            Rol_Id: -1,
            user: user,
            Password: pass
        };
        getUser(data); 
    });
    function getUser(data) {
        
        $.ajax({
            url: '/User/getUser',
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data != null) {
                    sessionStorage.setItem('User', JSON.stringify(data[0]));
                    let url = "/Home/Index";
                    window.location.href = url;
                }
                else {
                    bootbox.errorAlert("Usuario o Contraseña Inválido");
                }
                
            },
            error: function (data) {
                bootbox.errorAlert("Ha ocurrido un error");
            }

        });
    }
});