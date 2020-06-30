import React from 'react';
import WordsDataService from '../api/WordsDataService';
import { Formik, Form, Field, ErrorMessage, setFieldValue } from 'formik'; 

class CreateWord extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      wordData: {
        id: null,
        ownLangWordName: '',
        targetLangWordName: '',
        ownLangExSentence: '',
        targetLangExSentence: '',
        createdDate: new Date,
        image: null
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.awaitSetState = this.awaitSetState.bind(this)
  }

 /* componentWillMount(){
    // directly mutating the state. to be refined later 
    this.state.wordData.id = null; 
  }  */

  async awaitSetState(stateUpdate){
    await this.setState({wordData : stateUpdate})
  }

/*  getBase64(file){
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        console.log("Inside the onload:");
        console.log(reader.result);
        resolve(reader)
      };
      reader.onerror = function(error){
        console.log('Error: ', error);
        reject(error)
      }
    })
  } */

  /*async*/ onChange(e){
    const chosenFile = e.currentTarget.files[0];
    console.log("The value of chosenFile:");
    console.log(chosenFile);

    /*const convertedFile = await this.getBase64(chosenFile);
    console.log("The value of convertedFile: ");
    console.log(convertedFile);  */

    let tempWordData = this.state.wordData;
    tempWordData.image = chosenFile;  //convertedFile;
    this.awaitSetState(tempWordData);
    console.log("The value of this.state.wordData: ");
    console.log(this.state.wordData);
  }  

  onSubmit(values){
    let word = values;

    WordsDataService.createWord(word)
    .then(res => {
      console.log(res.data)
    })
    .catch(error => {
      console.log(error)
    })       
  }
  
  render(){
    let { id, ownLangWordName, 
      targetLangWordName, ownLangExSentence, 
      targetLangExSentence, createdDate, 
      image} 
      = this.state.wordData; 

    return(
      <div>
        <h2>Create Word</h2>
        <div>
          <Formik
            initialValues={{ id, ownLangWordName, 
              targetLangWordName, ownLangExSentence, 
              targetLangExSentence, createdDate, 
              image}}
            onSubmit={this.onSubmit}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>
                  <fieldset>
                    <label>Word (Target Language)</label>&nbsp;
                    <Field type="text" name="targetLangWordName"/>
                  </fieldset>
                  <fieldset>
                    <label>Word (Own Language)</label>&nbsp;
                    <Field type="text" name="ownLangWordName"/>
                  </fieldset>
                  <fieldset>
                    <label>Sentence (Target Language)</label>&nbsp;
                    <Field type="text" size="75" name="targetLangExSentence"/>
                  </fieldset>
                  <fieldset>
                    <label>Sentence (Own Language)</label>&nbsp;
                    <Field type="text" size="75" name="ownLangExSentence"/>
                  </fieldset>
                  <fieldset>
                    <label>Date</label>&nbsp;
                    <Field type="text" name="createdDate"/>
                  </fieldset>
                  <fieldset>
                    <label>Image</label>&nbsp;
                    <input id="image" type="file" name="image" onChange={this.onChange}/>
                  </fieldset>
                  <button type="submit">Save</button>
                </Form>
              )
            }      
          </Formik>
        </div>
      </div>
    )
  }
}

export default CreateWord; 