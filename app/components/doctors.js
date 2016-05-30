import React from 'react';

class Doctors extends React.Component {
    
    linkDoctor(e) {
        this.props.setView('detail',
            parseInt(e.currentTarget.getAttribute('data-id')), 10);
    }

    render() {
        let doctorList = this.props.doctors.map((dr, i) => {
            return (
                <li className="list-group-item" key={i} data-id={dr.id} onClick={this.linkDoctor.bind(this)}>
                    Dr. {dr.first_name} {dr.last_name}
                    <span className="area label label-default">{dr.area}</span>
                    <span className="review-score label label-danger pull-right">{dr.review_score} stars</span>
                    <span className="specialty label label-primary pull-right">{dr.specialty}</span>
                </li>
            )
        });

        return (
            <div>
                <h2 className="text-center">Pick A Doc</h2>
                <ul className="doctors-list list-group">
                    {doctorList}
                </ul>
            </div>
        )
    }
    
}

export default Doctors;