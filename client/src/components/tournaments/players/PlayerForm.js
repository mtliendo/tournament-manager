import React from 'react';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';

class PlayerForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues, this.props.editPosition);
  }

  renderError({error, touched}) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div content="header">
            {error}
          </div>
        </div>
      );
    }
  }

  validate = (values) => {
    const errors = {};
  
    if (!values.playerFirstName){
      errors.playerFirstName = 'You must enter a first name';
    }
  
    if (!values.playerLastName) {
      errors.playerLastName = 'You must enter a last name';
    }

    if (!values.uscfId) {
      errors.uscfId = 'You must enter a USCF ID';
    }

    if (!values.uscfRating) {
      errors.uscfRating = 'You must enter a USCF rating';
    }

    return errors; 
  }

  renderNameField = () => {
    return (
      <div>
        <label>Player Name</label>
        <div className="two fields">
          <div className="field">
            <Field name="playerFirstName">
                {({input, meta}) => (
                  <div>
                    <input {...input} type="text" placeholder="First Name" />
                    {this.renderError(meta)}
                  </div>
                )}
            </Field>
          </div>
          <div className="field">
            <Field name="playerLastName">
                {({input, meta}) => (
                  <div>
                    <input {...input} type="text" placeholder="Last Name" />
                    {this.renderError(meta)}
                  </div>
                )}
            </Field>
          </div>
        </div>
      </div>
    )
  }

  renderNumberField = (name, label, placeholder, maxLength) => {
    return (
      <div>
        <Field name={name}>
            {({input, meta}) => (
              <div>
                <label>{label}</label>
                <input {...input} type="text" placeholder={placeholder} maxLength={maxLength} />
                {this.renderError(meta)}
              </div>
            )}
        </Field>
      </div>
    )
  }

  renderButtons = () => {
    return (
      <div>
        <button type="submit" className="ui primary button">Submit</button>
        <Link to={`/players/manage/${this.props.id}`} className="ui button">Cancel</Link>
      </div>
    );
  }

  renderInput() {
    return (
      <div className="ui form error">
        <Form
          onSubmit={ this.onSubmit }
          initialValues={ this.props.initialValues }
          validate={ this.validate }
          render={({ handleSubmit })=> (
            <form onSubmit={handleSubmit} className="ui form">
              {this.renderNameField("playerName", "Player Name", "Player Name")}
              {this.renderNumberField("uscfId", "USCF ID", "", 8)}
              {this.renderNumberField("uscfRating", "USCF Rating", "", 4)}
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
    )
  }
}

export default PlayerForm;