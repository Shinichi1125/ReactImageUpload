import React from 'react';
import WordsDataService from '../api/WordsDataService';
import { Formik, Form, Field } from 'formik'

class UpdateWord extends React.Component{
  
  constructor(props){
    super(props)

    this.state = {
      wordId: this.props.match.params.id,
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

  async awaitSetState(stateUpdate){
    await this.setState({wordData : stateUpdate})
  }

  componentDidMount(){
    let id = Number(this.props.match.params.id);
    let data;

    WordsDataService.retrieveWord(id)
    .then(res => {
      data = res.data;
      this.setState({wordData:data});
    }) 
  }

  onChange(e){
    const chosenFile = e.currentTarget.files[0];
    console.log("The value of chosenFile:");
    console.log(chosenFile);

    let tempWordData = this.state.wordData;
    tempWordData.image = chosenFile;  
    this.awaitSetState(tempWordData);
    console.log("The value of this.state.wordData: ");
    console.log(this.state.wordData);
  }  

  onSubmit(values){
    values.createdDate = new Date(values.createdDate);
    let word = values;
    let id = word.id;

    WordsDataService.updateWord(id, word)
    .then(() => this.props.history.push('/'))       
  }

  render(){
    let { id, ownLangWordName, 
      targetLangWordName, ownLangExSentence, 
      targetLangExSentence, createdDate, 
      image} 
      = this.state.wordData; 

    return(
      <div>
        <h2>Update Word</h2>
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

export default UpdateWord; 

