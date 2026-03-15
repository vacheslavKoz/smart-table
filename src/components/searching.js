//import {rules, createComparison} from "../lib/compare.js";
import {createComparison, rules, defaultRules} from "../lib/compare.js";

export function initSearching(searchField) {
    const customRule = rules.searchMultipleFields (searchField, ['date', 'customer', 'seller'], false);
   // console.log(customRule);
   const customRangeRule = rules.arrayAsRange();
     
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(["skipEmptyTargetValues","arrayAsRange"],[customRule]);
    return (data, state, action) => {
       // console.log(state);
//console.log(action)
        // @todo: #5.2 — применить компаратор
       // return data.filter(row => compare(row, state));
       //console.log(data.filter(row => row))
       // return data.filter(x => x.seller == "Ivan Petrov")
      // return data.filter(x => x.seller == "Ivan Petrov")
       // console.log(data.filter(row => compare(row,state)));
       // return data.filter(x => x.seller == state.search)
       return data.filter(row => compare(row,state));
    }
}