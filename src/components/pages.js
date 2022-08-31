import './pages.css'
import { useDispatch, useSelector } from "react-redux"
import { galleryAPI, setPage } from '../store/galleryAPI'

const Pages = props =>{
    const currentPageNumber = useSelector(s=>s.currentPageNumber)
    const lastPageNumber = useSelector(s=>s.lastPageNumber)
    const isPageLoading = useSelector(s=>s.isPageLoading)
    
    const dispatch = useDispatch()

    let toMap = []

    const pagesRender = ()=> {
        if(lastPageNumber <= 0){
            return
        }
        toMap = []
        const wohMuchStep = 4
        if(currentPageNumber === 1){
            for(let i = 1; i <= wohMuchStep +2; i++){
                if(i === lastPageNumber){
                    toMap.push(lastPageNumber)
                    break;
                }
                else if (i === wohMuchStep +2){
                    toMap.push("...")
                    toMap.push(lastPageNumber)
                }
                else{
                    toMap.push(i)
                }
            }
        }
        else if(currentPageNumber === lastPageNumber){
            if(currentPageNumber-wohMuchStep > 1){
                toMap.push(1)
                toMap.push("...")
            }
            for(let i = currentPageNumber-wohMuchStep<0? 1:currentPageNumber-wohMuchStep; i <= lastPageNumber; i++){
                toMap.push(i)
            }
        }
        else{
            if(currentPageNumber-wohMuchStep > 2){
                toMap.push(1)
                toMap.push("...")
            }
            else if(currentPageNumber > wohMuchStep+1){
                toMap.push(1)
            }
            for(let i = currentPageNumber-wohMuchStep<0? 1:currentPageNumber-wohMuchStep; i <=  currentPageNumber; i++){
                if(i === currentPageNumber || i === 0){
                    continue
                }
                else if(lastPageNumber === i){
                    break;
                }
                toMap.push(i)
            }
            toMap.push(currentPageNumber)
            for(let i = currentPageNumber+1; i <= currentPageNumber+wohMuchStep; i++){
                if(i === currentPageNumber){
                    continue
                }
                else if(lastPageNumber === i){
                    toMap.push(i)
                    break;
                }
                toMap.push(i)
            }
            if(currentPageNumber+wohMuchStep < lastPageNumber){
                toMap.push("...")
                toMap.push(lastPageNumber)
            }
        }
    }

    
    pagesRender()


    const onChangePage = page =>{
        if(page.target.outerText !== "..." && page.target.outerText != currentPageNumber){
            dispatch(setPage(Number(page.target.outerText)))
        }
    }

    return <div id="pages-container" className={isPageLoading? "loading" : ""}>
        {/* <div className="number-holder">1</div>
        <div className="number-holder">2</div>
        <div className="number-holder">3</div>
        <div className="number-holder">4</div>
        <div className='number-holder'>{lastPageNumber}</div> */}
        {toMap.map((number, i)=>
            <div key={i} onClick={onChangePage} className={"number-holder "+(number === "..."? "" : "enable")+(number == currentPageNumber? " current" : "")}>{number}</div>
        )}
        
    </div>
}

export default Pages