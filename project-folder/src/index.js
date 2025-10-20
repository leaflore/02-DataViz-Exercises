import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/leaflore/ae12e6178a767dc2d02f7a81ccd5cd4e/raw/BK-cssNamedColors.csv';


const width =  960;
const height = 500;

const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(csvUrl).then(setData);
    }, []);

    if (!data) {
        return <pre>Loading...</pre>
    }

    console.log(data[0]);

    return data.map(d => <div style={{backgroundColor : d.color}}></div>);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

//export default App;