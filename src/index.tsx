import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';
import { PrivilegeSelector } from './components/privilege-selector/';
import { data } from './data';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import './index.css';

function App() {
    const [value, setValue] = useState<Array<string>>([]);
    const handleChange = (value) => {
        setValue(value);
    };
    return (
        <div className='main'>
            <Input.TextArea
                disabled
                value={value}
                style={{ marginBottom: 20 }}
                placeholder='请从下面的权限表中选择'
            />
            <PrivilegeSelector options={data} value={value} onChange={handleChange} />
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
