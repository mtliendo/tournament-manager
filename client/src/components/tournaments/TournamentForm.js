import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class TournamentForm extends React.Component {
  onSubmit = values => {
    this.props.onSubmit(values);
  }

  componentDidUpdate() {
    console.log('update');
  }

  renderError = ({error, touched}) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header"> 
            {error}
          </div>
        </div>
      );
    }
  }
  
  validate = (values) => {
    const errors = {};
  
    if (!values.tournamentName){
      errors.tournamentName = 'You must enter a tournament name';
    }  
    if (!values.tournamentDate) {
      errors.tournamentDate = 'You must enter a tournament date';
    }
    if (!values.pairingMethod) {
      errors.pairingMethod = 'You must choose a pairing method';
    }
    if (!values.numRounds && (values.pairingMethod !== 'roundRobin')) {
      errors.numRounds = 'You must enter a number of rounds';
    }
    return errors;    
  }

  renderTextField = (name, label, placeholder) => {
    return (
      <div>
        <Field name={name}>
            {({input, meta}) => (
              <div>
                <label>{label}</label>
                <input {...input} type="text" placeholder={placeholder} />
                {this.renderError(meta)}
              </div>
            )}
        </Field>
      </div>
    )
  }
/* THIS HAS BEEN REFACTORED OUT OF USEFULNESS I THINK
  renderName = () => {
    return (
      <div>
        <Field name="tournamentName">
            {({input, meta}) => (
              <div>
                <label>Tournament Name</label>
                <input {...input} type="text" placerholder="Tournament Name" />
                {this.renderError(meta)}
              </div>
            )}
        </Field>
      </div>
    )
  }

  renderDate = () => {
    return(
      <div>
        <Field name="tournamentDate">
          {({input, meta}) => (
            <div>
              <label>Tournament Date</label>
              <input {...input} type="text" placerholder="Tournament Date" />
              {this.renderError(meta)}
            </div>
          )}
        </Field>
      </div>
    );
  }
*/
  renderPairingMethod = (values) => {
    return (
      <div>
        <label>Pairing Method</label>
        <div>
          <label>
            <Field
              name="pairingMethod"
              component="input"
              type="radio" 
              value="swiss" />{' '}
              Swiss 
          </label>
          <label>
          <Field
              name="pairingMethod"
              component="input"
              type="radio" 
              value="adjacent" />{' '}
              Adjacent 
          </label>
          <label>
          <Field
              name="pairingMethod"
              component="input"
              type="radio" 
              value="roundRobin" />{' '}
              Round Robin 
          </label>
        </div>
        {(values.pairingMethod !== 'roundRobin') && 
        (this.renderTextField('numRounds', 'Number of Rounds', 'Number of Rounds'))}
      </div>
    )
  }

  renderButtons = () => {
    return (
      <div>
        <button type="submit" className="ui primary button">Submit</button>
        <Link to="/" className="ui button">Cancel</Link>
      </div>
    );
  }

  renderInput = () => {
    return (
      <div className="ui form error">
        <Form
          onSubmit={this.onSubmit}
          initialValues={this.props.initialValues}
          validate={this.validate}
          render={({ handleSubmit, values })=> (
            <form onSubmit={handleSubmit}>
              {this.renderTextField('tournamentName', 'Tournament Name', 'Tournament Name')}
              {this.renderTextField('tournamentDate', 'TournamentDate', 'Tournament Date')}
              {this.renderPairingMethod(values)}
              {this.renderButtons()}
            </form>
          )}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderInput()} 
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps)(TournamentForm);