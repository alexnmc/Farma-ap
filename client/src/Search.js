import SuggestionInputSearch from 'suggestion-react-input-search'; 
import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'





class Search extends Component {
 
render() {
    const recentSearches = ['Oradea','Salonta','Marghita','Sacueni','Beius','Valea lui Mihai','Alesd','Stei','Vascau','Nucet'];
   
    return (
        <div className = "searchIn">
        <SuggestionInputSearch
          onSubmitFunction={this.props.searchInput}
          recentSearches={recentSearches}
          placeholder={'Alege Orasul'}
          inputClass = {'inputS'}
          SuggestionListClass = {'inputY'}
          persistent = {false}
        />
        <div className = 'searchLogo'></div>
        </div>
     
    )
  }
}

export default withPharma(Search)
 