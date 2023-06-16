import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 1

class ResultsView extends View {
  _errorMessage = 'No recipes found for your query !';
  _message = 'w';
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    console.log(this._data);

    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(results) {
    const id = window.location.hash.slice(1);

    return `
            <li class="preview">
                <a class="preview__link ${
                  results.id === id ? 'preview__link--active' : ''
                }" href="#${results.id}">
                <figure class="preview__fig">
                    <img src="${results.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${results.title}</h4>
                    <p class="preview__publisher">${results.publisher}</p>
                    
                </div>
                </a>
            </li>
    `;
  }
}

export default new ResultsView();
