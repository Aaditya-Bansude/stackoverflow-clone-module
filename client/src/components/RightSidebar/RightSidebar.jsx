import React from 'react'
import PenLogo from '../../assets/PenLogo.svg'
import CommentLogo from '../../assets/CommentLogo.svg'
import StackIconBlack from '../../assets/StackIconBlack.svg'
import './RightSidebar.css'

const RightSidebar = () => {
  const tags = ['c','css','express','firebase','html','java','javascript','mern','mongodb','mysql','next.js','node.js','php','python','reactjs']
  return (
    <aside className='right-sidebar'>
      <div class="widget">
        <h4>The Overflow Blog</h4>
        <div class="right-sidebar-div-1">
          <div class="right-sidebar-div-2">
            <img src={PenLogo} alt="" style={{height: "15px", width: "15px"}} />
            <p>Observability is key to the future of software (and your DevOps career)</p>
          </div>
          <div class="right-sidebar-div-2">
            <img src={PenLogo} alt="" style={{height: "15px", width: "15px"}} />
            <p>Podcast 374: How valuable is your screen name?</p>
          </div>
        </div>
        <h4>Featured on Meta</h4>
        <div class="right-sidebar-div-1">
          <div class="right-sidebar-div-2">
            <img src={CommentLogo} alt="" style={{height: "15px", width: "15px"}} />
            <p>Review queue workflows - Final release....</p>
          </div>
          <div class="right-sidebar-div-2">
            <img src={CommentLogo} alt="" style={{height: "15px", width: "15px"}} />
            <p>Please welcome Valued Associates: #958 - V2Blast  #959 - SpencerG</p>
          </div>
          <div class="right-sidebar-div-2">
            <img src={StackIconBlack} alt="" style={{height: "20px", width: "20px"}} />
            <p>Outdated Answers: accepted answer is now unpinned on Stack Overflow</p>
          </div>
        </div>
        <h4>Hot Meta Posts</h4>
        <div class="right-sidebar-div-1">
          <div class="right-sidebar-div-2">
            <p>38</p>
            <p>Why was this spam flag declined, yet the question marked as spam?</p>
          </div>
          <div class="right-sidebar-div-2">
            <p>20</p>
            <p>What is the best course of action when a user has high enough rep to...</p>
          </div>
          <div class="right-sidebar-div-2">
            <p>14</p>
            <p>Is a link to the "How to ask" help page a useful comment?</p>
          </div>
        </div>
      </div>
      <div class="widget-tags">
        <h3>Watched tags</h3>
        <div class="widget-tags-div">
          {
            tags.map((tag) => (
                <p key={tag}>{tag}</p>
            ))
          }
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar