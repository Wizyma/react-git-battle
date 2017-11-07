import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api.js';
import Loading from './Loading';

//Render selected Language navigation Bar
function SelectLanguage (props) {
    let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

    let returnLanguages = languages.map((lang) => {
    let handleSelect = lang === props.selectedLanguage ? {color: '#d0021B'} : null;
        let clickFunc = props.onSelect.bind(null, lang);
        return (
            <li
            style={handleSelect}
            onClick={clickFunc}
            key={lang}>
            {lang}
        </li>
        )
    });

    return(
        <ul className='languages'>
            {returnLanguages}
        </ul>
    )
}

// Render repo grid view
function RepoGrid(props){
  let handleRepos = props.repos.map((repo, index) => {
    return(
      <li key={repo.name} className='popular-item'>
        <div className='popular-rank'>
          #{index + 1}
          <ul className='space-list-items'>
            <li>
              <img className='avatar'
              src={repo.owner.avatar_url}
              alt={`Avatar for ${repo.owner.login}`} />
            </li>
            <li>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
            <li>
              @{repo.owner.login}
            </li>
            <li>
              {repo.stargazers_count} stars
            </li>
          </ul>
        </div>
      </li>
    )
  })
  return(
    <ul className='popular-list'>
      {handleRepos}
    </ul>
  )
}

RepoGrid.PropTypes = {
  repos: PropTypes.array.isRequired
}

SelectLanguage.PropTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          selectedLanguage: 'All',
          repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang){
      let self = this;
      this.setState(() => {
          return {
              selectedLanguage: lang
          }
      });

      api.fetchPopularRepos(lang)
        .then((repos) => {
          self.setState(() => {
            return{
                repos: repos
            }
          })
      });
    }

    componentDidMount() {
      // AJAX Request
      this.updateLanguage(this.state.selectedLanguage);
    }

    render(){
        return(
          <div>
            <SelectLanguage
            selectedLanguage = {this.state.selectedLanguage}
            onSelect = {this.updateLanguage} />
            {!this.state.repos ?
            <Loading /> :
            <RepoGrid repos = {this.state.repos} />}
          </div>
        )
    }
}

export default Popular;
