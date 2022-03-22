import axios from 'axios';
import { DELETE_CUSTOMER, UPDATE_CUSTOMER } from '../requestMethods'

export const renumberList = (list) => {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      element["id"] = i+1;
    }
};

export const sortList = (list, sortBy) => {
    list.sort((a, b) => {
      return a[sortBy]-b[sortBy]
    });
    return list;
};

export const handleAccept = (id) => {
    console.log("Accept button pressed");
};

export const handleUndoEvent = (event) => {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'z'){
            event();
        }
    });
};

export const handleRedoEvent = (event) => {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'y'){
            event();
        }
    });
};

export const handleDelete = (id, onSuccessfull) => {
    DELETE_CUSTOMER(id, onSuccessfull);
}

export const moveRow = (id, direction, rowData, onSuccessfull) => {
    if ( direction === "up" & id !== 1){
        console.log("Moving to up");
        rowData[id-1]["rowId"] = id-1
        rowData[id-2]["rowId"] = id

        axios.all([
            UPDATE_CUSTOMER(rowData[id-1]),
            UPDATE_CUSTOMER(rowData[id-2])
        ]);
        onSuccessfull();
    } else if (direction === "down" & id !== rowData.length){
        console.log("Moving to down");
        rowData[id]["rowId"] = id
        rowData[id-1]["rowId"] = id+1

        axios.all([
            UPDATE_CUSTOMER(rowData[id]),
            UPDATE_CUSTOMER(rowData[id-1])
        ]);
        onSuccessfull();
    }
}

export const moveRowq = (id, direction, rowData) => {
    if ( direction === "up" & id !== 1){
        UPDATE_CUSTOMER()
        console.log("Moving to up");
    } else if (direction === "down" & id !== rowData.length){
        console.log("Moving to down");
    }
}

export const handleSnackbarOpen = (message, setSnackbarState) => {
    setSnackbarState({'state': true, 'message': message});
}

export const handleSnackbarClose = (setSnackbarState) => (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setSnackbarState({'state': false, 'message': 'Closing...'});
}

export const findElementById = (rowData, id) => {
    return rowData.find(e => e.Id === id);
}

export const handleRowEditCommit = (rowData, params, updateFunction) => {
    let element = rowData.find(e => e.Id === params.id);  
    if (element[params.field] === params.value){
        return;
    }          
    rowData[element.rowId-1][params.field] = params.value;
    UPDATE_CUSTOMER(element, () => updateFunction());
} 