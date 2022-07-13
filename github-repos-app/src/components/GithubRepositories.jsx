import React from "react";
import axios from "axios";
// import syled from "styled-components"
// import styled from "styled-components";

// const DisplayBox=styled.div`
// display:grid;
// frid-column-template:repeat(1fr,3)
// `

const Github=()=>{

    const [data,setData]=React.useState([])
    const [input,setInput]=React.useState("")
    const [paging,setPaging]=React.useState(5)
    const [pageNo,setPageNo]=React.useState(1)
    const [totalCount,setTotalcount]=React.useState()

    const fetchData=()=>{
    axios.get(`https://api.github.com/search/repositories?q=${input}&per_page=${paging}&page=${pageNo}`)
        .then((res)=>{setData(res.data.items)})
        .catch((err)=>{console.log(err)})
       
    }
    

    React.useEffect(()=>{
        axios.get(`https://api.github.com/search/repositories?q=react&per_page=${paging}&page=${pageNo}`)
        .then((res)=>{setData(res.data.items)})
        .catch((err)=>{console.log(err)})
       
        // fetchData()
        },[])

        // console.log(data.length)

     React.useEffect(()=>{
    fetchData()
     },[paging,pageNo])   

        const handleSearch=()=>{
            // setInput("")
            // setPaging(paging)
            setPageNo(1)
            axios.get(`https://api.github.com/search/repositories?q=${input}&per_page=${paging}&page=${pageNo}`)
            .then((res)=>{setData(res.data.items)})
            .catch((err)=>{console.log(err)})
             
           

            // const end=pageNo*paging
            
        }


        const handlePerPage=(e)=>{
        console.log(e.target.value)
        setPaging(e.target.value)
        
        // fetchData()
        }

        const handleNext=()=>{

            setPageNo(pageNo+1)
            // console.log(pageNo)
            // fetchData()
        }

        const handlePrev=()=>{
           setPageNo(pageNo-1)
        //    console.log(pageNo)
        //    fetchData()
        }

    return(
        <>
        <h1>Search for Git Hub Reposotories here</h1>
        <input type={"text"} value={input} placeholder="Search" onChange={(e)=>setInput(e.target.value)}></input>
        <button onClick={handleSearch}> Search</button>
        <br/><br/>
        <select onChange={(e)=>{handlePerPage(e)}}>
            <option value={5}>Per Page</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
        </select>
       <table>
        <thead>
            <tr>
                 <td>Id</td>
                <td>Name</td>
                <td>Full_Name</td>
                
            </tr>
        </thead>
        <tbody>
          {
            data.map((items)=>{
            return<tr>
                <td>{items.id}</td>
                <td>{items.name}</td>
                <td>{items.full_name}</td>
            </tr>})
          }
        </tbody>
       </table>

       <div id="prev-next">
       <button  onClick={handleNext}>Next</button>
       <button>{pageNo}</button>
        <button disabled={pageNo===1} onClick={handlePrev}>Prev</button>
       
       </div>
        </>
    )
}

export {Github} 