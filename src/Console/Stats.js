import React from 'react';
import _ from 'lodash';

import './Stats.scss';

import Graph from './Graph';


const getFromStatsByYear = (stats, year, severity) => {
    let yearRecord = _.find(stats, {accident_year: year, involved_injury_severity: severity.toString()});
    if (_.isUndefined(yearRecord)) {
        return 0;
    }
    return parseInt(yearRecord.injured_count);
};

let severityStatsByYear = function (stats, severity, name) {
    return {
        name,
        data: [
            getFromStatsByYear(stats, '2013', severity),
            getFromStatsByYear(stats, '2014', severity),
            getFromStatsByYear(stats, '2015', severity),
            getFromStatsByYear(stats, '2016', severity),
            getFromStatsByYear(stats, '2017', severity),
            getFromStatsByYear(stats, '2018', severity)
        ]
    };
};

const getLineOptions = (stats) => {

    let series = [
        severityStatsByYear(stats, 1, 'פצועים קל'),
        severityStatsByYear(stats, 2, 'פצועים קשה'),
        severityStatsByYear(stats, 3, 'הרוגים')
    ];

    return {
        chart: {
            height: 250,
            type: 'line'
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        tooltip: { enabled: false },
        series,
        xAxis: {
            categories: ['2013', '2014', '2015', '2016', '2017', '2018'],
        },
        yAxis: {
            title: '',
            max: Math.max(_(series).map('data').flattenDeep().max(), 10)
        },
        plotOptions: {
            series: {
                enableMouseTracking: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
    };
};

const getColumnOptions = (stats) => {

    let series = [{
        name: 'פצועים קל',
        data: [1, 2, 3, 4, 1, 1, 6, 4, 1, 0, 0, 2]

    }, {
        name: 'פצועים קשה',
        data: [2, 2, 1, 1, 1, 1, 6, 4, 1, 3, 3, 2]

    }, {
        name: 'הרוגים',
        data: [1, 2, 3, 4, 3, 1, 1, 2, 5, 2, 0, 2]

    }];

    return {
        chart: {
            height: 250,
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        tooltip: { enabled: false },
        series,
        xAxis: {
            categories: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        },
        yAxis: {
            title: '',
            max: Math.max(_(series).map('data').flattenDeep().max(), 10)
        },
        plotOptions: {
            series: {
                enableMouseTracking: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
    };
};

const getPieOptions = (stats) => {

    let series = [{
        colorByPoint: true,
        data: [{
            name: 'גברים',
            y: 61.41,
        }, {
            name: 'נשים',
            y: 11.84
        }],
        dataLabels: {
            connectorWidth: 0,
            connectorPadding: -10,
            formatter: function () {
                return `${this.point.y}%`;
            },
            distance: 15,
            style: {
                fontSize: '12px',
                fontWeight: 'normal'
            },
        }
    }];

    return {
        chart: {
            height: 250,
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        tooltip: { enabled: false },
        series,
        plotOptions: {
            series: {
                enableMouseTracking: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            pie: {
                borderWidth: 0,
                borderColor: null,
                showInLegend: true
            }
        },
    };
};


function Stats(props) {
    let lineOptions = getLineOptions(props.school);
    let columnOptions = getColumnOptions(props.school);
    let pieOptions = getPieOptions(props.school);
    return (
        <div className="stats">
            <div className="title">{props.title}</div>
            <div className="sub-title">נפגעים לפי שנה</div>
            <Graph options={lineOptions}/>
            <div className="sub-title">נפגעים לפי חודש</div>
            <Graph options={columnOptions}/>
            <div className="sub-title">נפגעים לפי מין</div>
            <Graph options={pieOptions}/>
        </div>
    );
}

export default Stats;
