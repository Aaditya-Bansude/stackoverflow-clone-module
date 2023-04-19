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
        tagDesc: "Python is a multi-paradigm, dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax. "
    },{
        id: 3,
        tagName: "c#",
        tagDesc: "C# (pronounced 'see sharp') is a high-level, statically typed, multi-paradigm programming language developed by Microsoft. C# code usually targets Microsoft's .NET family of tools and run-times."
    },{
        id: 4,
        tagName: "java",
        tagDesc: "Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself. This tag is frequently used alongside other tags for libraries."
    },{
        id: 5,
        tagName: "html",
        tagDesc: "HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser. Questions regarding HTML should include a minimal reproducible example."
    },{
        id: 6,
        tagName: "css",
        tagDesc: "CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look and formatting of HTML (HyperText Markup Language), XML (Extensible Markup Language) documents and SVG elements."
    },{
        id: 7,
        tagName: "reactjs",
        tagDesc: "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be efficient and flexible."
    },{
        id: 8,
        tagName: "Django",
        tagDesc: "Django is an open-source server-side web application framework written in Python. It is designed to reduce the effort required to create complex data-driven websites and web applications, with a special focus on less code."
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