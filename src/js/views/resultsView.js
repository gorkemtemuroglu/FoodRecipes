import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 1
import previewView from './previewView';

class ResultsView extends View {
  _errorMessage = 'No recipes found for your query !';
  _message = 'w';
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    console.log(this._data);

    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
