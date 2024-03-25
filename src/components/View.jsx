import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from '../styles/createDiary.module.css';

const View = () => {
    const location = useLocation();
    const date = location.state.date;
    const description = location.state.description;
    const navigate = useNavigate();

    useEffect(() => {
        const textarea = document.querySelector(`.${style.in}`);
        textarea.style.height = 'auto'; // Reset height to auto to recalculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to scrollHeight
    }, [description]);

    return (
        <div className={style.login}>
            <table className={style.form}>
                <tbody>
                    <tr>
                        <td>Data:</td>
                        <td>
                          <input type="text" value={date} readOnly />
                        </td>
                    </tr>
                    <tr><td>Description:</td></tr>
                    <tr> 
                      <th colSpan={2}> 
                        <textarea className={style.in} value={description} onChange={(e) => {}} readOnly />
                      </th>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                          <button onClick={() => navigate('/userHome')}>Menu</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default View;
