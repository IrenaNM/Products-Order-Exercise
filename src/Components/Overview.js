import React from 'react';
import Categories from '../Data/categories.js'
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

const Overview = (props) => {
    const labels = []
    const entriesData = []

    if (props.entriesData) {

        Categories.forEach(category => {
            labels.push(category.name);

            const totalAmount = props.entriesData.reduce((total, entry) => {
                if (entry.category === category.name) {
                    return total + parseInt(entry.amount)
                } else {
                    return total
                }
            }, 0)
            entriesData.push(totalAmount);
        })
    }

    const chartData = {
        labels: labels || '',
        datasets: [
            {
                label: 'Amount',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: entriesData || []
            }
        ]
    };
    return (<div>
        <br />
        <br />
        {props.entriesData &&
            (<Bar
                data={chartData}
                width={100}
                height={50}
            />)}
        {!props.entriesData && (<h2>
            There is no entries to display, please go to
            <Link to='/entries'> entries</Link> page
        </h2>)}
    </div>)
}

export default Overview;
