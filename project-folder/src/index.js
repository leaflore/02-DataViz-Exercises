import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/leaflore/ae12e6178a767dc2d02f7a81ccd5cd4e/raw/e60193f4973fa9e6ab6e69cc53b16a9c41e36f6f/BK-cssNamedColors.csv';
/*Pasted the csv raw file. You still need to use rollup -c or look at syntax
Then test file.
time at pause: 4:32*/

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

    //d[] is another way accessing a property when you can not use the "." notation.
    return data.map(d => <div style={{backgroundColor: d['RGB hex value'], width: '960px', height: '4px'}}></div>);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

//export default App;