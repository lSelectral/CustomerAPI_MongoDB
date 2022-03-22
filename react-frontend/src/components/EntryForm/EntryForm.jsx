import './EntryForm.scss'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update, hide } from '../../redux/userSlice';
import { ADD_CUSTOMER } from '../../requestMethods'
import { CloudDownloadOutlined, RedoOutlined, RefreshOutlined, UndoOutlined } from '@material-ui/icons';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';

/* Selector with checkbox from MUI */
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
/* Selector with checkbox from MUI */

import {
    handleSnackbarOpen,
    handleSnackbarClose
} from '../../utility/tableUtility';

const EntryForm = () => {
    const dispatch = useDispatch();
    let selectedColumns = useSelector((state) => state.columnsToHide);
    const [columns, setColumns] = useState([]);
    const [snackbarState, setSnackbarState] = useState({"state": false, "message": "default"});

    const defaultColumns = [
        "ID",
        "Geldiği Saat",
        "İsim",
        "Telefon Numarası",
        "Beklediği Yer",
        "Masa Numarası",
        "Not",
        "Düzenle"
    ];


    const [data, setData] = useState({
        "name": "Recep",
        "reservedTable": "",
        "personCount": "1",
        "phone": "",
        "location": "",
        "note": ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.name.value = ""; // Clear data from input element
        e.target.personCount.value = 1;

        handleSnackbarOpen(`${data.name} müşteri olarak eklendi`, setSnackbarState);

        if (data.personCount === null || data.personCount === undefined){
            data["personCount"] = 1;
        }
        data["name"] = `${data["name"]} (${data["personCount"]})`
        let tempData = data;
        tempData["DateTime"] = new Date().toLocaleString();
        delete tempData.personCount;
        setData(tempData);

        ADD_CUSTOMER(tempData, () => { 
            dispatch(update()); 
        });
    }

    const refreshTable = () => {
        console.log("Dispatch sent for refresh");
        dispatch(update());
    }

    const handleColumnSelectionChange = (e) => {
        dispatch(hide(e.target.value));
        // setColumns(e.target.value);
    }

    return (
        <div className="entryForm">
        
            <div className='historyContainer'>
                <Tooltip arrow
                title='Tablodaki verileri bir önceki haline geri getirir'>
                    <div className='historyBox'>
                        <UndoOutlined className='history icon'/>
                        <p className='history text'>GERİ</p>
                    </div>
                </Tooltip>

                <Tooltip arrow
                title='Tablodaki verileri sunucu tarafından yeniler'>
                <div className='historyBox' onClick={refreshTable}>
                    <p className='history text'>YENİLE</p>
                    <RefreshOutlined className='history icon'/>
                </div>
                </Tooltip>
            </div>

            <div className='historyContainer'>
                <Tooltip arrow
                title='Seçilen sütunları tabloda gizler'>
                <div className='historyBox'>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="label-id">Gizlenecek Sütunlar</InputLabel>
                    <Select
                    labelId="label-id"
                    id="column-selector"
                    multiple
                    value={selectedColumns}
                    onChange={handleColumnSelectionChange}
                    input={<OutlinedInput label="Gizlenecek Sütunlar"/>}
                    renderValue={
                        (selected) => {
                            let val = "";
                            selected.forEach(e => {
                                val += e + ", ";
                            });
                            return val;
                        }
                    }
                    >
                    {defaultColumns.map((column) => (
                        <MenuItem key={column} value={column}>
                        <Checkbox checked={selectedColumns.indexOf(column) > -1} />
                        <ListItemText primary={column} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </div>
                </Tooltip>
            </div>

            <div className="update">
                <span className="updateTitle">MÜŞTERİ BİLGİLERİ</span>
                    <form onSubmit={handleSubmit} className="updateForm">
                        <div className="updateLeft">
                            <div className="updateItem">
                                <label>İsim</label>
                                <input type="text" 
                                    name='name'
                                    className="userInput"
                                    placeholder='Recep'
                                    required
                                    onChange={(e) => setData(Object.assign({},
                                        data, 
                                        {"name": e.target.value}))}/>
                            </div>
                            <div className="updateItem">
                                <label>Masa Numarası</label>
                                <input type="text"
                                name='reservedTable' 
                                className="userInput"
                                placeholder='Masa Numarası'
                                onChange={(e) => setData(Object.assign({},
                                    data, 
                                    {"reservedTable": e.target.value}))}/>
                            </div>
                            <div className="updateItem">
                                <label>Kişi Sayısı</label>
                                <input type="text"
                                name='personCount' 
                                className="userInput"
                                placeholder='1'
                                required defaultValue={1}
                                onChange= {(e) => setData(Object.assign({},
                                    data, 
                                    {"personCount": e.target.value}))}/>
                            </div>
                            <div className="updateItem">
                                <label htmlFor='phone'>Telefon Numarası</label>
                                <input type="tel" name="phone" id="phone"
                                pattern="[0-9]{4} [0-9]{3} [0-9]{2} [0-9]{2}"
                                className="userInput"
                                placeholder='0532 321 82 26'
                                maxLength={14}
                                onChange={(e) => setData(Object.assign({},
                                    data, 
                                    {"phone": e.target.value}))}/>
                            </div>
                            <div className="updateItem">
                                <label>Beklediği Yer</label>
                                <select name="location"
                                value={"İçeride"}
                                className="userInput"
                                onChange={(e) => setData(Object.assign({},
                                    data, 
                                    {"location": e.target.value}))}>
                                    <option value="İçeride">İÇERİDE</option>
                                    <option value="Dışarıda">DIŞARIDA</option>
                                </select>
                            </div>
                            <div className="updateItem">
                                <label htmlFor="note"></label>
                                <textarea style={{resize:'none'}} name="note" rows="5"
                                placeholder='Buraya not yazabilirsiniz...'
                                onChange={(e) => setData(Object.assign({},
                                    data, 
                                    {"note": e.target.value}))}/>
                            </div>
                            <button className="updateButton"
                                type='submit'>
                                Ekle
                            </button>
                    </div>
                </form>
            </div>
            <Snackbar
                open={snackbarState['state']}
                autoHideDuration={2000}
                onClose={handleSnackbarClose(setSnackbarState)}
                message={snackbarState['message']}
            />
        </div>
    )
}

export default EntryForm