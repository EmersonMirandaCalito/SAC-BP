var DXUtils = Stapes.subclass({
    constructor: function(base) {
        this.defaultReservedWords = {
            SUMWORD: '|Word_Reserved_Sum_Column|',
            GROUPWORD: '|Word_Reserved_Group_Column|',
            HIDEWORD: '|Word_Reserved_Hide_Column|',
            AVERAGEWORD: '|Word_Reserved_Avg_Column|',
            CAPTIONWORD: '|Word_Reserved_Format_Caption|',
            FORMATWORD: '|Word_Reserved_Format_Column|',
            BOLDWORD: '|Word_Reserved_Bold_Text_Column|',
            PIVOTROWWORD: '|WORD_RESERVED_PIVOT_ROW|',
            PIVOTCOLUMNWORD: '|WORD_RESERVED_PIVOT_COLUMN|',
            PIVOTDATAWORD: '|WORD_RESERVED_PIVOT_DATA|',
        }
        this.baseModule = base;
    },

    /*-------GENERALES DEVEXPRESS---------------*/
    getDXDecimals: function () {
        var self = this;
        var decimals = '';

        if (self.baseModule.configuration.Gen_Decimals != undefined && self.baseModule.configuration.Gen_Decimals > 0) {
            decimals = '0.';
            for (var i = 0; i < self.baseModule.configuration.Gen_Decimals; i++) {
                decimals = decimals + '#';
            }
        }
        return decimals;
    },
    getColumnDataType: function (dataSource, column) {
        let dataType = 'string';

        let isValidDate = function (date) {
            let isDate = date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
            return isDate;
        }

        if (dataSource != undefined && dataSource.length > 0) {
            let firstData = dataSource[0][column];
            //let formattedDate = Date.parse(firstData);
            
            if (isValidDate(firstData)) {
                dataType = "date";
            } else if (typeof (firstData) === "number") {
                dataType = "number";
            } else if (typeof (firstData) === "string") {
                dataType = "string";
            } else if (typeof (firstData) === "boolean") {
                dataType = "boolean";
            }
        }

        return dataType;
    },

    /*---------GRIDCONTROL----------------*/
    /*
        HELPER: dataSource, columns, 
    */
    gridControl: function (control, customOptions) {
        var self = this;
        var gridControl = null;

        let defaultOptions = {
            paging: {
                pageSize: 5
            },
            export: {
                enabled: true,
                fileName: "Reporte"
            },
            pager: {
                allowedPageSizes: [5, 10],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            headerFilter: {
                visible: true
            },
            filterPanel: { visible: true },
            searchPanel: { visible: true },
            /*groupPanel: { visible: true },*/
            allowColumnReordering: true,
            allowColumnResizing: true,
            rowAlternationEnabled: true,
            filterRow: { visible: true, applyFilter: "auto" },
            showRowLines: false,
            /*columnHidingEnabled: true,*/
            /*wordWrapEnabled: true,*/
            groupPanel: {
                emptyPanelText: "Agrupe columnas aquí",
                visible: true
            },
            scrolling: {
                mode: "standard" // or "virtual" | "infinite"
            },
            columnResizingMode: "widget",
            customizeColumns: function (cols) {
                cols.forEach(function (column) {
                    self.formatCurrentColumn(customOptions.dataSource, column);
                    //column.cssClass = 'WrappedColumnClass';
                });
            },
            onContentReady: function () {
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.SUMWORD, 'visible', false);
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.GROUPWORD, 'visible', false);
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.HIDEWORD, 'visible', false);
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.CAPTIONWORD, 'visible', false);
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.AVERAGEWORD, 'visible', false);
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.FORMATWORD, 'visible', false);
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.BOLDWORD, 'visible', false);
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.PIVOTROWWORD, 'visible', false);
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.PIVOTCOLUMNWORD, 'visible', false);
                $(control).dxDataGrid('columnOption', self.defaultReservedWords.PIVOTDATAWORD, 'visible', false);
            },
            columnAutoWidth: true,
            width: '100%'
            /*columnHidingEnabled: false*/
        }
        
        if (!customOptions) {
            customOptions = {};
        }

        let options = $.extend({}, defaultOptions, customOptions);
        //let options = Object.assign({}, defaultOptions, customOptions);

        options.isFormatting = false;
        options.summary = self.formatGridControlSum(customOptions.dataSource)

        gridControl = $(control).dxDataGrid(options).dxDataGrid("instance");
        return gridControl;
    },
    formatGridControlSum: function (dataSource) {
        var self = this;

        let summaryItems = [];

        //SUM
        let sumColumns = self.formatGridContainColumn(dataSource, self.defaultReservedWords.SUMWORD);

        if (sumColumns) {
            let columnList = self.formatGridGetColumnInfo(dataSource, self.defaultReservedWords.SUMWORD);

            let columnListSplited = columnList.split(',');

            for (let i = 0; i < columnListSplited.length; i++) {
                let newSummaryItem = {
                    column: columnListSplited[i],
                    summaryType: "sum",
                    valueFormat: '#,##0.##',
                    /*customizeText: function (e) {
                        //let value = e.value;
                        /*let value = self.baseModule.decimalFormat(e.value);

                        //displayFormat: '0.##',

                        return value;
                    }*/
                }

                summaryItems.push(newSummaryItem);
            }
        }

        //AVG
        let averageColumns = self.formatGridContainColumn(dataSource, self.defaultReservedWords.AVERAGEWORD);

        if (averageColumns) {
            let averageList = self.formatGridGetColumnInfo(dataSource, self.defaultReservedWords.AVERAGEWORD);

            let averageColumnListSplited = averageList.split(',');

            for (let i = 0; i < averageColumnListSplited.length; i++) {
                let newAverageItem = {
                    column: averageColumnListSplited[i],
                    summaryType: "avg",
                    valueFormat: '#,##0.##',
                    /*customizeText: function (e) {
                        //let value = e.value;
                        /*let value = self.baseModule.decimalFormat(e.value);

                        //displayFormat: '0.##',

                        return value;
                    }*/
                }

                summaryItems.push(newAverageItem);
            }
        }

        let summary = {
            totalItems: summaryItems,
            groupItems: summaryItems
        }

        return summary;
    },
    formatCurrentColumn: function (dataSource, column) {
        var self = this;

        self.gridColumnHide(dataSource, column, self);
        self.gridColumnCaption(dataSource, column, self);
        self.gridColumnGroup(dataSource, column, self);
        self.gridColumnBoldText(dataSource, column, self);

        let dataType = self.getColumnDataType(dataSource, column.dataField);
        if (dataType == "number") {
            //column.format = self.getDXDecimals();

            /*column.format = {
                type: "thousands",
                precision: 2
            }*/

            //column.format = "#,##0.##";
            column.format = {
                type: "fixedPoint",
                precision: 2
            }

            column.customizeText = function (e) {
                if (e.value == '0.00') {
                    return '-';
                } else {
                    return e.valueText;
                }
            }
            
            //column.format = 'decimal fixedPoint';
        }

        self.gridColumnFormat(dataSource, column, self);

    },

    gridColumnHide: function (dataSource, column, self) {      
        let hideColumns = self.formatGridContainColumn(dataSource, self.defaultReservedWords.HIDEWORD);

        if (hideColumns) {
            let columnList = self.formatGridGetColumnInfo(dataSource, self.defaultReservedWords.HIDEWORD);

            let columnListSplited = columnList.split(',');

            for (let i = 0; i < columnListSplited.length; i++) {
                let currentHideColumn = columnListSplited[i];

                if (currentHideColumn == column.dataField) {
                    column.visible = false;
                    break;
                }
            }
        }
    },
    gridColumnCaption: function (dataSource, column, self) {
        let captionColumns = self.formatGridContainColumn(dataSource, self.defaultReservedWords.CAPTIONWORD);

        if (captionColumns) {
            let columnList = self.formatGridGetColumnInfo(dataSource, self.defaultReservedWords.CAPTIONWORD);

            let columnListSplited = columnList.split(',');

            for (let i = 0; i < columnListSplited.length; i++) {
                let currentCaptionColumn = columnListSplited[i].split(":");

                if (currentCaptionColumn[0] == column.dataField) {
                    column.caption = currentCaptionColumn[1];
                    break;
                }
            }

        }
    },
    gridColumnGroup: function (dataSource, column, self) {
        let groupColumns = self.formatGridContainColumn(dataSource, self.defaultReservedWords.GROUPWORD);

        if (groupColumns) {
            let columnList = self.formatGridGetColumnInfo(dataSource, self.defaultReservedWords.GROUPWORD);

            let columnListSplited = columnList.split(',');

            for (let i = 0; i < columnListSplited.length; i++) {
                let currentGroupColumn = columnListSplited[i];

                if (currentGroupColumn == column.dataField) {
                    column.groupIndex = 0;
                    break;
                }
            }
        }
    },
    gridColumnFormat: function (dataSource, column, self) {
        let groupColumns = self.formatGridContainColumn(dataSource, self.defaultReservedWords.FORMATWORD);

        if (groupColumns) {
            let columnList = self.formatGridGetColumnInfo(dataSource, self.defaultReservedWords.FORMATWORD);

            let columnListSplited = columnList.split(',');

            for (let i = 0; i < columnListSplited.length; i++) {
                let currentFormatColumn = columnListSplited[i].split(":");

                if (currentFormatColumn[0] == column.dataField) {
                    column.dataType = currentFormatColumn[1];
                    break;
                }
            }
        }
    },
    gridColumnBoldText: function (dataSource, column, self) {
        let boldColumns = self.formatGridContainColumn(dataSource, self.defaultReservedWords.BOLDWORD);

        if (boldColumns) {
            let columnList = self.formatGridGetColumnInfo(dataSource, self.defaultReservedWords.BOLDWORD);

            let columnListSplited = columnList.split(',');

            for (let i = 0; i < columnListSplited.length; i++) {
                let currentBoldColumn = columnListSplited[i];

                if (currentBoldColumn == column.dataField) {
                    column.cssClass = 'dx-bold-text';
                    break;
                }
            }
        }
    },
    formatGridContainColumn: function (dataSource, column) {
        let containColumn = false;

        if (dataSource != undefined && dataSource.length > 0) {
            let currentRow = dataSource[0];

            if (currentRow[column] != undefined) {
                containColumn = true;
            }
        }

        return containColumn;
    },
    formatGridGetColumnInfo: function (dataSource, column) {
        let value = '';

        if (dataSource != undefined && dataSource.length > 0) {
            let currentRow = dataSource[0];

            if (currentRow[column] != undefined) {
                value = currentRow[column];
            }
        }

        return value;
    },
    formatHeaderColumn: function () {

    },

    /*-----------------DXCHART (Gráfico de barras) -------------------*/
    barChart: function (control, customOptions) {
        var barChart = null;

        let defaultOptions = {
            series: {
                type: "bar",
                color: '#ffaa66'
            },
            tooltip: {
                enabled: true,
                customizeTooltip: function (arg) {
                    return {
                        text: "<b>" + arg.argumentText + "</b></br>" + arg.percentText + " - " + arg.valueText
                    };
                }
            }
        }

        /*dataSource: dataSource, 
        series: {
            argumentField: "day",
            valueField: "oranges",
            name: "My oranges",
            type: "bar",
            color: '#ffaa66'
        }*/

        if (!customOptions) {
            customOptions = {};
        }

        let options = $.extend({}, defaultOptions, customOptions);

        barChart = $(control).dxChart(options).dxChart("instance");
        return barChart;
    },
    pieChart: function (control, customOptions) {
        var pieChart = null;

        let defaultOptions = {
            palette: "bright",
            series: {
           
            },
            connector: {
                visible: true,
                width: 0.5
            },
            tooltip: {
                enabled: true,
                customizeTooltip: function (arg) {
                    return {
                        /*text: "<b>" + arg.argumentText + "</b></br>" + arg.percentText + " - " + arg.valueText*/
                        text: '<b>' + arg.argument + '</b> <br/> ' + arg.valueText + '%'
                    };
                },
            },
            title: 'Grafico'
        }

        if (!customOptions) {
            customOptions = {};
        }

        let options = $.extend({}, defaultOptions, customOptions);

        pieChart = $(control).dxPieChart(options).dxPieChart("instance");
        return pieChart;
    },
    getEncodedImage: function (control) {
        var self = this;

        let svgImage = control.svg();
        var encodedData = window.btoa(svgImage);
        //encodedData = 'data:image/svg+xml;base64,' + encodedData;
        //var imgSource = `data:image/svg+xml;base64,${encodedData}`;
        //var imgSource = `data:image/png;base64,${encodedData}`;

        //return imgSource;
        return encodedData;
    },

    /*------------PIVOT GRID -----------------------------------------*/
    pivotGrid: function (control, customOptions) {
        var self = this;

        let defaultOptions = {
            dataFieldArea: "column",
            rowHeaderLayout: "tree",
            wordWrapEnabled: false,
            dataSource: {}
        }

        //procesamos los campos de columnas, filas y datos
        defaultOptions.dataSource = self.pivotGetDataSource(customOptions.data);

        if (!customOptions) {
            customOptions = {};
        }

        let options = $.extend({}, defaultOptions, customOptions);

        options.onCellClick = function(e) {
            console.info(e);
        }
        
        $(control).dxPivotGrid(options);
    },
    pivotGetDataSource: function (data) {
        var self = this;

        let dataSource = {}
        let fields = [];

        if (data != undefined && data.length > 0) {
           
            let firstRow = data[0];

            //rows
            if (firstRow[self.defaultReservedWords.PIVOTROWWORD] != undefined) {
                let rowField = self.formatGridGetColumnInfo(data, self.defaultReservedWords.PIVOTROWWORD);

                let rowFields = rowField.split(',');

                for (let i = 0; i < rowFields.length; i++) {
                    let currentField = rowFields[i].split(":");

                    let newRowField = {
                        caption: (currentField[1] != undefined ? currentField[1] : currentField[0]),
                        dataField: currentField[0],
                        expanded: true,
                        area: "row"
                    }

                    fields.push(newRowField);
                }
            }

            //columns
            if (firstRow[self.defaultReservedWords.PIVOTCOLUMNWORD] != undefined) {
                let columnField = self.formatGridGetColumnInfo(data, self.defaultReservedWords.PIVOTCOLUMNWORD);

                let columnFields = columnField.split(',');

                for (let i = 0; i < columnFields.length; i++) {
                    let currentField = columnFields[i].split(":");

                    let newColumnField = {
                        caption: (currentField[1] != undefined ? currentField[1] : currentField[0]),
                        dataField: currentField[0],
                        expanded: true,
                        area: "column"
                    }

                    fields.push(newColumnField);
                }
            }

            //data
            if (firstRow[self.defaultReservedWords.PIVOTDATAWORD] != undefined) {
                let dataField = self.formatGridGetColumnInfo(data, self.defaultReservedWords.PIVOTDATAWORD);

                let dataFields = dataField.split(',');

                for (let i = 0; i < dataFields.length; i++) {
                    let currentField = dataFields[i].split(":");

                    let newDataField = {
                        caption: (currentField[1] != undefined ? currentField[1] : currentField[0]),
                        dataField: currentField[0],
                        summaryType: currentField[2],
                        area: "data"
                    }

                    fields.push(newDataField);
                }
            }
        }

        dataSource = {
            fields: fields,
            store: data
        }

        return dataSource;
    },

    /*------------PANELS ---------------------------------------------*/
    box: function (control, customOptions) {
        var boxPanel = null;

        let defaultOptions = {
            direction: "row",
            width: "100%",
            height: 100
        }

        let options = $.extend({}, defaultOptions, customOptions);

        boxPanel = $(control).dxBox(options).dxBox('instance');

        return boxPanel;
    }
});
