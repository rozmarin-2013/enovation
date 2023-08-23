'use strict';

class SearchKeywords {
    KEYWORD = 'mod_'
    fullTextElement;
    keywordsListElement;
    searchElement;
    resultElement;
    keywordsListValue;
    keywords = [];

    constructor(fullTextElementId, keywordsListElementId, searchId, resultId) {
        if (!fullTextElementId) {
            throw new Error('Argument "fullTextElementId" is required')
        }

        if (!keywordsListElementId) {
            throw new Error('Argument "fullTextElementId" is required')
        }

        if (!searchId) {
            throw new Error('Argument "searchId" is required')
        }

        if (!resultId) {
            throw new Error('Argument "resultId" is required')
        }

        this.fullTextElement = document.getElementById(fullTextElementId);

        if (this.fullTextElement === null) {
            throw new Error(`Element with id ${fullTextElementId} doesn't exist`)
        }
        this.keywordsListElement = document.getElementById(keywordsListElementId);

        if (this.keywordsListElement === null) {
            throw new Error(`Element with id ${keywordsListElement} doesn't exist`)
        }

        this.resultElement = document.getElementById(resultId);

        if (this.resultElement === null) {
            throw new Error(`Element with id ${resultId} doesn't exist`)
        }

        this.searchElement = document.getElementById(searchId);

        if (this.searchId === null) {
            throw new Error(`Element with id ${searchId} doesn't exist`)
        }

        this.searchElement.onclick = this.search.bind(this);
    }

    search() {
        let keywords = this.extractKeywords(),
            fullText = this.getFullText(),
            result = '';

        result = '';
        keywords.forEach((keyword) => {
            result += keyword + ',';
            let match = fullText.match( new RegExp(keyword, 'g'));

            if(match) {
                match = Array.from(match);
                result += ' FOUND<br>'
            } else {
                result += ' NOT FOUND<br>'
            }
        })

        this.resultElement.innerHTML = result;
    }

    getFullText() {
        return this.fullTextElement.value;
    }

    extractKeywords() {
        let keywordsListValue = this.keywordsListElement.value

        if (this.keywordsListValue === keywordsListValue) {
            return this.keywords;
        }

        this.keywordsListValue = keywordsListValue;

        let matchAll = ((keywordsListValue.matchAll(/mod_\w*/g)));
            matchAll = Array.from(matchAll);
            matchAll.forEach((keyword) => {
                this.keywords.push(keyword[0])
        })

        return this.keywords;
    }
}