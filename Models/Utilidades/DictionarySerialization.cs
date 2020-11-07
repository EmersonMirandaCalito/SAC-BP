using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using DataAccess;
using Microsoft.VisualBasic; // Install-Package Microsoft.VisualBasic
using Microsoft.VisualBasic.CompilerServices; // Install-Package Microsoft.VisualBasic

public partial class DictionarySerialization<T>
{
    public CustomDictionary<string, object> ObjectToDictionary(T objectData)
    {

        string propertyName = string.Empty;
        try
        {
            var data = new CustomDictionary<string, object>();
            if (objectData.GetType().IsSubclassOf(typeof(DataAccess.TBaseClass)) || objectData.GetType().IsSubclassOf(typeof(TBaseClass)))
            {
                var properties = objectData.GetType().GetProperties();
                foreach (PropertyInfo currentProperty in properties)
                {
                    bool isDataSet = ReferenceEquals(currentProperty.PropertyType, typeof(DataSet));
                    bool canRead = currentProperty.CanRead;
                    bool isTBaseClass = currentProperty.PropertyType.IsSubclassOf(typeof(DataAccess.TBaseClass));
                    propertyName = currentProperty.Name;
                    bool hasParameters = currentProperty.GetIndexParameters().Length > 0;
                    bool isTDataAccess = ReferenceEquals(currentProperty.PropertyType, typeof(DataAccess.TDataAccess));
                    if (isDataSet == false && canRead && !hasParameters && !isTDataAccess)
                    {
                        bool isBytes = typeof(byte[]) == currentProperty.PropertyType;
                        bool isList = typeof(IList).IsAssignableFrom(currentProperty.PropertyType);
                        if (isBytes)
                        {
                            isList = false;
                        }

                        if (isList == false)
                        {
                            if (objectData is object)
                            {
                                var value = currentProperty.GetValue(objectData, null);
                                if (isBytes && value is object)
                                {
                                    value = Convert.ToBase64String((byte[])value);
                                }

                                data.Add(currentProperty.Name, value);
                            }
                        }
                        else if (isList && currentProperty.PropertyType.IsGenericType)
                        {
                            IList item = (IList)currentProperty.GetValue(objectData, null);
                            if (item is object)
                            {
                                var arrayValues = new List<CustomDictionary<string,Object>>();
                                foreach (object o in item)
                                    arrayValues.Add(ObjectToDictionary((T)o));
                                data.Add(currentProperty.Name, Newtonsoft.Json.JsonConvert.SerializeObject(arrayValues.ToArray()));
                            }
                        }
                        else if (currentProperty.PropertyType.IsSubclassOf(typeof(DataAccess.TBaseClass)))
                        {
                            var dataObject = ObjectToDictionary((T)currentProperty.GetValue(objectData, null));
                            data.Add(currentProperty.Name, Newtonsoft.Json.JsonConvert.SerializeObject(dataObject));
                        }
                    }
                }
            }

            return data;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message + " PROPERTY: " + propertyName);
        }
    }

    public void DictionaryToObject(Dictionary<string, object> objectData, ref T target)
    {
        var properties = target.GetType().GetProperties();
        foreach (PropertyInfo currentProperty in properties)
        {
            if (!ReferenceEquals(currentProperty.PropertyType, typeof(DataSet)) & currentProperty.CanWrite)
            {
                var data = GetValue(objectData, currentProperty.Name);
                if (data is object)
                {
                    // If objectData.ContainsKey(currentProperty.Name) Then

                    var objectType = currentProperty.PropertyType;
                    var objectValue = data; // objectData(currentProperty.Name)
                    try
                    {
                        if (objectValue is object)
                        {
                            currentProperty.SetValue(target, ParseValue(objectValue, objectType), null);
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
        }
    }

    private object ParseValue(object dataValue, Type type)
    {
        object value = null;
        try
        {
            switch (type)
            {
                case var @case when @case == typeof(short):
                    {
                        value = short.Parse((string)dataValue);
                        break;
                    }

                case var case1 when case1 == typeof(int):
                    {
                        value = int.Parse((string)dataValue);
                        break;
                    }

                case var case2 when case2 == typeof(long):
                    {
                        value = long.Parse((string)dataValue);
                        break;
                    }

                case var case3 when case3 == typeof(int):
                    {
                        value = int.Parse((string)dataValue);
                        break;
                    }

                case var case4 when case4 == typeof(short):
                    {
                        value = short.Parse((string)dataValue);
                        break;
                    }

                case var case5 when case5 == typeof(double):
                    {
                        value = double.Parse((string)dataValue);
                        break;
                    }

                case var case6 when case6 == typeof(byte):
                    {
                        value = byte.Parse((string)dataValue);
                        break;
                    }

                case var case7 when case7 == typeof(bool):
                    {
                        value = bool.Parse((string)dataValue);
                        break;
                    }

                case var case8 when case8 == typeof(char):
                    {
                        value = char.Parse(Conversions.ToString(dataValue));
                        break;
                    }

                default:
                    {
                        value = dataValue;
                        break;
                    }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }

        return value;
    }

    private object GetValue(Dictionary<string, object> objectData, string propertyName)
    {
        object value = null;
        var keys = objectData.Keys;
        int index = 0;
        bool found = false;
        while (index < keys.Count && !found)
        {
            string currentKey = keys.ElementAtOrDefault(index);
            if (currentKey.ToLower().CompareTo(propertyName.ToLower()) == 0)
            {
                found = true;
                value = objectData[currentKey];
            }
            else
            {
                index = index + 1;
            }
        }

        return value;
    }

    public List<CustomDictionary<string,Object>> DataTableToDictionary(DataTable table)
    {
        var data = new List<CustomDictionary<string, Object>>();
        foreach (DataRow currentRow in table.Rows.OfType<DataRow>().ToList())
        {
            var currentData = new CustomDictionary<string, object>();
            for (int index = 0, loopTo = table.Columns.Count - 1; index <= loopTo; index++)
            {
                object value = currentRow.ItemArray[index];
                if (Information.IsDBNull(value))
                {
                    value = null;
                }
                else if (value.GetType() == typeof(byte[]))
                {
                    value = Convert.ToBase64String((byte[])value);
                }

                currentData.Add(table.Columns[index].ColumnName, value);
            }

            data.Add(currentData);
        }

        return data;
    }

    
}