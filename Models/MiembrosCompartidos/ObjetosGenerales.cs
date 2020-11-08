using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAC_BP.Models.MiembrosCompartidos
{
    public static class ObjetosGenerales
    {
        public const int sinRol = -1;
        public const int usuario = 1;
        public const int administrador = 1;

        public static Company company = new Company();
        public static User user = new User();
        public static string conexionString;

        public const long NOTHING_LONG = long.MinValue;
        public const int NOTHING_INTEGER = int.MinValue;
        public const double NOTHING_DOUBLE = double.MinValue;
        public const decimal NOTHING_DECIMAL = int.MinValue;
        public const short NOTHING_SHORT = short.MinValue;
        public const string NOTHING_STRING = null;
        public const string NOTHING_HEX = "#000000";

        public const string TABLA_USER = "TABLA_USER";
        public const string TABLA_USERS = "TABLA_USERS";
        public const string TABLA_FCLIENT = "TABLA_FCLIENT";
        public const string TABLA_FCLIENTS = "TABLA_FCLIENTS";
    }
}
