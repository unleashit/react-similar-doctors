import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Doctors from './doctors';
import Doctor from './doctor';

require('../css/style.css');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            doctor: {},
            similarDoctors: [],
            view: 'list',
            network: true
        };
    }

    getDrs() {
        axios.get('http://localhost:3000/doctors?_limit=100')
            .then((resp) => {
                this.setState({
                    doctors: resp.data,
                    network: true
                });
            })
            .catch((err) => {
                this.setState({network: false});
                console.error(err);
            });
    }

    getDr(doctorID) {
        return _.find(this.state.doctors, dr => {
            return dr.id === doctorID;
        }) || null;
    }

    getSimilarDrs(currentDoc) {
        let groupOne = [], groupTwo = [], groupThree = [], groupFour = [];

        // rank all doctors against current doctor according to relevancy
        // 1 = same area AND specialty, 2 = same area only, 3 = different area, same specialty, 4 = all others
        this.state.doctors.forEach(dr =>  {
            if (dr.id === currentDoc.id) {
                // do nothing, to skip the current doctor
            } else if (dr.area.toLowerCase() === currentDoc.area.toLowerCase() && dr.specialty.toLowerCase() === currentDoc.specialty.toLowerCase()) {
                groupOne.push(dr);
            } else if (dr.area.toLowerCase() === currentDoc.area.toLowerCase()) {
                groupTwo.push(dr);
            } else if (dr.specialty.toLowerCase() === currentDoc.specialty.toLowerCase()) {
                groupThree.push(dr);
            } else {
                groupFour.push(dr);
            }
        });

        // sort each group by review_score so within the group, better review score is better
        function sortByReviews(a, b) {
            if ( a.review_score < b.review_score ) {
                return 1;
            }
            if ( a.review_score > b.review_score ) {
                return -1;
            }
            return 0;
        }

        // sort rank 1 (matching area AND specialty) by review_score
        groupOne = groupOne.sort(sortByReviews);

        // sort rank 2 (matching area but not specialty) by review_score
        groupTwo = groupTwo.sort(sortByReviews);

        // sort rank 3 (matching specialty but not area) by review_score
        groupThree = groupThree.sort(sortByReviews);

        // sort rank 4 (everything else) by review_score
        groupFour = groupFour.sort(sortByReviews);

        //window.sorted = ['FIRST GROUP'].concat(groupOne, ['SECOND GROUP'], groupTwo, ['THIRD GROUP'], groupThree);

        // concatenate groups back together, set a limit
        return groupOne
            .concat(groupTwo, groupThree, groupFour)
            .slice(0, 5) || [];
    }

    starRating(rating) {
        let stars = [],
            i;

        // if rating is missing/incorrect, assume 5 stars
        rating = (typeof rating === 'number' && rating >=1 && rating <=5) ? rating : 5;

        for (i=0; i<rating; i++) {
            stars.push(<i className="fa fa-star" key={i}></i>);
        }

        return stars;
    }

    setView(view, id) {

        let currentDoc = this.getDr(id);

        this.setState({
            view: view,
            doctor: currentDoc,
            similarDoctors: currentDoc ? this.getSimilarDrs(currentDoc) : []
        });

        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.getDrs();
    }

    render() {

        // quick and dirty routing
        let view;

        if (!this.state.network) {
            view = <h2>Unable to connect to the database. Is the api and/or network available?</h2>

        } else if (this.state.view === 'list') {
            view = <Doctors setView={this.setView.bind(this)}
                        {...this.state} />

        } else if (this.state.view === 'detail') {
            view = <Doctor setView={this.setView.bind(this)}
                        starRating={this.starRating.bind(this)}
                        {...this.state} />
        }

        return (
            <div>{view}</div>
        )
    }
}

export default App;