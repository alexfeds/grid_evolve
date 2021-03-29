//global row index
var selectedRowIndex;
c1.documentReady(function () {

    var theGrid = wijmo.Control.getControl('#theGrid'); //gets reference to main grid table
    var popup = new wijmo.input.Popup("#popup");

    theGrid.allowAddNew = true; //allows to add new row in table
    theGrid.allowDelete = true; //allow delete row
    theGrid.rows.defaultSize = 45; //sets height of row


    //====================================START====================================
    // BUTTONS-COLOR-CHANGE
    // custom formatter to paint buttons and editors
    theGrid.formatItem.addHandler(function (s, e) {

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


    // BUTTONS-COLOR-CHANGE
    //====================================END======================================




    //====================================START====================================
    // LISTEN FOR CELL EDIT END
    theGrid.cellEditEnded.addHandler(function (s, e) {

        // create the new item, add it to the collection
        let rowItemObj = theGrid.collectionView.items[selectedRowIndex]

        console.log("viewitems", rowItemObj);

        var myDurationProp = 'Duration';
        var myHourlyRateProp = 'Hourly_Rate';

        var rate = 0;
        var duration = 0;
        if (rowItemObj) {
            if (rowItemObj.hasOwnProperty(myDurationProp)) {
                duration = rowItemObj.Duration.toTimeString().split(' ')[0];
            }

            if (rowItemObj.hasOwnProperty(myHourlyRateProp)) {
                rate = rowItemObj.Hourly_Rate
            }
        }
      

        var itemsData = theGrid.collectionView.items;

        //calculus
        if (duration) {
            duration = roundTime(duration, 15)
            var timeToDec = timeToDecimal(duration)
            var resultTimeWork = timeToDec * rate;

        }
        itemsData[e.row].Total = resultTimeWork;
        theGrid.refresh();
        setChanged(e.row, e.col);
    });

    // LISTEN FOR CELL EDIT END
    //====================================END======================================


    //====================================START====================================
    // POP UP DIALOG
    //confirmation pop up
    function confirmDeletePopUp(s, e) {
        e.cancel = true;
        //show pop up to confirm
        popup.show(true, function (sender) {
            var view = theGrid.collectionView;
            // delete the row
            if (sender.dialogResult == 'wj-hide-ok') {
                view.remove(view.currentItem);
            }
            else {
                e.cancel = true;
            }
        });
    }
    // POP UP DIALOG
    //====================================END======================================


    //====================================START====================================
    // HANDLE-BUTTONS CLICKS
    theGrid.addEventListener(theGrid.hostElement, 'click', function (e) {
        if (e.target.tagName == 'BUTTON') {
            // get button's data item
            var item = wijmo.closest(e.target, '.wj-cell');
            if (item) {
                console.log("item", item.dataItem)
                var itemD = item.dataItem
            }
            // handle buttons
            switch (e.target.id) {

                // start editing this item
                case 'btnEdit':
                    editItem(itemD);
                    break;

                // remove this item from the collection
                case 'btnDelete':
                    confirmDeletePopUp(null, e);
                    break;

                // commit edits
                case 'btnOK':
                    commitEdit();
                    break;

                // cancel edits
                case 'btnCancel':
                    cancelEdit();
                    break;
            }
        }

    });

    theGrid.scrollPositionChanged.addHandler(cancelEdit);
    theGrid.lostFocus.addHandler(cancelEdit);

    // editing commands
    var currentEditItem = null;

    function editItem(item) {
        cancelEdit();
        currentEditItem = item;
        theGrid.invalidate();
    }

    function commitEdit() {
        if (currentEditItem) {
            theGrid.columns.forEach(function (col) {
                var input = theGrid.hostElement.querySelector('#' + col.binding);
                if (input) {
                    var value = wijmo.changeType(input.value, col.dataType, col.format);
                    if (wijmo.getType(value) == col.dataType) {
                        currentEditItem[col.binding] = value;
                    }
                }
            });
        }
        currentEditItem = null;
        theGrid.invalidate();
    }

    function cancelEdit() {
        if (currentEditItem) {
            currentEditItem = null;
            theGrid.invalidate();
        }
    }
    // HANDLE-BUTTONS CLICKS
    //====================================END======================================



    //====================================START====================================
    // UTILS ACTIONS HELPERS
    var index = 0;
    //sets value on new row
    function setValueOnNewRowCreate() {
        var view = theGrid.collectionView
        var rate = 0; //default
        rate = parseFloat(rate).toFixed(2)
        var rateinDec = 0;
        rateinDec = parseFloat(rateinDec).toFixed(2)
        view.newItemCreator = function () {

            rate = document.getElementById("hourSetf").value

            if (rate) {
                rate = parseFloat(rate);
                rateinDec = rate.toFixed(2)
            }

            return {
                Id: index++,
                State: "Active",
                Hourly_Rate: '$' + rateinDec
            };

        }
    }
    setValueOnNewRowCreate();

    // set new row at top
    document.getElementById('brBut').addEventListener('click', function (e) {
        theGrid.newRowAtTop = true;
    })


    // submit row
    document.getElementById('brSubt').addEventListener('click', function (e) {

        //makes row readonly
        var rows = theGrid.rows;
        var selectedRow = rows[selectedRowIndex]
        selectedRow.isReadOnly = true;

        //sets the state cell to submitted
        var itemsData = theGrid.collectionView.items;
        itemsData[selectedRowIndex].State = "Submitted";
        theGrid.refresh();

    })

    // submit row
    document.getElementById('brUnSubt').addEventListener('click', function (e) {

        //makes row readonly
        var rows = theGrid.rows;
        var selectedRow = rows[selectedRowIndex]
        selectedRow.isReadOnly = false;

        //sets the state cell to submitted
        var itemsData = theGrid.collectionView.items;
        itemsData[selectedRowIndex].State = "Active";
        theGrid.refresh();

    })



    //delting row handler
    theGrid.deletingRow.addHandler(function (s, e) {
        confirmDeletePopUp(s, e)
    });

    //gets selected row index
    theGrid.selectionChanged.addHandler(function (s, e) {
        this.selectedRowIndex = e.row;
    });
    theGrid.onSelectionChanged(); // initialize selection display

    // utility to keep track of changed items
    var changes = [];
    function setChanged(r, c) {
        if (!getChanged(r, c)) {
            changes.push({
                item: theGrid.rows[r].dataItem,
                prop: theGrid.columns[c].binding
            });
        }
    }
    function getChanged(r, c) {
        for (var i = 0; i < changes.length; i++) {
            var item = theGrid.rows[r].dataItem;
            var prop = theGrid.columns[c].binding;
            var ch = changes[i];
            if (ch.item == item && ch.prop == prop) {
                return true;
            }
        }
        return false;
    }

    function timeToDecimal(t) {
        var arr = t.split(':');
        var dec = parseInt((arr[1] / 6) * 10, 10);

        return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
    }

    let roundTime = (time, minutesToRound) => {

        time = time.slice(0, 5);
        console.log("sliced time", time)

        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        minutes = parseInt(minutes);

        // Convert hours and minutes to time in minutes
        time = (hours * 60) + minutes;

        let rounded = Math.round(time / minutesToRound) * minutesToRound;
        let rHr = '' + Math.floor(rounded / 60)
        let rMin = '' + rounded % 60

        return rHr.padStart(2, '0') + ':' + (15 * Math.ceil(minutes / 15));
    }
})

            // UTILS ACTIONS HELPERS
            //====================================END======================================
