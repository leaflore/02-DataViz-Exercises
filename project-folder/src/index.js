import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/leaflore/ae12e6178a767dc2d02f7a81ccd5cd4e/raw/BK-cssNamedColors.csv';


const width =  960;
const height = 500;

const App = () => {
    const [data, setData] = useState(null);

    d3.csv(csvUrl).then(data => {
        setData(data);
        // let message = '';
        // message = message + Math.round(d3.csvFormat(data).length / 10124) + 'kB\n';
        // message = message + data.length + 'rows\n';
        // message = message + data.columns.length + 'columns';

    })

    return <div>Data is : {data}</div>;
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

//export default App;