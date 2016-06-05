import React from 'react';
import moment from 'moment';
import SimilarDoctors from './similarDoctors';

class Doctor extends React.Component {

    goHome(e) {
        this.props.setView('list', null);
    }

    render() {

        let dr = this.props.doctor;
        let joinDate = moment(dr.date_added).format('LL');

        return (
            <div className="row">
                <div className="doctor col-md-8">
                    <h2>Dr. {dr.first_name} {dr.last_name}</h2>
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Area:</strong> {dr.area}</li>
                        <li className="list-group-item"><strong>Specialty:</strong> {dr.specialty}</li>
                        <li className="list-group-item"><strong>Gender:</strong> {dr.gender}</li>
                        <li className="list-group-item"><strong>email:</strong> {dr.email}</li>
                        <li className="list-group-item"><strong>Rating:</strong> {this.props.starRating(dr.review_score)}</li>
                        <li className="list-group-item"><strong>Member Since:</strong> {joinDate}</li>
                        <li className="list-group-item"><strong>Bio:</strong> {dr.bio}</li>
                    </ul>
                    <div><button className="btn btn-primary btn-block" onClick={this.goHome.bind(this)}>Go Back to Doctor List</button></div>
                </div>
                <div className="col-md-4">
                    <h2>You might also like</h2>
                    <SimilarDoctors {...this.props} />
                </div>
            </div>
        )
    }
}

export default Doctor;