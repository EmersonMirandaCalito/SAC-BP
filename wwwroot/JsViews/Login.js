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
        login();
    });
    $('#password').keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13) {
            login();
        }
    });
    function login() {
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
            User_Login: user,
            User_Password: pass
        };
        getUser(data); 
    }
    function getUser(data) {
        
        $.ajax({
            url: '/User/getUser',
            data: data,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.Success) {
                    sessionStorage.setItem('User', JSON.stringify(data.item));
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