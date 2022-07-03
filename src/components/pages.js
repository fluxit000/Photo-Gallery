import { useContext, useEffect } from 'react'
import GalleryAPI from '../store/galleryAPI'
import './pages.css'

const Pages = props =>{
    const ctx = useContext(GalleryAPI)

    let toMap = []

    const pagesRender = ()=> {
        toMap = []
        const wohMuchStep = 4
        if(ctx.currentPageNumber === 1){
            for(let i = 1; i <= wohMuchStep +2; i++){
                if(i === ctx.lastPageNumber){
                    toMap.push(ctx.lastPageNumber)
                    break;
                }
                else if (i === wohMuchStep +2){
                    toMap.push("...")
                    toMap.push(ctx.lastPageNumber)
                }
                else{
                    toMap.push(i)
                }
            }
        }
        else if(ctx.currentPageNumber === ctx.lastPageNumber){
            toMap.push(1)
            toMap.push("...")
            for(let i = ctx.lastPageNumber-wohMuchStep; i <= ctx.lastPageNumber; i++){
                toMap.push(i)
            }
        }
        else{
            if(ctx.currentPageNumber-wohMuchStep > 1){
                toMap.push(1)
                toMap.push("...")
            }
            console.log(ctx.currentPageNumber-wohMuchStep)
            for(let i = ctx.currentPageNumber-wohMuchStep<0? 1:ctx.currentPageNumber-wohMuchStep; i <=  ctx.currentPageNumber; i++){
                if(i === ctx.currentPageNumber){
                    continue
                }
                else if(ctx.lastPageNumber === i){
                    break;
                }
                toMap.push(i)
            }
            toMap.push(ctx.currentPageNumber)
            for(let i = ctx.currentPageNumber+1; i <= ctx.currentPageNumber+wohMuchStep; i++){
                if(i === ctx.currentPageNumber){
                    continue
                }
                else if(ctx.lastPageNumber === i){
                    break;
                }
                toMap.push(i)
            }
            if(ctx.currentPageNumber+wohMuchStep < ctx.lastPageNumber){
                toMap.push("...")
                toMap.push(ctx.lastPageNumber)
            }
        }
    }

    
    pagesRender()


    const onChangePage = page =>{
        if(page.target.outerText !== "..."){
            ctx.onSetCurrentPN(Number(page.target.outerText))
        }
    }

    return <div id="pages-container">
        {/* <div className="number-holder">1</div>
        <div className="number-holder">2</div>
        <div className="number-holder">3</div>
        <div className="number-holder">4</div>
        <div className='number-holder'>{ctx.lastPageNumber}</div> */}
        {toMap.map((number, i)=>
            <div key={i} onClick={onChangePage} className={"number-holder "+(number === "..."? "" : "enable")+(number == ctx.currentPageNumber? " current" : "")}>{number}</div>
        )}
        
    </div>
}

export default Pages