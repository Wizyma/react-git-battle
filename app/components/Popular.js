import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api.js';
import Loading from './Loading';

//Render selected Language navigation Bar
function SelectLanguage ({ selectedLanguage, onSelect }) {
    let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

    let returnLanguages = languages.map((lang) => {
        return (
            <li
            style={lang === selectedLanguage ? {color: '#d0021B'} : null}
            onClick={() => onSelect(lang)}
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
function RepoGrid({ repos }){
  let handleRepos = repos.map(({ name, owner, stargazers_count, html_url }, index) => (
      <li key={name} className='popular-item'>
        <div className='popular-rank'>
          #{index + 1}
          <ul className='space-list-items'>
            <li>
              <img className='avatar'
              src={owner.avatar_url}
              alt={`Avatar for ${owner.login}`} />
            </li>
            <li>
              <a href={html_url}>{name}</a>
            </li>
            <li>
              @{owner.login}
            </li>
            <li>
              {stargazers_count} stars
            </li>
          </ul>
        </div>
      </li>
    )
  );

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
    }

    updateLanguage = async (lang) => {
      this.setState(() => {
          return {
              selectedLanguage: lang
          }
      });
      const repos = await api.fetchPopularRepos(lang);
      this.setState({ repos });
    }

    componentDidMount() {
      // AJAX Request
      this.updateLanguage(this.state.selectedLanguage);
    }

    render(){
      const { selectedLanguage, repos } = this.state;
        return(
          <div>
            <SelectLanguage
            selectedLanguage = {selectedLanguage}
            onSelect = {this.updateLanguage} />
            {!repos ?
            <Loading /> :
            <RepoGrid repos = {repos} />}
          </div>
        )
    }
}

export default Popular;
