import React from 'react'
import { post } from 'axios';

class SimpleFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.awaitSetState = this.awaitSetState.bind(this)
  }

  async awaitSetState(stateUpdate){
    await this.setState({file:stateUpdate})
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    const chosenFile = e.target.files[0];
    this.awaitSetState(chosenFile);
  }
  fileUpload(file){
    const url = 'http://localhost:8080/pictionarizerservices/api/uploadFile';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload (to your local device)</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}

export default SimpleFileUpload