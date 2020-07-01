import axios from 'axios'
import { API_URL, CONFIG } from '../Constants'

class WordsDataService {
  
  retrieveAllWords(){
    return axios.get(`${API_URL}/words`);
  }

  retrieveWord(id){
    return axios.get(`${API_URL}/words/${id}`);
  }  

  makeFormData(word){
    const formData = new FormData();
    formData.append('id', word.id);
    formData.append('ownLangWordName', word.ownLangWordName);
    formData.append('targetLangWordName', word.targetLangWordName);
    formData.append('ownLangExSentence', word.ownLangExSentence);
    formData.append('targetLangExSentence', word.targetLangExSentence);
    formData.append('createdDate', word.createdDate.toISOString());
    formData.append('image', word.image);

    return formData; 
  }

  createWord(word){
    const formData = this.makeFormData(word);
    return axios.post(`${API_URL}/words`, formData, CONFIG);
  }

  updateWord(id, word){
    const formData = this.makeFormData(word);
    return axios.put(`${API_URL}/words/${id}`, formData, CONFIG);
  }

  deleteWord(id){
    return axios.delete(`${API_URL}/words/${id}`);
  }
}

export default new WordsDataService()