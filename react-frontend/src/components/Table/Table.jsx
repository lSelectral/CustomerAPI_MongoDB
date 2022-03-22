import { DataGrid } from '@mui/x-data-grid';
import { useCallback } from 'react';
import './Table.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { update } from '../../redux/userSlice';

import { columns } from '../../utility/tableColumnData'; // Column data
import { GET_CUSTOMERS, UPDATE_CUSTOMER } from '../../requestMethods';
import {
handleAccept,
handleRowEditCommit,
handleSnackbarOpen,
handleSnackbarClose
} from '../../utility/tableUtility';

const Table = () => {
    const [loading, setLoading] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [snackbarState, setSnackbarState] = useState({"state": false, "message": "default"});
    const dispatch = useDispatch();
    let formData = useSelector((state) => state.data);
    let columnsToHide = useSelector((state) => state.columnsToHide);

    useEffect(() => {
        setLoading(true);
        GET_CUSTOMERS(() => {setLoading(false);}, setRowData);
    }, [formData]);

    const handleCellEditCommit = useCallback((params) => {
        handleRowEditCommit(rowData, params, () => dispatch(update()));
    })

    return (
        <div className='table'>
            {loading? 
            <div className="loading-container">
                <CircularProgress/>
                <h3>Yükleniyor...</h3>
            </div>:
            <div className='dataGrid'>
                <DataGrid
                getRowId={(row) => row.Id}
                rows={rowData}
                columns={columns(rowData, columnsToHide, handleAccept, () => {dispatch(update())})}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                onCellEditCommit={handleCellEditCommit}
                />

                <Snackbar
                open={snackbarState['state']}
                autoHideDuration={2000}
                onClose={handleSnackbarClose(setSnackbarState)}
                message={snackbarState['message']}
                action={<button onClick={handleSnackbarClose(setSnackbarState)}>Undo</button>}
                />
            </div>}
        </div>
    );
}

export default Table