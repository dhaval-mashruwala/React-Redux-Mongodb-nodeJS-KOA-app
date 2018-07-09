/* Page: Track Student Parents
 * ============================================================
 * This page will give the track of family details of a student
 * =============================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Col, Row } from 'react-bootstrap';

/* Import Components and Containers
 * =======================================
 */
import Header from '../../components/Header/Header';
import HamburgerMenu from '../../containers/HamburgerMenu';

/* Import Constants and Enums
 * =======================================
 */
import { Constants } from '../../enums/index';

export default class TrackStudentParents extends React.Component {

  /* Set the page title after the component mounts */
  componentDidMount() {
    document.title = Constants.documentTitles.trackStudentParents;
  }

  /* Remove the page title before the component mounts */
  componentWillUnMount() {
    document.title = Constants.documentTitles.empty;
  }

  render() {
    return (
      <div className="track-student-parents">
        <Header />
        <HamburgerMenu />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>Track Student Parents<small>Get parent details of a student</small></h1>
          </section>
          <section className="content">
            <Row>
              <Col md={12}>
                <div className="box box-warning">
                  <div className="box-header with-border">
                    <h3 className="box-title">Living with Parents</h3>
                  </div>
                  <div className="box-body table-responsive no-padding">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Student ID</th>
                          <th>Student Name</th>
                          <th>Parent</th>
                          <th>Parent`s Name</th>
                          <th>Email</th>
                          <th>Cell Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>104838060</td>
                          <td>Utsav Kumar</td>
                          <td>Father</td>
                          <td>Satish Kumar</td>
                          <td>satishk@gmail.com</td>
                          <td>519-965-5896</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="box-footer clearfix">
                    <span className="pull-right"><strong>Total Students: </strong>1</span>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="box box-primary">
                  <div className="box-header with-border">
                    <h3 className="box-title">Living Alone</h3>
                  </div>
                  <div className="box-body table-responsive no-padding">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Student ID</th>
                          <th>Student Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>104838059</td>
                          <td>Dhaval Mashruwala</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="box-footer clearfix">
                    <span className="pull-right"><strong>Total Students: </strong>1</span>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="box box-danger">
                  <div className="box-header with-border">
                    <h3 className="box-title">Student as Parent</h3>
                  </div>
                  <div className="box-body table-responsive no-padding">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Student ID</th>
                          <th>Student Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>104838058</td>
                          <td>Robin Marshall</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="box-footer clearfix">
                    <span className="pull-right"><strong>Total Students: </strong>1</span>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
        </div>
      </div>
    );
  }

}
