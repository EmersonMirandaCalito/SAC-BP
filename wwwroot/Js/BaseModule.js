var BaseModule = Stapes.subclass({
    /*Inicio y constructores*/
    constructor: function () {
        this.container = '#body-content';
        this.main;
        this.configuration = {};
        this.userData = null;
        this.companies = [];
        this.companyId = 0;
        this.generalContants = new ConstantsModule();
    },
    initialize: function (child, htmlFile, el, useWaitingDialog) {
        var self = this;

        $(document).ready(function () {

            if (useWaitingDialog && waitingModule) {
                waitingModule.start();
            }
            
            self.main = child;
            if (htmlFile) {
                var production = $('html').attr('data-production');
                
                if (production && production == 'True') {
                    htmlFile = htmlFile.replace('.html', '.min.html');
                }
                self.loadHtml(htmlFile, el, useWaitingDialog);
            } else {
                self.init(child, useWaitingDialog);
            }
                        
        });
    },
    init: function (child, useWaitingDialog) {
        try {

        
            if (typeof child.defineVars == 'function') {
                child.defineVars();
            }
            if (typeof child.defineView == 'function') {
                child.defineView();
            }
            if (typeof child.defineValidator == 'function') {
                child.defineValidator();
            }
            if (typeof child.defineEvents == 'function') {
                child.defineEvents();
            }
            this.beReady();
        } catch (e) {
            console.error(e);
        } finally {
            if (useWaitingDialog && waitingModule) {
                waitingModule.stop();
            }
        }
    },
    beReady : function() {
        this.emit('ready');
    },
    loadHtml: function (htmlFile, el, useWaitingDialog) {
        var self = this;
        if (el) {
            this.container = el;
        }
        
        if (useApplicationIIS && htmlFile.startsWith(applicationISSPrefixModule) == false) {
            htmlFile = '/' + applicationISSPrefixModule + htmlFile;
        }

        $(this.container).load(htmlFile, function () {
            self.init(self.main, useWaitingDialog);
        });
    },
    initSpinner: function (button) {
        var spinner = Ladda.create(button);
        spinner.start();

        return spinner;
    },
    defaultFeedbackIcons: function () {
        return {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        };
    },
    checkSesion: function () {
        var self = this;
        return "mensaje";
    },
    /*Configuración inicial*/
    setCompanyNameTitle: function () {
        var self = this;

        $('.companyName').html(self.configuration.Comp_Name);
    },
    setTitle: function (title) {
        $('.pageTitle').html(title);
    },
    getConfiguration: function () {
        var self = this;
        var url = "Configuration/" + self.getUniqueCompanyName() + "/GetConfiguration";
        var project = window.sessionStorage.getItem('project');

        this.getUserData();

        var json = {
            companyId: this.userData.Comp_Id,
            userId: this.userData.User_Id
        };

        var successCallback = function (data) {
            if (data.Success) {
                self.configuration = data.Data;
                //self.validateConfigurationOnline(self.configuration);
                //self.configuration.Truck_Granel = false;
                //self.configuration.Allow_Include_Invoice_Consecutive = true;
            } else {
                bootbox.errorAlert(data.ErrorMessage);
            }

        };
        var errorCallback = function (e, x, y) {
            bootbox.errorAlert(x);
        };
        $.doGetAndWait(url, json, successCallback, errorCallback);

    },
    validateConfigurationOnline: function (currentConfiguration) {
        let validCash = false;
        let validOnline = false;

        if (currentConfiguration.Cash_Id != undefined && currentConfiguration.Cash_Id != null) {
            validCash = true;
        } else {
            validCash = false;
            bootbox.errorAlert("El usuario no tiene caja ni camión configurado", function () {
                window.sessionStorage.setItem('user', null);
                window.location.href = self.getUniqueCompanyName() + "/Account/Login";
            });
        }

        if (currentConfiguration.AllowOffline == 1 || currentConfiguration.AllowOffline == true || currentConfiguration.AllowOffline == -1) {
            validOnline = false;
            bootbox.errorAlert("La caja está configurada para trabajar en un ambiente local de sincronización. Por favor contactar con el administrador", function () {
                window.sessionStorage.setItem('user', null);
                window.location.href = self.getUniqueCompanyName() + "/Account/Login";
            });
        } else {
            validOnline = true;
        }
    },
    getUserData: function () {
        var self = this;
        var url = "Configuration/GetUserData";
        var json = {};
        /*if (self.isOnline()) {

            var successCallback = function (data) {
                if (data.Success) {
                    self.userData = data.Data;
                    
                } else {
                    self.userData = null;
                    bootbox.errorAlert(data.ErrorMessage);
                }

            };
            var errorCallback = function (e, x, y) {
                bootbox.errorAlert(x);
                self.userData = null;
            };
            $.doPostAndWait(url, json, successCallback, errorCallback);
        } else {*/

        var user = window.sessionStorage.getItem('user');

        if (user != null) {
            self.userData = JSON.parse(user);
        } else {
            self.userData = null;
        }
        /*}*/
    },
    getCompanies: function () {
        var self = this;
        var url = "Company/" + self.getUniqueCompanyName() + "/GetCompanies";
        var json = {}

        var successCallback = function (data) {
            if (data.Success) {
                self.companies = data.Data;
            } else {
                bootbox.errorAlert(data.ErrorMessage);
            }

        };
        var errorCallback = function (e, x, y) {
            bootbox.errorAlert(x);
        };
        $.doGetAndWait(url, json, successCallback, errorCallback);

    },
    isOnline: function () {
        var self = this;
        var online = window.sessionStorage.getItem("online");
        return (online == 1);
    },
    setOnline: function (isOnlineMode) {
        if (isOnlineMode == true) {
            window.sessionStorage.setItem("online", "1");
        } else {
            window.sessionStorage.setItem("online", "0");
        }
    },
    getUniqueCompanyName: function () {
        let compName = sessionStorage.getItem("compName");

        if (compName == undefined || compName == null || compName.trim() == "") {
            sessionStorage.setItem("compName", null);
        }

        //alert("Company: " + compName);
        return compName;
    },
  

    

    /*Manejo de formularios y objetos*/
    formToObject: function (form) {
        var formObject = {};
        $(form).find("input, select").each(function () {
            if ($.trim(this.name).length > 0) {
                var isSerializable = $(this).attr('serializable');
                if (!isSerializable || isSerializable == true) {
                    var isRef = $(this).attr('isRef');
                    if(isRef && isRef == 'true'){
                        var refAttribute = $(this).attr('refAttribute');
                        if (refAttribute) {
                            var ref = new Object();
                            ref[refAttribute] = $(this).val();
                            formObject[this.name] = ref;
                        }
                    } else if($(this).is(':radio')){
                        var value = $('input:radio[name=' + this.name + ']:checked').val();
                        formObject[this.name] = value;
                    } else if ($(this).is(':checkbox')) {
                        var value = $('input:checkbox[name=' + this.name + ']:checked').val();
                        formObject[this.name] = value;
                    } else if ($(this).attr('data-datepicker')) {                       
                        if ($.trim($(this).val()).length > 0) {

                            var dateTime;

                            if ($(this).parents('.date')) {                                
                                dateTime = $(this).parents('.date').datepicker('getDate');
                            } else {
                                dateTime = $(this).datepicker('getDate');
                            }
                            
                            if (dateTime) {
                                dateTime = dateTime.toISOString();
                                formObject[this.name] = dateTime;
                            }
                        }                            
                    } else {
                        if ($(this).data().type == "int") {
                            formObject[this.name] = parseInt($(this).val());
                        } else if ($(this).data().type == "float") {
                            formObject[this.name] = parseFloat($(this).val());
                        } else {
                            formObject[this.name] = $(this).val();
                        }
                        
                    }                        
                }
            }
        });

        $(form).find("textarea").each(function () {
            if ($.trim(this.name).length > 0) {
                var isSerializable = $(this).attr('serializable');
                if (!isSerializable || isSerializable === true) {
                    var isRef = $(this).attr('isRef');
                    if (isRef && isRef === 'true') {
                        var refAttribute = $(this).attr('refAttribute');
                        if (refAttribute) {
                            var ref = new Object();
                            ref[refAttribute] = $(this).val();
                            formObject[this.name] = ref;
                        }
                    } else {
                        formObject[this.name] = $(this).val();
                    }
                }
            }
        });

        return formObject;
    },
    loadForm: function (form, object) {        
        if (object) {            
            $(form).find(":input").each(function () {
                
                if ($.trim(this.name).length > 0) {
                    var data = object[this.name];
                    if (data != undefined) {
                        if ($(this).is(':radio')) {
                            $('input[name=' + this.name + ']').filter('[value=' + data + ']').prop('checked', true);
                            $('input[name=' + this.name + ']').trigger('change');                        
                        } else if ($(this).is(':checkbox')) {
                            $('input[name=' + this.name + ']').prop('checked', data);
                            $('input[name=' + this.name + ']').trigger('change');
                        } else if ($(this).attr('data-datepicker') || $(this).attr('data-date')) {

                            var longDate = data.replace('/Date(', '').replace(')/', '');
                            var date = new Date(parseInt(longDate));

                            if ($(this).attr('data-datepicker')) {
                                
                                if ($(this).parent().hasClass('date')) {
                                    console.log(this.name);
                                    $(this).parent('.date').datepicker('update', date);
                                } else {
                                    console.log(this.name);
                                    $(this).datepicker('update', date);
                                }
                            } else {
                                var date = moment(new Date(parseInt(longDate))).format("DD/MM/YYYY");
                                $(this).val(date);
                            }                            
                        } else {
                            $(this).val(data);
                        }
                    }
                }
            });
        }
    },
    createDatePicker: function (identificator, form) {
        var name = (form ? form + ' ' : '') + identificator;        
        $(name).datepicker({
            format: "dd/mm/yyyy",
            language: 'es',
            autoclose: true,
            disableTouchKeyboard: true,
            uiLibrary: 'bootstrap4'
        });
    },
    createDateTimePicker: function (identificator, form) {
        var name = (form ? form + ' ' : '') + identificator;
        $(name).datetimepicker({
            showClose: true,
            keepOpen: false,
            format: "DD/MM/YYYY hh:mm:ss a",
            showTodayButton: true,
            uiLibrary: 'bootstrap4'
        });
    },
    validate: function (form) {
        var validator = $(form).data('bootstrapValidator');
        if (validator) {
            validator.validate();
            return validator.isValid();
        } else {
            return false;
        }
    },
    isValidField: function (form, field) {
        var validator = $(form).data('bootstrapValidator');
        if (validator) {
            validator.revalidateField(field);
            return validator.isValidField(field);
        } else {
            return false;
        }
    },
    revalidateField: function (form, field) {
        var validator = $(form).data('bootstrapValidator');
        if (validator) {
            validator.revalidateField(field);
        }
    },
    resetField: function (form, field, resetValue) {
        var validator = $(form).data('bootstrapValidator');
        if (validator) {
            validator.resetField(field, resetValue);
        }
    },
    resetForm: function (form) {
        var validator = $(form).data('bootstrapValidator');
        if (validator) {
            validator.resetForm(true);
        }
    },
    clearForm: function (form) {
        var fields = {};
        $(form).find(":input:not(select)").each(function () {
            if (!$(this).is(':radio') && !$(this).is(':checkbox')) {
                $(this).val("");
            }
        });
        $(form).find("select").each(function () {
            $(this).val($(this).find("option:first").val());
        });
        return fields;
    },
    setSelectControl: function (control) {
        var self = this;

        if (control != undefined && control != null) {
            $(control).select();
            $(control).focus();
        }
    },
    datePickerGetValue: function (control) {
        //let valueString = $(control).datepicker('value');
        let valueString = $(control).val();
        let valueDate = new Date(valueString);

        return valueDate;
    },
    datePickerSetValue: function (control, dateValue) {
        $(control).datepicker('value', dateValue);
        $(control).val(dateValue);
    },
    
    /*Combos*/
    loadCombo: function (container, data, value, text, selectedValue) {
        var self = this;
        var select = $(container);
        select.html('');
        for (var i = 0; i < data.length; i++) {
            select.append('<option value="' + data[i][value] + '">' + data[i][text] + '</option>');
        }

        if (selectedValue != undefined) {
            select.val(selectedValue);
        }

    },
    loadComboNullValue: function (container, data, value, text, selectedValue, nullValue, nullText, nullValueFirst) {
        var self = this;
        var select = $(container);
        select.html('');

        if (nullValueFirst) {
            select.append('<option value="' + nullValue + '">' + nullText + '</option>');
        }

        for (var i = 0; i < data.length; i++) {
            select.append('<option value="' + data[i][value] + '">' + data[i][text] + '</option>');
        }

        if (nullValueFirst == false) {
            select.append('<option value="' + nullValue + '">' + nullText + '</option>');
        }

        if (selectedValue != undefined) {
            select.val(selectedValue);
        }

    },
    loadComboWithTags: function (container, data, value, text, tagColumn, selectedValue) {
        var self = this;
        var select = $(container);
        select.html('');
        for (var i = 0; i < data.length; i++) {
            select.append('<option value="' + data[i][value] + '" data-tag="' + data[i][tagColumn] + '">' + data[i][text] + '</option>');
        }

        if (selectedValue != undefined) {
            select.val(selectedValue);
        }

    },
    loadComboMonthlyDays: function (control) {
        var self = this;

        var select = $(control);
        select.html('');
        for (var i = 1; i < 30; i++) {
            select.append('<option value="' + i + '">' + i + '</option>');
        }
    },

    /*Formateadores*/
    dateTableFormatter: function (value, row) {
        var dateFormat = '';
        if (value != undefined && value != null) {
            dateFormat = value.replace('/Date(', '').replace(')/', '');
            
            dateFormat = moment(new Date(parseInt(dateFormat))).format('DD/MM/YYYY');
            
        }
        return dateFormat;
    },
    dateTimeTableFormatter: function (value, row) {
        var dateFormat = '';
        if (value != undefined && value != null) {
            dateFormat = value.replace('/Date(', '').replace(')/', '');
            var dateMoment = moment(parseInt(dateFormat));
            
            dateFormat = dateMoment.format('DD/MM/YYYY hh:mm:ss a');
            
        }
        return dateFormat;
    },
    formatDate: function (value) {
        var dateFormat = '';

        if (value != undefined && value != null) {
            dateFormat = value.replace('/Date(', '').replace(')/', '');
            dateFormat = moment(parseInt(dateFormat)).format('DD/MM/YYYY');
        }

        return dateFormat;
    },
    formatDateTime: function (value) {
        var dateFormat = '';

        if (value != undefined && value != null) {
            dateFormat = value.replace('/Date(', '').replace(')/', '');
            dateFormat = moment(parseInt(dateFormat)).format('DD/MM/YYYY hh:mm:ss a');
        }

        return dateFormat;
    },
    dateTimeTableFormatterPurchase: function (value, row) {
        var dateFormat = '';
        if (value !== undefined && value !== null) {

            dateFormat = value.replace('/Date(', '').replace(')/', '');
            var dateMoment = isNaN(value) ? moment(dateFormat) : moment(parseInt(dateFormat));

            dateFormat = dateMoment.format('DD/MM/YYYY hh:mm:ss a');

        }
        return dateFormat;
    },
    dateTableFormatterPurchase: function (value, row) {
        var dateFormat = '';
        if (value !== undefined && value !== null) {

            dateFormat = value.replace('/Date(', '').replace(')/', '');
            var dateMoment = isNaN(value) ? moment(dateFormat) : moment(parseInt(dateFormat));

            dateFormat = dateMoment.format('DD/MM/YYYY');

        }
        return dateFormat;
    },
    formatDateISO: function (value) {
        var dateFormat = '';

        if (value != undefined && value != null) {
            dateFormat = value.replace('/Date(', '').replace(')/', '');
            dateFormat = new Date(parseInt(dateFormat)).toISOString();
        }

        return dateFormat;
    },
    formatDateToLong: function (value) {
        var dateFormat = 0;

        if (value != undefined && value != null) {
            dateFormat = value.replace('/Date(', '').replace(')/', '');
            dateFormat = parseInt(dateFormat);
        }

        return dateFormat;
    },
    round: function (number, factor) {
        var rounded = number
        if (factor > 0) {
            rounded = Math.round(number / factor) * factor;
        }
        return rounded;
    },

    priceFormat: function (value) {
        var self = this;

        var string = numeral(parseFloat(value)).format('0,0' + self.getDecimals());

        return string;
    },
    priceLocalFormat: function (value) {
        var self = this;

        var string = numeral(parseFloat(value)).format('0,0' + self.getDecimals()) + ' ' + self.getLocalCurrencySymbol();

        return string;
    },
    priceForeignFormat: function (value) {
        var self = this;

        var string = numeral(parseFloat(value)).format('0,0' + self.getDecimals()) + ' ' + self.getForeignCurrencySymbol();

        return string;
    },
    numberFormat: function (value) {
        var self = this;

        var string = numeral(parseFloat(value)).format('0,0');

        return string;
    },
    numberFormatWithSelf: function (self, value) {
        var string = numeral(parseFloat(value)).format('0,0' + self.getDecimals());

        return string;
    },

 
    
    cleanNumberFormat: function (formattedValue) {
        var string = numeral().unformat(formattedValue);

        return string;
    },
    decimalFormat: function (value) {
        var self = this;

        var string = numeral(parseFloat(value)).format('0' + self.getDecimals());

        return string;
    },
    bulkAmountFormat: function (value) {
        var self = this;

        var string = numeral(parseFloat(value)).format('0.0');

        return string;
    },
    getDecimals: function () {
        var self = this;
        var decimals = '';
        if (self.configuration.Gen_Decimals != undefined && self.configuration.Gen_Decimals > 0) {
            decimals = '.';
            for (var i = 0; i < self.configuration.Gen_Decimals; i++) {
                decimals = decimals + '0';
            }
        }
        return decimals;
    },
    formatDateJson: function ($selector) {

        var self = this;
        self.useISODateFormat = false;

        var requireDate = $selector.parent('.date').datepicker('getDate');

        if (requireDate) {
            if (self.useISODateFormat) {
                requireDate = requireDate.toISOString();
            } else {
                requireDate = self.formatDatetoMSJSON(requireDate);
            }
        }

        return requireDate;
    },
    formatDatetoMSJSON: function (date) {
        var dateFormatted = '/Date(' + date.getTime() + ')/';
        return dateFormatted;
    },
   
   

   
    
    /*Curreny*/
    getLocalCurrencyName: function () {
        var self = this;
        var name = 'Local';
        if (self.configuration && self.configuration.Local_Currency_Name) {
            name = self.configuration.Local_Currency_Name;
        }

        return name;
    },
    getForeignCurrencyName: function () {
        var self = this;
        var name = 'Extranjero';
        if (self.configuration && self.configuration.Foreign_Currency_Name) {
            name = self.configuration.Foreign_Currency_Name;
        }

        return name;
    },
    getLocalCurrencySymbol: function () {
        var self = this;
        var name = 'CRC';
        if (self.configuration && self.configuration.Local_Currency_Symbol) {
            name = self.configuration.Local_Currency_Symbol;
        }

        return name;
    },
    getForeignCurrencySymbol: function () {
        var self = this;
        var name = 'DOL';
        if (self.configuration && self.configuration.Foreign_Currency_Symbol) {
            name = self.configuration.Foreign_Currency_Symbol;
        }

        return name;
    },
   

    /*Dates*/
    getDateTimePicker: function ($selector) {
        var selectedDate = $selector.data("DateTimePicker").date();

        var datetime = '';

        if (selectedDate == null || selectedDate == 'undefined') {
            datetime = null;
        } else {
            datetime = selectedDate.toDate();
        }

        return datetime;
    },
    setDateTimeValue: function ($selector, currentDate) {
        $selector.data("DateTimePicker").date(currentDate);
    },
    
    
   

    /*Modals*/
    showModal: function (modalId) {
        $(modalId).modal('show');
    },
    hideModal: function (modalId) {
        $(modalId).modal('hide');
    },
    staticModal: function (modalId) {
        $(modalId).modal({ backdrop: "static" });
    },
    
    /*Reports*/


    /*Others*/
    padLeft: function (value, length, placeholder) {

        var str = "" + value;

        if (placeholder == undefined || placeholder == null) {
            placeholder = '0';
        }

        if (length <= 0) {
            length = 1;
        }

        var pad = placeholder.repeat(length);

        var ans = pad.substring(0, pad.length - str.length) + str;

        return ans;
    },
    getInstallationStates: function () {
        var installationStatus = {
            INITIAL: 0,
            EVALUATION: 1,
            EVALUATION_COMPLETED: 2,
            QUOTATION: 3,
            TANK: 4,
            ORDER_PURSHASE: 5,
            LIST_MATERIALS: 6,
            INSTALLATION: 7,
            INSTALLATION_COMPLETED: 8,
            FINISHED: 9
        }

        return installationStatus;
    },
});

