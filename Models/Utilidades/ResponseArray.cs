using System;
using System.Collections.Generic;
using Newtonsoft.Json;

[Serializable]
[JsonObject]
public partial class ResponseArray
{
    [JsonProperty(PropertyName = "Success")]
    public bool Success { get; set; }
    [JsonProperty(PropertyName = "ErrorMessage")]
    public string ErrorMessage { get; set; }
    [JsonProperty(PropertyName = "Data")]
    public List<CustomDictionary<string,Object>> Data { get; set; }
}