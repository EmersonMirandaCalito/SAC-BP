using System;
using System.Collections.Generic;
using Newtonsoft.Json;

[Serializable]
[JsonObject]
public partial class ResponseDictionary
{
    [JsonProperty(PropertyName = "Success")]
    public bool Success { get; set; }
    [JsonProperty(PropertyName = "ErrorMessage")]
    public string ErrorMessage { get; set; }
    [JsonProperty(PropertyName = "Data")]
    public CustomDictionary<string, object> Data { get; set; }
    public List<CustomDictionary<string,Object>> Array { get; set; }
}