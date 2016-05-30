import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
// import axios from 'axios';

// axios('../data/db.json').then(resp => {
//     var d = resp.data;
//     var area = [
//         'San Francisco',
//         'Los Angeles',
//         'New York',
//         'Houston',
//         'Chicago',
//         'Seattle',
//         'Denver'
//     ];
//     var newData = d.map(item => {
//         item.area = area[Math.floor(Math.random()*area.length)];
//         return item;
//     });
//     document.write(JSON.stringify(newData));
// });

ReactDOM.render(<App />, document.getElementById('app'));



