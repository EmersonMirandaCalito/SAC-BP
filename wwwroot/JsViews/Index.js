$(function () {
    var user = sessionStorage.getItem('User');
    var userSession = JSON.parse(user);
    function defineVars() {
        this.ids = {
            lbUsuario: '#lbUsuario',
            logout: '#logout',
            lnkCaracteristicasClientes: '#lnkCaracteristicasClientes'
        }
    }
    defineVars();
    $("#lnkUsuarios").click(function (e) {
        e.preventDefault();
        let url = "/Home/Usuarios";
        window.location.href = url;
    });
    $(ids.lnkCaracteristicasClientes).click(function (e) {
        e.preventDefault();
        let url = "/Home/CaracteristicasClientes";
        window.location.href = url;
    });
    $(ids.logout).click(function (e) {
        e.preventDefault();
        logout();
    });
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
    
    
    
});