import React from 'react';

const fetchApi = (url,body,fetchData)=> {

    return fetch(url, {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: body
                }).then(res => res.json()).then(data=>data);

}
module.exports = fetchApi;