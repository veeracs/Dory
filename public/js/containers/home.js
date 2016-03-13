import React, { PropTypes } from 'react';
import { stitch } from 'keo/redux';
import DocumentTitle from '../components/document-title';
import hash from 'object-hash';
import pluralize from 'pluralize';
import Post from '../components/post';
import { getPosts } from '../actions';
import config from '../config';

/**
 * @constant propTypes
 * @type {{posts: Number}}
 */
const propTypes = {
    catalogue: PropTypes.array.isRequired
};

/**
 * @constant statics
 * @type {Object}
 */
const statics = {

    /**
     * @method fetchData
     * @param {Function} dispatch
     * @param {Object} params
     * @return {Promise}
     */
    fetchData: (dispatch, params) => {
        const pageNumber = params.pageNumber || 1;
        return dispatch(getPosts(pageNumber));
    }

};

/**
 * @method dispatch
 * @param {Function} dispatch
 * @param {Object} props
 * @return {void}
 */
const componentDidMount = ({ dispatch, props }) => {
    statics.fetchData(dispatch, props.params);
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = ({ props }) => {

    return (
        <DocumentTitle title="Home">
            <main className="page home">

                <h2>
                    Welcome
                    <label>
                        ({props.catalogue.length} {(pluralize('Post', props.catalogue.length))})
                    </label>
                </h2>

                {props.catalogue.slice(0, config.perPage).asMutable().map(model => {
                    return <Post key={ hash(model) } { ...props } synopsis={config.displaySynopsis} model={ model } />
                })}

            </main>
        </DocumentTitle>
    );

};

export default stitch({ statics, propTypes, componentDidMount, render }, state => state);
