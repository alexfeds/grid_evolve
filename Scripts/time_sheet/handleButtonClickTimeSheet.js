


////====================================START====================================
//// HANDLE-BUTTONS CLICKS
//c1.documentReady(function () {
//    var theGrid = wijmo.Control.getControl('#theGrid'); //gets reference to main grid table
//    theGrid.addEventListener(theGrid.hostElement, 'click', function (e) {
//        if (e.target.tagName == 'BUTTON') {
//            // get button's data item
//            var item = wijmo.closest(e.target, '.wj-cell');
//            if (item) {
//                console.log("item", item.dataItem)
//                var itemD = item.dataItem
//            }
//            // handle buttons
//            switch (e.target.id) {

//                // start editing this item
//                case 'btnEdit':
//                    editItem(itemD);
//                    break;

//                // remove this item from the collection
//                case 'btnDelete':
//                    confirmDeletePopUp(null, e);
//                    break;

//                // commit edits
//                case 'btnOK':
//                    commitEdit();
//                    break;

//                // cancel edits
//                case 'btnCancel':
//                    cancelEdit();
//                    break;
//            }
//        }

//    });

//    theGrid.scrollPositionChanged.addHandler(cancelEdit);
//    theGrid.lostFocus.addHandler(cancelEdit);

//    // editing commands
//    var currentEditItem = null;

//    function editItem(item) {
//        cancelEdit();
//        currentEditItem = item;
//        theGrid.invalidate();
//    }

//    function commitEdit() {
//        if (currentEditItem) {
//            theGrid.columns.forEach(function (col) {
//                var input = theGrid.hostElement.querySelector('#' + col.binding);
//                if (input) {
//                    var value = wijmo.changeType(input.value, col.dataType, col.format);
//                    if (wijmo.getType(value) == col.dataType) {
//                        currentEditItem[col.binding] = value;
//                    }
//                }
//            });
//        }
//        currentEditItem = null;
//        theGrid.invalidate();
//    }

//    function cancelEdit() {
//        if (currentEditItem) {
//            currentEditItem = null;
//            theGrid.invalidate();
//        }
//    }
//})
//            // HANDLE-BUTTONS CLICKS
//            //====================================END======================================