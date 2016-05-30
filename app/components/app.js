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
            view: 'list'
        };
    }
    getDrs() {
        axios.get('http://localhost:3000/doctors?_limit=50')
            .then((resp) => {
                this.setState({doctors: resp.data});
               // console.log(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getDr(doctorID) {
        return _.find(this.state.doctors, dr => {
            return dr.id === doctorID;
        }) || null;
    }

    getSimilarDrs(currentDoc) {

        let ranked = [];

        // rank all doctors against current doctor according to relevancy
        this.state.doctors.forEach(dr =>  {
            if (dr.id === currentDoc.id) {
            } else if (dr.area.toLowerCase() === currentDoc.area.toLowerCase() && dr.specialty.toLowerCase() === currentDoc.specialty.toLowerCase()) {
                dr.score = 1;
                ranked.push(dr);
            } else if (dr.area.toLowerCase() === currentDoc.area.toLowerCase()) {
                dr.score = 2;
                ranked.push(dr);
            } else if (dr.specialty.toLowerCase() === currentDoc.specialty.toLowerCase()) {
                dr.score = 3;
                ranked.push(dr);
            } else {
                dr.score = 4;
                ranked.push(dr);
            }
        });

        // seperate out rank 1 (matching area AND specialty), then sort by review_score
        let firstSort = ranked.filter(item => item.score === 1);
        firstSort = firstSort.sort((a, b) => {
            if ( a.review_score < b.review_score ) {
                return -1;
            }
            if ( a.review_score > b.review_score ) {
                return 1;
            }
            return 0;
        });

        // seperate out rank 2 (matching area but not specialty), then sort by review_score
        let secondSort = ranked.filter(item => item.score === 2);
        secondSort = secondSort.sort((a, b) => {
            if ( a.review_score < b.review_score ) {
                return -1;
            }
            if ( a.review_score > b.review_score ) {
                return 1;
            }
            return 0;
        });

        // seperate out rank 3 (matching specialty but not area), then sort by review_score
        let thirdSort = ranked.filter(item => item.score > 2);
        thirdSort = thirdSort.sort((a, b) => {
                if ( a.review_score < b.review_score ) {
                    return -1;
                }
                if ( a.review_score > b.review_score ) {
                    return 1;
                }
                return 0;
            });

        return firstSort
            .concat(secondSort, thirdSort)
            .slice(0, 6) || [];
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

    componentWillUnmount() {

    }

    render() {

        // quick and dirty routing
        let view;

        if (this.state.view === 'list') {
            view = <Doctors setView={this.setView.bind(this)} {...this.state} />
        } else if (this.state.view === 'detail') {
            view = <Doctor setView={this.setView.bind(this)} {...this.state} />
        }

        return (
            <div>{view}</div>
        )
    }
}

export default App;