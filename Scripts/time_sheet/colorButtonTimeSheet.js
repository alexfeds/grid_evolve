//====================================START====================================
// BUTTONS-COLOR-CHANGE
// custom formatter to paint buttons and editors
c1.documentReady(function () {
    var theGrid = wijmo.Control.getControl('#theGrid'); //gets reference to main grid table
    theGrid.formatItem.addHandler(function (s, e) {
        var currentEditItem = null;
        if (e.panel == s.cells) {
            var col = s.columns[e.col],
                item = s.rows[e.row].dataItem;

            if (item == currentEditItem) {

                // create editors and buttons for the item being edited
                switch (col.binding) {
                    case 'Actions':
                        e.cell.innerHTML = document.getElementById('tplBtnEditMode').innerHTML;
                        e.cell.dataItem = item;
                        break;
                    case 'Id':
                    case 'State':
                    case 'Title':
                    case 'Type':
                    case 'Duration':
                        e.cell.innerHTML = '<input class="form-control" ' +
                            'id="' + col.binding + '" ' +
                            'value="' + s.getCellData(e.row, e.col, true) + '"/>';
                        break;
                }
            } else {

                // create buttons for items not being edited
                switch (col.binding) {
                    case 'Actions':
                        e.cell.innerHTML = document.getElementById('tplBtnViewMode').innerHTML;
                        e.cell.dataItem = item;
                        break;
                }
            }
        }


    });

})
            // BUTTONS-COLOR-CHANGE
            //====================================END======================================
