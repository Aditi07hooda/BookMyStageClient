"use client"
import React from 'react';
import CountUpContent from '../common/counter/CountUpContent';
const CounterItem = [
    {
        id: 1,
        number: 10,
        numberLetter: '',
        title: 'Performance Categories',
    },
    {
        id: 2,
        number: 5,
        numberLetter: '',
        title: 'Evaluation Parameters',
    },
    {
        id: 3,
        number: 4,
        numberLetter: '',
        title: 'Age Categories',
    },
    {
        id: 4,
        number: 3,
        numberLetter: '',
        title: 'Levels of Recognition',
    }
]

const AboutFactSection = () => {
    return (
        <section className="bd-counter__area-2 pb-70">
            <div className="counter-style-2">
                <div className="container">
                    <div className="row">
                    {CounterItem.map((item, num) => (
                        <div className="col-xl-3 col-lg-3 col-md-6" key={num}>
                            <div className="bd-counter__single-item mb-60">
                                <div className="bd-counter__content">
                                <span className="counter"><CountUpContent number={item.number} text={item.numberLetter} /></span>
                                    <h4>{item.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutFactSection;