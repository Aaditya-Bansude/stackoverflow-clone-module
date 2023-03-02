import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import './Tags.css'

const Tags = () => {
    const tagsList = [{
        id: 1,
        tagName: "javascript",
        tagDesc: "For questions regarding programming in ECMAScript (JAVA Script/JS) and its various dialects/implementations (excluding ActionScripts) Please include all relevent tags on your question."
    },{
        id: 2,
        tagName: "python",
        tagDesc: "For questions regarding programming in ECMAScript (JAVA Script/JS) and its various dialects/implementations (excluding ActionScripts) Please include all relevent tags on your question."
    },{
        id: 3,
        tagName: "c#",
        tagDesc: "For questions regarding programming in ECMAScript (JAVA Script/JS) and its various dialects/implementations (excluding ActionScripts) Please include all relevent tags on your question."
    },{
        id: 4,
        tagName: "java",
        tagDesc: "For questions regarding programming in ECMAScript (JAVA Script/JS) and its various dialects/implementations (excluding ActionScripts) Please include all relevent tags on your question."
    },{
        id: 5,
        tagName: "html",
        tagDesc: "For questions regarding programming in ECMAScript (JAVA Script/JS) and its various dialects/implementations (excluding ActionScripts) Please include all relevent tags on your question."
    },{
        id: 6,
        tagName: "css",
        tagDesc: "For questions regarding programming in ECMAScript (JAVA Script/JS) and its various dialects/implementations (excluding ActionScripts) Please include all relevent tags on your question."
    },{
        id: 7,
        tagName: "reactjs",
        tagDesc: "For questions regarding programming in ECMAScript (JAVA Script/JS) and its various dialects/implementations (excluding ActionScripts) Please include all relevent tags on your question."
    },{
        id: 8,
        tagName: "mongodb",
        tagDesc: "For questions regarding programming in ECMAScript (JAVA Script/JS) and its various dialects/implementations (excluding ActionScripts) Please include all relevent tags on your question."
    }]

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <h1 className='tags-h1'>Tags</h1>
                <p className='tags-p'>A tag is a keyword or label that categorizes your question with other, similar questions.</p>
                <p className='tags-p'>Using the right tags makes it easier for others to find and answer your question.</p>
                <div className='tags-list-container'>
                    {
                        tagsList.map((tag) => (
                            <TagsList tag={tag} key={tagsList.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Tags