import React, { useState } from 'react';
import api from '../services/api';
import { Document } from "react-pdf";


export default function Download(){
    const [urlFile, setUrlFile] = useState('');

    async function handleDownload(e){
        e.preventDefault();

        api.get('/download', { responseType: 'blob'})
            .then(function(response) {
                const blob = new Blob([response.data], {
                    type: 'application/pdf',
                  });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch(function(error) {
                    console.log(error)
            });
    }

    async function handleVisualizar(e){
        e.preventDefault();

        api.get('/download', { responseType: 'blob'})
            .then(function(response) {
                const blob = new Blob([response.data], {
                    type: 'application/pdf',
                  });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
                /* window.open(url); */
            })
            .catch(function(error) {
                    console.log(error)
            });
    }

    return (
        <div>
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleVisualizar}>Visualizar</button>


        </div>  
    );
}