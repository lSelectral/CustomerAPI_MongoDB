import http from 'k6/http';

const API_ENDPOINT = 'https://localhost:7068/api/Customer'

export const postRequest = () => {
    const url = API_ENDPOINT;
    const payload = JSON.stringify({
        "name": "Recep (3)",
        "dateTime": "2022-03-06 17:28",
        "reservedTable": "15",
        "location": "Dışarıda",
        "phone": "",
        "note": "15 TL VERDİ"
    });
  
    const params = {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    };
  
    http.post(url, payload, params);
}

export const getRequest = () => {
    http.get(API_ENDPOINT);
}