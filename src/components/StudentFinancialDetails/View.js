/* Component Name: StudentFinancialDetails
 * =======================================
 * This component will render a button which when clicked adds a row to enter the cost details of
 * the items being purchased by the student
 * ===============================================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Button, Col, ControlLabel, FormControl, FormGroup, Row } from 'react-bootstrap';

/* Import Constants and Enums
 * =======================================
 */
import { Constants } from '../../enums/index';

export default class StudentFinancialDetails extends React.Component {

  /* Initialize the constructor */
  constructor(props) {
    super(props);

    /* Initial state of the component */
    this.state = {
      studentFinancialDetails: {
        costs: []
      }
    }
    this.state.studentFinancialDetails = {
      costs:[...this.state.studentFinancialDetails,...props.value]
    }
  }

  componentWillReceiveProps = (nextProps)=>{
    let {studentFinancialDetails} = this.state;
    studentFinancialDetails = {
      costs:[...studentFinancialDetails,...nextProps.value]
    };
    if(nextProps.value&&nextProps.value.costs){
      studentFinancialDetails = {
        costs:[...studentFinancialDetails,...nextProps.value.costs]
      };
    }

    this.setState({studentFinancialDetails:studentFinancialDetails});
  }

  /* Add a new row to enter the cost for the student */
  _handleCostRow() {
    this.props.handleCostRow.call(this, this.state.studentFinancialDetails);
  }

  /* Render the component */
  render() {

    /* Initialize a key which is used to update the state of parent component */
    let key = 'studentFinancialDetails';

    /* A single cost row which will have items and a cost field */
    const singleCostRow = (costRow, index) => {
      return (
          <Row className="cost" key={index}>
            <Col md={4}>
              <FormGroup controlId="item">
                <ControlLabel>Items</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={costRow.item}
                  onChange={(e) => this.props.handleItemChange(this.state, index, key, e)}>
                  {
                    Constants.purchasingItems.map((item, index) =>
                      <option value={item.cost} key={index}>{item.name}</option>
                    )
                  }
                </FormControl>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup controlId="cost">
                <ControlLabel>Cost ($)</ControlLabel>
                <FormControl
                  type="text"
                  disabled
                  value={costRow.itemCost}
                placeholder={Constants.placeholders.costOfItem} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup controlId="dateOfPurchase">
                <ControlLabel>Date of Purchase</ControlLabel>
                <div>{costRow.date || (new Date()+'')}</div>
              </FormGroup>
            </Col>
          </Row>
        )};

    return (
      <Col md={12}>
        <div className="box box-danger">
          <div className="box-header with-border">
            <h3 className="box-title">Financial Information <small>Atleast one cost should be added</small></h3>
          </div>
          <div className="box-body">
            <Button className="btn btn-flat bg-purple"
              onClick={this._handleCostRow.bind(this)}>
                Add a Cost ($)
            </Button>
            {
              this.state.studentFinancialDetails.costs.map((costRow, index) => {
                return singleCostRow(costRow, index)
              })
            }
          </div>
        </div>
      </Col>
    );
  }
}
