using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SAC_BP.Models.ModelResponse
{
    public class Response
    {
        public string Error { get; set; }
        public bool Success { get; set; }
        public object item;
    }
}
