import axios from 'axios'
import { API_URL } from '../Constants'

class WordsDataService {
  retrieveAllWords(){
    return axios.get(`${API_URL}/words`);
  }

  retrieveWord(id){
    return axios.get(`${API_URL}/words/${id}`);
  }  

  createWord(word){
    const formData = new FormData();
    formData.append('id', word.id);
    formData.append('ownLangWordName', word.ownLangWordName);
    formData.append('targetLangWordName', word.targetLangWordName);
    formData.append('ownLangExSentence', word.ownLangExSentence);
    formData.append('targetLangExSentence', word.targetLangExSentence);
    formData.append('createdDate', word.createdDate.toISOString());
    formData.append('image', word.image);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    } 
    console.log("The content of the parameter: ");
    console.log(word);
    return axios.post(`${API_URL}/words`, /*word*/ formData, config);
  }

  updateWord(id, word){
    return axios.put(`${API_URL}/words/${id}`, word);
  }

  deleteWord(id){
    return axios.delete(`${API_URL}/words/${id}`);
  }
}

export default new WordsDataService()