import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';

import validate from './validate'

import './reform.sass'

const inputField = props => {

  console.log('renderField props', props);
//<input type={props.type} placeholder={props.placeholder} {...props.input} />
// {props.meta.touched && props.meta.error && <span>{props.meta.error}</span>}
  return (
    <div>
        <TextField
          type={props.type}
          floatingLabelText={props.placeholder}
          {...props.input}
          errorText={props.meta.touched && props.meta.error && props.meta.error} />
    </div>
  );

}

class ImmutableForm extends React.Component {

  mySubmit(values) {
    // ev.preventDefault();
    console.log('values', values);
    let un = values.get('username');
    console.log('username', un);
    // console.log('arguments', arguments);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid, values, submit } = this.props;
    return (
      <div className={'paperForm ' + (!pristine && invalid ? 'paperFormInvalid' : '')}>
        <form onSubmit={handleSubmit(this.mySubmit)}>
          <Field name="username" type="text" component={inputField} placeholder="Username"/>
          <Field name="email" type="email" component={inputField} placeholder="Email"/>
          <Field name="age" type="number" component={inputField} placeholder="Age"/>
          <div>
            <RaisedButton label="Submit" primary={true} disabled={submitting || invalid } onClick={submit} />
            <RaisedButton label="Clear Values" default={true} disabled={pristine || submitting} onClick={reset} style={{marginLeft: '10px'}} />
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'myReForm',  // a unique identifier for this form
  validate
})(ImmutableForm)
