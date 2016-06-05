import React from 'react';

class SimilarDoctors extends React.Component {
    linkDoctor(e) {
        this.props.setView('detail',
            parseInt(e.currentTarget.getAttribute('data-id')), 10);
    }

    render() {

        let doctorList = this.props.similarDoctors.map((dr, i) => {
            return (
                <li className="well" key={i} data-id={dr.id} onClick={this.linkDoctor.bind(this)}>
                    <ul className="list-group">
                        <li className="list-group-item">Dr. {dr.first_name} {dr.last_name}</li>
                        <li className="list-group-item">Area: {dr.area}</li>
                        <li className="list-group-item">Specialty: {dr.specialty}</li>
                        <li className="list-group-item">Rating: {this.props.starRating(dr.review_score)}</li>
                    </ul>
                    <button className="view-profile btn btn-block btn-danger">view profile</button>
                </li>
            )
        });

        return (
            <ul className="similar-doctors">
                {doctorList}
            </ul>
        )
    }
}

export default SimilarDoctors;