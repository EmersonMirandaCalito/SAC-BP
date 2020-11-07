$(function () {
    
    function defineVars() {
        this.ids = {
            lbUsuario: '#lbUsuario',
            logout : '#logout'
        }
    }
    defineVars();
    $("#lnkUsuarios").click(function (e) {
        e.preventDefault();
        let url = "/Home/Usuarios";
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
        var user = sessionStorage.getItem('User');

        if (user != null) {
            var userSession = JSON.parse(user);
            $(ids.lbUsuario).text(userSession.User_Name);
        } else {
            logout();
        }   
    }


    
    checkSession();
    
    
    
});