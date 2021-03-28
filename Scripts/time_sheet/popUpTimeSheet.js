

//====================================START====================================
// POP UP DIALOG
//confirmation pop up
c1.documentReady(function () {
  

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
})        // POP UP DIALOG
            //====================================END======================================
