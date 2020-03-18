# react-redux-fetcher

![npm](https://img.shields.io/npm/v/react-redux-fetcher)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-redux-fetcher)

Wrap your asynchronous actions to React Concurrent Mode resources.

### WARNING! 
It is designed for React Experimental Concurrent Mode API and it may change. 
We will maintain it, but don't consider using it in production.

## Install
```
$ npm install react-redux-fetcher
```

## Usage
1. Connect `reactFetcher` to your reducers:
```js
import { combineReducers } from 'redux'
import { reactFetcher } from 'react-redux-fetcher'
import { myReducers } from './myReducers'
    
const rootReducer = combineReducers({
    ...myReducers,
    reactFetcher
})
```

2. Use `wrapAsyncAction` to wrap any async Redux action that is needed to dispatch.

## Example
```js
import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { wrapAsyncAction } from 'react-redux-fetcher'

const fetchData = new Promise(resolve => setTimeout(() => resolve(1337), 2000))
const asyncAction = async dispatch => dispatch({ type: 'ASYNC_ACTION', payload: ...(await fetchData)})

const FetchComponent = ({ resource }) => {
  resource.read()
  return <h1>Done!</h1>
}

const MyComponent = ({ wrappedFetch }) => (
  <Suspense fallback={<h1>Loading...</h1>}>
    <FetchComponent resource={wrappedFetch()} />
  <Suspense />
)

const mapDispatchToProps = dispatch => 
  bindActionCreators({ wrappedFetch: wrapAsyncAction(asyncAction) }

export default connect(null, mapDispatchToProps)(MyComponent)
```