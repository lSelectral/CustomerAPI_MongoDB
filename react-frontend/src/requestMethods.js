import axios from "axios";
import {sortList, renumberList} from './utility/tableUtility'

const request_url_client = /*process.env.REACT_APP_API_URL +*/ 'api/customer';

const asyncPromiseBuilder = async (promise, onSuccessfull = null, setRowData = null) => {
    try{
        const response = await promise;
        if (onSuccessfull !== null){
            onSuccessfull();
        }

        if (setRowData !== null){
            let sortedData = sortList(response.data, "rowId") // Sort the row id list which is not ordered in mongoDB
            for (let i = 0; i < sortedData.length; i++) { // assign proper id in clear order
                sortedData[i]["rowId"] = i+1;
            }
            setRowData(sortedData);
            console.log(sortedData);
        }
    } catch (err){
        console.log(err);
        return [{}];
    }
}

export const GET_CUSTOMERS = (onSuccessfull, setRowData) => 
    asyncPromiseBuilder( axios.get(request_url_client), onSuccessfull, setRowData);

export const GET_CUSTOMER_BY_ROW_ID = (id, onSuccessfull = null) => {
    asyncPromiseBuilder(axios.get(request_url_client + '/table/' + id), onSuccessfull);
}

export const GET_CUSTOMER_COUNT = () => 
    asyncPromiseBuilder(axios.get(request_url_client + '/count'));

export const GET_CUSTOMER_BY_ID = (id) => 
    asyncPromiseBuilder(axios.get(request_url_client + '/' + id));

export const ADD_CUSTOMER = (customerData, onSuccessfull) => 
    asyncPromiseBuilder(axios.post(request_url_client, customerData), onSuccessfull);

export const UPDATE_CUSTOMER = (customer, onSuccessfull) => 
    asyncPromiseBuilder(axios.put(request_url_client, customer), onSuccessfull);

export const DELETE_CUSTOMER = (id, onSuccessfull) => 
    asyncPromiseBuilder(axios.delete(request_url_client + "?id=" + id), onSuccessfull);